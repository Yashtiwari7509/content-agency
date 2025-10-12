import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);

const cn = (...classes) => classes.filter(Boolean).join(" ");

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  speed?: number;
}

export function Marquee({ className, reverse = false, pauseOnHover = false, children, speed = 50 }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastTimeRef = useRef(Date.now());
  const isPausedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const content = contentRef.current;
    const container = containerRef.current;

    // Get width of single content set
    const singleWidth = content.firstElementChild?.getBoundingClientRect().width || 0;
    const gap = 16; // 1rem = 16px
    const loopWidth = singleWidth + gap;

    const animate = () => {
      if (!isDraggingRef.current && !isPausedRef.current) {
        const now = Date.now();
        const deltaTime = (now - lastTimeRef.current) / 1000;
        lastTimeRef.current = now;

        const direction = reverse ? 1 : -1;
        const baseSpeed = speed * direction;

        // Add velocity from dragging
        positionRef.current += baseSpeed * deltaTime + velocityRef.current;

        // Apply friction to velocity
        velocityRef.current *= 0.95;

        // Normalize position for infinite loop
        if (positionRef.current <= -loopWidth) {
          positionRef.current += loopWidth;
        } else if (positionRef.current >= loopWidth) {
          positionRef.current -= loopWidth;
        }

        gsap.set(content, { x: positionRef.current });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = Date.now();
    animate();

    // Setup Draggable
    let startX = 0;
    let lastDragX = 0;
    let dragVelocity = 0;

    const draggable = Draggable.create(content, {
      type: "x",
      trigger: container,
      inertia: true,
      dragResistance: 0,
      onPress: function (e) {
        isDraggingRef.current = true;
        velocityRef.current = 0;
        startX = positionRef.current;
        lastDragX = this.x;
        dragVelocity = 0;
      },
      onDrag: function () {
        const currentX = this.x;
        const dragDelta = currentX - lastDragX;

        positionRef.current = startX + (currentX - this.startX);

        // Calculate velocity
        dragVelocity = dragDelta;

        // Seamless wrapping during drag
        if (positionRef.current <= -loopWidth) {
          positionRef.current += loopWidth;
          startX += loopWidth;
          gsap.set(content, { x: positionRef.current });
          this.update();
        } else if (positionRef.current >= loopWidth) {
          positionRef.current -= loopWidth;
          startX -= loopWidth;
          gsap.set(content, { x: positionRef.current });
          this.update();
        }

        lastDragX = currentX;
      },
      onDragEnd: function () {
        isDraggingRef.current = false;
        velocityRef.current = dragVelocity * 2;
        lastTimeRef.current = Date.now();
      },
      onThrowUpdate: function () {
        positionRef.current = this.x;

        // Wrap during throw
        if (positionRef.current <= -loopWidth) {
          positionRef.current += loopWidth;
          gsap.set(content, { x: positionRef.current });
          this.update();
        } else if (positionRef.current >= loopWidth) {
          positionRef.current -= loopWidth;
          gsap.set(content, { x: positionRef.current });
          this.update();
        }
      },
      onThrowComplete: function () {
        lastTimeRef.current = Date.now();
      },
    })[0];

    // Pause on hover
    const handleMouseEnter = () => {
      if (pauseOnHover) {
        isPausedRef.current = true;
      }
    };

    const handleMouseLeave = () => {
      if (pauseOnHover) {
        isPausedRef.current = false;
        lastTimeRef.current = Date.now();
      }
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      draggable.kill();
    };
  }, [reverse, speed, pauseOnHover]);

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden py-4 cursor-grab active:cursor-grabbing select-none", className)}
    >
      <div ref={contentRef} className="flex gap-4 w-fit will-change-transform">
        {/* Render content 4 times for seamless loop */}
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex shrink-0 gap-4">
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
