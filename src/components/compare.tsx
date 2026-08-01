import React, { useRef, useCallback, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { Scan } from "lucide-react";

interface CompareProps {
  // Provide either the *Image or the *Video prop for each side — if both
  // are given for a side, the video wins.
  firstImage?: string;
  secondImage?: string;
  firstVideo?: string;
  secondVideo?: string;
  // Shown while each video loads / before it can play.
  firstVideoPoster?: string;
  secondVideoPoster?: string;
  className?: string;
  firstImageClassName?: string;
  secondImageClassname?: string;
  initialSliderPercentage?: number;
  slideMode?: "hover" | "drag";
  showHandlebar?: boolean;
  autoplay?: boolean;
  autoplayDuration?: number;
}

export const Compare = ({
  firstImage = "",
  secondImage = "",
  firstVideo = "",
  secondVideo = "",
  firstVideoPoster,
  secondVideoPoster,
  className,
  firstImageClassName,
  secondImageClassname,
  initialSliderPercentage = 50,
  slideMode = "hover",
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000,
}: CompareProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);

  const isDraggingRef = useRef(false);
  const percentRef = useRef(initialSliderPercentage);
  const autoplayTweenRef = useRef<gsap.core.Tween | null>(null);
  const resetTweenRef = useRef<gsap.core.Tween | null>(null);

  // Directly mutate the DOM via GSAP instead of React state — avoids a
  // re-render on every pixel of mouse movement.
  const applyPercent = useCallback((percent: number) => {
    const clamped = Math.max(0, Math.min(100, percent));
    percentRef.current = clamped;
    if (dividerRef.current) {
      gsap.set(dividerRef.current, { left: `${clamped}%` });
    }
    if (clipRef.current) {
      // inset(top right bottom left) — crop the right edge by (100 - clamped)%,
      // which leaves the left `clamped`% of the image visible.
      const clip = `inset(0 ${100 - clamped}% 0 0)`;
      // Clip the WRAPPER (which has an opaque background), not just the img.
      // If clip-path were only on the img, any alpha-transparent pixels in
      // firstImage (e.g. cutout-style webp photos) would reveal secondImage
      // underneath even inside the "covered" region. Clipping the opaque
      // wrapper means transparency reveals the backdrop color instead.
      // clipPath alone isn't reliably picked up by Safari/older WebKit, so
      // set both explicitly rather than relying on gsap's autoprefixing.
      clipRef.current.style.clipPath = clip;
      clipRef.current.style.setProperty("-webkit-clip-path", clip);
    }
  }, []);

  const stopAutoplay = useCallback(() => {
    autoplayTweenRef.current?.kill();
    autoplayTweenRef.current = null;
  }, []);

  const startAutoplay = useCallback(() => {
    if (!autoplay) return;
    stopAutoplay();
    const proxy = { value: percentRef.current };
    autoplayTweenRef.current = gsap.to(proxy, {
      value: 100,
      duration: autoplayDuration / 1000,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      onUpdate: () => applyPercent(proxy.value),
    });
  }, [autoplay, autoplayDuration, applyPercent, stopAutoplay]);

  useEffect(() => {
    applyPercent(initialSliderPercentage);
    startAutoplay();
    return () => {
      stopAutoplay();
      resetTweenRef.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function mouseEnterHandler() {
    stopAutoplay();
    resetTweenRef.current?.kill();
  }

  function mouseLeaveHandler() {
    if (slideMode === "hover") {
      resetTweenRef.current?.kill();
      const proxy = { value: percentRef.current };
      resetTweenRef.current = gsap.to(proxy, {
        value: initialSliderPercentage,
        duration: 0.4,
        ease: "power3.out",
        onUpdate: () => applyPercent(proxy.value),
      });
    }
    if (slideMode === "drag") {
      isDraggingRef.current = false;
    }
    startAutoplay();
  }

  const handleStart = useCallback(() => {
    if (slideMode === "drag") isDraggingRef.current = true;
  }, [slideMode]);

  const handleEnd = useCallback(() => {
    if (slideMode === "drag") isDraggingRef.current = false;
  }, [slideMode]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      if (slideMode === "hover" || (slideMode === "drag" && isDraggingRef.current)) {
        const rect = sliderRef.current.getBoundingClientRect();
        const percent = ((clientX - rect.left) / rect.width) * 100;
        applyPercent(percent);
      }
    },
    [slideMode, applyPercent],
  );

  const handleMouseDown = () => handleStart();
  const handleMouseUp = () => handleEnd();
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);

  const handleTouchStart = () => {
    if (!autoplay) handleStart();
  };
  const handleTouchEnd = () => {
    if (!autoplay) handleEnd();
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!autoplay) handleMove(e.touches[0].clientX);
  };

  const clipStyle = {
    clipPath: `inset(0 ${100 - initialSliderPercentage}% 0 0)`,
    WebkitClipPath: `inset(0 ${100 - initialSliderPercentage}% 0 0)`,
  } as React.CSSProperties;

  return (
    <div
      ref={sliderRef}
      className={cn("w-[400px] h-[400px] overflow-hidden rounded-2xl", className)}
      style={{
        position: "relative",
        cursor: slideMode === "drag" ? "grab" : "col-resize",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={mouseLeaveHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      {/* Base layer: second image/video, always full size underneath */}
      {secondVideo ? (
        <video
          className={cn("absolute inset-0 z-[19] w-full h-full object-cover select-none", secondImageClassname)}
          src={secondVideo}
          poster={secondVideoPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      ) : secondImage ? (
        <img
          className={cn("absolute inset-0 z-[19] w-full h-full object-cover select-none", secondImageClassname)}
          alt="second image"
          src={secondImage}
          draggable={false}
        />
      ) : null}

      {/* Top layer: first image/video, clipped to reveal only up to the divider.
          The clip-path lives on this wrapper (not the media) and the wrapper
          has an opaque background — that way, if firstImage/firstVideo has any
          alpha transparency, the backdrop shows through instead of the base
          layer bleeding into the "covered" region. */}
      {firstVideo || firstImage ? (
        <div ref={clipRef} className="absolute inset-0 z-20 overflow-hidden pointer-events-none bg-white" style={clipStyle}>
          {firstVideo ? (
            <video
              className={cn("absolute inset-0 w-full h-full object-cover select-none", firstImageClassName)}
              src={firstVideo}
              poster={firstVideoPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <img
              alt="first image"
              src={firstImage}
              className={cn("absolute inset-0 w-full h-full object-cover select-none", firstImageClassName)}
              draggable={false}
            />
          )}
        </div>
      ) : null}

      <div
        ref={dividerRef}
        className="h-full w-px absolute top-0 m-auto z-40 bg-gradient-to-b from-transparent from-[5%] to-[95%] via-indigo-500 to-transparent"
        style={{ left: `${initialSliderPercentage}%` }}
      >
        <div className="w-36 h-full [mask-image:radial-gradient(100px_at_left,white,transparent)] absolute top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-indigo-400 via-transparent to-transparent z-20 opacity-50" />
        <div className="w-10 h-1/2 [mask-image:radial-gradient(50px_at_left,white,transparent)] absolute top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-cyan-400 via-transparent to-transparent z-10 opacity-100" />
        <div className="w-10 h-3/4 top-1/2 -translate-y-1/2 absolute -right-10 [mask-image:radial-gradient(100px_at_left,white,transparent)]"></div>
        {showHandlebar && (
          <div className="h-5 w-5 rounded-md top-1/2 -translate-y-1/2 backdrop z-30 -right-2.5 absolute flex items-center justify-center shadow-[0px_-1px_0px_0px_#FFFFFF40]">
            <Scan className="h-4 w-4 text-white" />
          </div>
        )}
      </div>
    </div>
  );
};
