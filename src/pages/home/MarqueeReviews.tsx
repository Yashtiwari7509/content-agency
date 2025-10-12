import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/all";

// CRITICAL FIX: Uncomment this line!
gsap.registerPlugin(Draggable);

export default function InfiniteCarousel() {
  const [showOverflow, setShowOverflow] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);
  const proxyRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const draggableRef = useRef<Draggable[] | null>(null);
  const directionRef = useRef<string>("to-left");
  const directionValRef = useRef<number>(-1);
  const viewWidthRef = useRef<number>(window.innerWidth);

  const numBoxes = 10;
  const boxWidth = 350;
  const boxHeight = 250;
  const imgWidth = boxWidth - 6;
  const imgHeight = boxHeight - 14;
  const wrapWidth = numBoxes * boxWidth;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const viewport = viewportRef.current;
    const boxes = boxesRef.current;
    const proxy = proxyRef.current;

    if (!wrapper || !viewport || !boxes || !proxy) return;

    const wrapVal = gsap.utils.wrap(0, wrapWidth);
    const wrapProgress = gsap.utils.wrap(0, 1);

    // Initial setup
    gsap.set([wrapper, viewport], { height: boxHeight, xPercent: -50 });
    gsap.set(boxes, { left: -boxWidth });

    // Create boxes
    for (let i = 1; i <= numBoxes; i++) {
      const num = document.createElement("div");
      num.className = "num";
      num.innerText = String(i);

      const img = document.createElement("img");
      img.width = imgWidth;
      img.height = imgHeight;
      img.style.background = `hsl(${i * 36}, 70%, 60%)`;

      const box = document.createElement("div");
      box.className = "box";

      box.appendChild(img);
      box.appendChild(num);
      boxes.appendChild(box);

      gsap.set(box, { x: i * boxWidth, width: boxWidth, height: boxHeight });
    }

    // Create animation
    const stringX = directionValRef.current === -1 ? `-=${wrapWidth}` : `+=${wrapWidth}`;

    const animation = gsap.to(".box", {
      repeat: -1,
      duration: 20,
      x: stringX,
      ease: "none",
      paused: true,
      modifiers: {
        x: function (x: string, target: Element) {
          let xVal: number;
          if (directionValRef.current === -1) {
            xVal = ((parseInt(x) - wrapWidth) % wrapWidth) + wrapWidth;
          } else {
            xVal = parseInt(x) % wrapWidth;
          }
          (target as HTMLElement).style.visibility = xVal - boxWidth > viewWidthRef.current ? "hidden" : "visible";
          return `${xVal}px`;
        },
      },
    });

    animationRef.current = animation;

    // Create draggable
    const draggable = Draggable.create(proxy, {
      type: "x",
      trigger: wrapper,
      inertia: true,
      onDrag: function (this: Draggable) {
        const newDirection = "to-" + this.getDirection("start");
        if (directionRef.current !== newDirection) {
          directionRef.current = newDirection;
          directionValRef.current = directionValRef.current * -1;
          const currentTimeScale = animation.timeScale();
          animation.timeScale(currentTimeScale * -1);
        }
        const dragValue = wrapVal(this.deltaX * directionValRef.current) / wrapWidth;
        const currentProgressAnim = animation.progress();
        const endProgress = wrapProgress(currentProgressAnim + dragValue);
        animation.progress(endProgress);
      },
      onThrowUpdate: function (this: Draggable) {
        const newDirection = "to-" + this.getDirection("start");
        if (directionRef.current !== newDirection) {
          directionRef.current = newDirection;
          directionValRef.current = directionValRef.current * -1;
          const currentTimeScale = animation.timeScale();
          animation.timeScale(currentTimeScale * -1);
        }
        const dragValue = wrapVal(this.deltaX * directionValRef.current) / wrapWidth;
        const currentProgressAnim = animation.progress();
        const endProgress = wrapProgress(currentProgressAnim + dragValue);
        animation.progress(endProgress);
      },
    });

    draggableRef.current = draggable;

    function resize() {
      viewWidthRef.current = viewport.offsetWidth;
      animation.render(animation.time(), false, true);
    }

    window.addEventListener("resize", resize);

    const handleMouseEnter = () => animation.pause();
    const handleMouseLeave = () => animation.play();

    wrapper.addEventListener("mouseenter", handleMouseEnter);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    // Start animation
    animation.play();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
      wrapper.removeEventListener("mouseenter", handleMouseEnter);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
      animation.kill();
      if (draggableRef.current) {
        draggableRef.current.forEach((d) => d.kill());
      }
    };
  }, []);

  useEffect(() => {
    if (wrapperRef.current) {
      gsap.set(wrapperRef.current, {
        overflow: showOverflow ? "visible" : "hidden",
      });
    }
  }, [showOverflow]);

  return (
    <div className="min-h-screen bg-gray-900 overflow-hidden">
      <style>{`
        .wrapper {
          position: absolute;
          overflow: hidden;
          width: 70%;
          top: 100px;
          left: 50%;
        }

        .viewport {
          position: absolute;
          width: calc(70% + 8px);
          top: 100px;
          left: 50%;
          border: 2px solid #8d0707;
        }

        .num {
          position: absolute;
          color: #fafafa;
          font-size: 18px;
          line-height: 1;
          top: 14px;
          left: 8px;
          text-shadow: 1px 1px 0px #555, -1px -1px 0px #555, 1px -1px 0px #555, -1px 1px 0px #555;
        }

        .box {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .boxes {
          position: relative;
        }
      `}</style>

      <div className="p-4">
        <label className="flex items-center gap-2 cursor-pointer text-white">
          <input
            type="checkbox"
            checked={showOverflow}
            onChange={(e) => setShowOverflow(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <span>Show overflow</span>
        </label>
      </div>

      <div ref={wrapperRef} className="wrapper" />
      <div ref={viewportRef} className="viewport" />
      <div ref={boxesRef} className="boxes" />
      <div ref={proxyRef} style={{ position: "absolute", opacity: 0 }} />
    </div>
  );
}
