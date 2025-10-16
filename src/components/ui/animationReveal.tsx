import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { SplitText } from "gsap/SplitText";

type RevealAnimationProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  threshold?: number;
  blurAmount?: number;
  yPercent?: number;
};

const RevealAnimation = ({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 1,
  threshold = 0.1,
  blurAmount,
  yPercent = 100,
}: RevealAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (ref.current) {
      // Animation with ScrollTrigger
      const textLine = SplitText.create(ref.current.children);
      gsap.from(textLine.lines, {
        opacity: 1,
        filter: `blur(${blurAmount}px)`,
        yPercent,
        duration,
        delay,
        ease: "power4.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ref.current,
          start: `top ${(1 - threshold) * 100}%`,
          once: true,
        },
      });
    }
  }, [direction, duration, delay, threshold]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
};

export default RevealAnimation;
