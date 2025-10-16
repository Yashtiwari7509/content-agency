import { useRef } from "react";
import { gsap } from "gsap";

import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
  },
];

const InfiniteSlider = ({ direction = "left" }: { direction: "left" | "right" }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);
  const proxyRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const draggableRef = useRef<any>(null);

  const numBoxes = 6;
  const boxWidth = 350;
  const boxHeight = 250;
  
  // const imgWidth = boxWidth - 6;
  // const imgHeight = boxHeight - 14;

  useGSAP(() => {
    if (!wrapperRef.current || !viewportRef.current || !boxesRef.current || !proxyRef.current) return;

    const wrapper = wrapperRef.current;
    const viewport = viewportRef.current;
    let boxes = boxesRef.current;
    const proxy = proxyRef.current;

    let directionVal = direction === "left" ? -1 : 1;
    let viewWidth = window.innerWidth;
    const wrapWidth = numBoxes * boxWidth;
    const wrapVal = gsap.utils.wrap(0, wrapWidth);
    const wrapProgress = gsap.utils.wrap(0, 1);

    gsap.set([wrapper, viewport], { height: boxHeight, xPercent: -50 });
    gsap.set(boxes, { left: -boxWidth });

    const stringX = directionVal === -1 ? `-=${wrapWidth}` : `+=${wrapWidth}`;

    const animation = gsap.to(boxes.children, {
      repeat: -1,
      duration: 20,
      x: stringX,
      ease: "none",
      paused: true,
      modifiers: {
        x: function (x, target) {
          let xVal: number;
          if (directionVal === -1) {
            xVal = ((parseInt(x) - wrapWidth) % wrapWidth) + wrapWidth;
          } else {
            xVal = parseInt(x) % wrapWidth;
          }
          (target as HTMLElement).style.visibility = xVal - boxWidth > viewWidth ? "hidden" : "visible";
          return `${xVal}px`;
        },
      },
    });

    animationRef.current = animation;

    // Draggable implementation to follow pointer; resume left after inertia
    const draggableInstance = Draggable.create(proxy, {
      type: "x",
      trigger: wrapper,
      inertia: true,
      onPress: function () {
        animation.pause();
      },
      onDrag: function () {
        const dragValue = (-directionVal * wrapVal(this.deltaX)) / wrapWidth;
        const currentProgressAnim = animation.progress();
        const endProgress = wrapProgress(currentProgressAnim - dragValue);
        animation.progress(endProgress);
      },
      onThrowUpdate: function () {
        const dragValue = (-directionVal * wrapVal(this.deltaX)) / wrapWidth;
        const currentProgressAnim = animation.progress();
        const endProgress = wrapProgress(currentProgressAnim - dragValue);
        animation.progress(endProgress);
      },
      onThrowComplete: function () {
        animation.timeScale(1);
        animation.play();
      },
    });

    draggableRef.current = draggableInstance;

    const handleResize = () => {
      viewWidth = viewport.offsetWidth;
      animation.render(animation.time(), false, true);
    };

    const handleMouseEnter = () => animation.pause();
    const handleMouseLeave = () => {
      animation.timeScale(1);
      animation.play();
    };

    window.addEventListener("resize", handleResize);
    wrapper.addEventListener("mouseenter", handleMouseEnter);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    animation.play();

    return () => {
      window.removeEventListener("resize", handleResize);
      wrapper.removeEventListener("mouseenter", handleMouseEnter);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
      if (draggableInstance && draggableInstance[0]) {
        draggableInstance[0].kill();
      }
      animation.kill();
    };
  }, []);

  return (
    <div className="h-fit w-screen overflow-hidden flex flex-col items-center justify-center py-8 px-4">
      <div className="relative w-full  !h-[120px]" style={{ height: `${boxHeight}px` }}>
        <div
          ref={wrapperRef}
          className="absolute  !h-[120px]  cursor-grab active:cursor-grabbing"
          style={{
            width: "100%",
            top: "0",
            left: "50%",
          }}
        >
          <div ref={boxesRef} style={{ willChange: "transform" }} className="relative">
            {reviews.map((review, i) => (
              <figure
                key={review.username}
                style={{ transform: `translateX(${i * 350}px)`, willChange: "transform" }}
                className="absolute h-[120px] w-[350px] px-4"
              >
                <div className="cursor-pointer overflow-hidden rounded-xl border p-4">
                  <div className="flex flex-row items-center gap-2">
                    <img className="rounded-full" width="32" height="32" alt={review.name} src={review.img} />
                    <div className="flex flex-col">
                      <figcaption className="text-sm font-medium dark:text-white">{review.name}</figcaption>
                      <p className="text-xs font-medium dark:text-white/40">{review.username}</p>
                    </div>
                  </div>
                  <blockquote className="mt-2 text-sm">{review.body}</blockquote>
                </div>
              </figure>
            ))}
          </div>
        </div>

        <div
          ref={viewportRef}
          className="absolute pointer-events-none rounded-lg h-fit"
          style={{
            width: "calc(100% + 8px)",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        ></div>

        <div ref={proxyRef} className="absolute" style={{ visibility: "hidden" }}></div>
      </div>
    </div>
  );
};

export default InfiniteSlider;
