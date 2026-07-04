import React from "react";
import { cn } from "@/lib/utils";

type RevealAnimationProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * RevealAnimation
 *
 * Marks its children for the global scroll-reveal animation.
 * The actual SplitText + GSAP animation is handled by a single
 * ScrollTrigger.batch(".reveal-text") in App.tsx — keeping 100s of
 * text blocks performant with zero per-component scroll overhead.
 */
const RevealAnimation = ({ children, className }: RevealAnimationProps) => {
  return (
    <div className={cn("reveal-text", className)}>
      {children}
    </div>
  );
};

export default RevealAnimation;
