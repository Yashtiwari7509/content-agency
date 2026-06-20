import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface ApertureLoaderProps {
  /** Called once the exit animation fully completes */
  onComplete?: () => void;
  /**
   * Pass your own asset URLs. The loader waits until ALL of them
   * are loaded (or 3 s max) before counting to 100 and exiting.
   * Leave empty to just use a timed simulation.
   */
  assets?: string[];
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function ApertureLoader({
  onComplete,
  assets = [],
}: ApertureLoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    // ── 1. Preload assets ──────────────────────────────────────────
    const preload = (urls: string[]): Promise<void> => {
      if (!urls.length) return Promise.resolve();

      const promises = urls.map(
        (src) =>
          new Promise<void>((res) => {
            if (src.match(/\.(mp4|webm|ogg)$/i)) {
              // Video: just resolve after metadata
              const v = document.createElement("video");
              v.onloadedmetadata = () => res();
              v.onerror = () => res();
              v.src = src;
            } else {
              const img = new Image();
              img.onload = () => res();
              img.onerror = () => res();
              img.src = src;
            }
          })
      );

      // Hard cap of 3 s so loader never hangs
      const timeout = new Promise<void>((res) => setTimeout(res, 3000));
      return Promise.race([Promise.all(promises), timeout]) as Promise<void>;
    };

    // ── 2. Eased counter (fast → slow, Aperture style) ─────────────
    const runCounter = (
      onDone: () => void,
      durationMs = 1600
    ) => {
      const start = performance.now();

      const tick = (now: number) => {
        if (!isMounted) return;
        const elapsed = now - start;
        const linear = Math.min(elapsed / durationMs, 1);
        // ease-out cubic: starts fast, slows near 100
        const eased = 1 - Math.pow(1 - linear, 3);
        const value = Math.floor(eased * 100);
        setCount(value);

        if (linear < 1) {
          requestAnimationFrame(tick);
        } else {
          setCount(100);
          onDone();
        }
      };

      requestAnimationFrame(tick);
    };

    // ── 3. Exit animation (overlay slides up) ─────────────────────
    const exit = () => {
      if (!isMounted) return;

      const tl = gsap.timeline({
        onComplete: () => {
          if (isMounted) onComplete?.();
        },
      });

      tl
        // Hold at 100 for a beat
        .to({}, { duration: 0.3 })
        // Slide the whole overlay up and out
        .to(overlayRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power3.inOut",
        });
    };

    // ── 4. Orchestrate ─────────────────────────────────────────────
    const run = async () => {
      // Animate bar from 0 → 100% in sync with preloading
      // Bar fills during asset load, then counter fires
      const barTween = gsap.to(barRef.current, {
        scaleX: 1,
        duration: 1.8,
        ease: "none",
        paused: true,
      });

      barTween.play();
      await preload(assets);
      // Make sure bar completes
      await gsap.to(barRef.current, {
        scaleX: 1,
        duration: 0.2,
        ease: "none",
      });

      runCounter(exit, 1400);
    };

    run();

    return () => {
      isMounted = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        padding: "40px 48px",
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Counter */}
      <div
        ref={counterRef}
        style={{
          fontSize: "clamp(56px, 10vw, 120px)",
          fontWeight: 300,
          color: "#ffffff",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          marginBottom: "32px",
          fontVariantNumeric: "tabular-nums",
          userSelect: "none",
        }}
      >
        {count}
      </div>

      {/* Progress bar track */}
      <div
        style={{
          width: "100%",
          height: "1px",
          background: "rgba(255,255,255,0.12)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          ref={barRef}
          style={{
            position: "absolute",
            inset: 0,
            background: "#ffffff",
            transformOrigin: "left center",
            transform: "scaleX(0)",
          }}
        />
      </div>
    </div>
  );
}
