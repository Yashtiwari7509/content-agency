import { useEffect, useState } from "react";

// ── Critical images: Loader + first 2 sections ──────────────────
// Loader team lineup (visible during the intro animation)
import { Andrew1, Chris1, Nick1, Rahul1, Thomas1 } from "@/assets/ClientImage";
// Hero section — DPs + cloud bg
import { A_dp, N_dp, T_dp } from "@/assets/ClientImage";

/**
 * ~12 images across Loader + Hero + GridScore.
 * Kept lean so the loader doesn't stall.
 */
const CRITICAL_SRCS: string[] = [
  // Loader team (5)
  Andrew1,
  Chris1,
  Nick1,
  Rahul1,
  Thomas1,
  // Hero (4)
  A_dp,
  N_dp,
  T_dp,
];

interface UsePageLoadOptions {
  /** Minimum ms the loader stays visible (lets the intro animation play) */
  minDuration?: number;
}

/**
 * Preloads critical above-the-fold images and reports real progress.
 *
 * - `progress` — 0→100 driven by actual image load events
 * - `ready` — true when all images loaded AND minDuration elapsed
 */
export function usePageLoad({ minDuration = 1800 }: UsePageLoadOptions = {}) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const total = CRITICAL_SRCS.length;
    let loaded = 0;
    let cancelled = false;

    let timerDone = false;
    let allImagesDone = false;

    const tryFinish = () => {
      if (cancelled) return;
      if (timerDone && allImagesDone) {
        setProgress(100);
        setReady(true);
      }
    };

    const timerId = window.setTimeout(() => {
      timerDone = true;
      tryFinish();
    }, minDuration);

    // ── image preloading ────────────────────────────────────────
    const counted = new Set<string>();

    const onImageReady = (src: string) => {
      if (cancelled || counted.has(src)) return;
      counted.add(src);
      loaded += 1;

      const pct = Math.round((loaded / total) * 100);
      setProgress(pct);

      if (loaded >= total) {
        allImagesDone = true;
        tryFinish();
      }
    };

    CRITICAL_SRCS.forEach((src) => {
      const img = new Image();
      img.onload = () => onImageReady(src);
      img.onerror = () => onImageReady(src);
      img.src = src;

      if (img.complete) {
        onImageReady(src);
      }
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timerId);
    };
  }, [minDuration]);

  return { progress, ready };
}
