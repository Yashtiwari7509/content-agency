import { useRef, Children } from "react";
import { gsap } from "gsap";

import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

interface review {
  name: string;
  username: string;
  img: string;
  body: string;
}

interface InfiniteSliderProps {
  direction?: "left" | "right";
  /** Width of each slide slot in px. Must match the width of children. Default: 350 */
  boxWidth?: number;
  /** Height of the slider track in px. Default: 250 */
  boxHeight?: number;
  /** Custom slide items. When provided, replaces the default review cards. */
  children?: React.ReactNode;
  reviews?: any;
}

const InfiniteSlider = ({
  direction = "left",
  boxWidth: boxWidthProp,
  boxHeight: boxHeightProp,
  children,
  reviews,
}: InfiniteSliderProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);
  const insideRef = useRef<HTMLDivElement[]>([]);
  const proxyRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const draggableRef = useRef<any>(null);
  if (!reviews) {
    return;
  }

  // Determine slide count from children or fallback to reviews
  const childCount = children ? Children.count(children) : reviews.length;

  const numBoxes = childCount;
  const boxWidth = boxWidthProp ?? 350;
  const boxHeight = boxHeightProp ?? 250;

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
      paused: false,
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
      // onPress: function () {
      //   animation.pause();
      // },
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

    const handleMouseEnter = () => {
      gsap.to(animation, {
        timeScale: 0,
        duration: 2,
        ease: "power4.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(animation, {
        timeScale: 1,
        duration: 2,
        ease: "power4.Out",
      });
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
    <div className="h-fit w-screen flex flex-col items-center justify-center py-8 px-4">
      <div className="relative w-full  h-[120px]!" style={{ height: `${boxHeight}px` }}>
        <div
          data-cursor="drag"
          ref={wrapperRef}
          className="absolute  h-[120px]!  cursor-grab active:cursor-grabbing"
          style={{
            width: "100%",
            top: "0",
            left: "50%",
          }}
        >
          <div ref={boxesRef} style={{ willChange: "auto" }} className="relative">
            {children
              ? Children.map(children, (child, i) => (
                  <div
                    key={i}
                    style={{ transform: `translateX(${i * boxWidth}px)`, willChange: "auto", width: `${boxWidth}px` }}
                    className="absolute flex items-center justify-center "
                  >
                    <div className="absolute -z-10 w-full h-full radial-blur-b"></div>
                    {child}
                  </div>
                ))
              : reviews.map((review: review, i: number) => (
                  <figure
                    key={review.username}
                    style={{ transform: `translateX(${i * 350}px)`, willChange: "auto" }}
                    className="absolute h-[120px]  w-[350px] px-4 "
                  >
                    <div className="absolute -z-10 w-full h-full radial-blur-b"></div>
                    <div
                      ref={(r) => {
                        if (r) insideRef.current[i] = r;
                      }}
                      className="cursor-pointer inside-card overflow-hidden rounded-xl bg-white  p-4"
                    >
                      <div className="flex flex-row items-center gap-2">
                        <img className="rounded-full" width="32" height="32" alt={review.name} src={review.img} />
                        <div className="flex flex-col">
                          <figcaption className="text-sm font-medium dark:text-white">{review.name}</figcaption>
                          <p className="text-xs font-light dark:text-white/40">{review.username}</p>
                        </div>
                      </div>
                      <blockquote className="mt-6 text-sm">{review.body}</blockquote>
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
