/**
 * usePageLoad.ts
 *
 * Tracks image loading progress only.
 * Returns a 0–100 progress value and a `ready` boolean.
 *
 * Strategy:
 *  1. Wait one frame for React to render the initial DOM
 *  2. Collect all <img> elements and wait for their load/error events
 *  3. Mark done as soon as all images settle (or safety timeout fires)
 *
 * IMPORTANT: We do NOT wait for the `window.load` event because that
 * blocks on every sub-resource (videos, iframes, fonts, etc.), which
 * is exactly what we want to skip.
 */

import { useState, useEffect, useRef, useCallback } from "react";

interface UsePageLoadOptions {
  /** Minimum time (ms) the loader stays visible. Default: 1000 */
  minDuration?: number;
  /** Maximum time (ms) to wait before force-completing. Default: 5000 */
  maxWait?: number;
}

interface UsePageLoadResult {
  /** 0 – 100 */
  progress: number;
  /** true once progress hits 100 AND minDuration has elapsed */
  ready: boolean;
}

export function usePageLoad({
  minDuration = 1000,
  maxWait = 5000,
}: UsePageLoadOptions = {}): UsePageLoadResult {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const startTime = useRef(performance.now());
  const hasFinished = useRef(false);

  const markDone = useCallback(() => {
    if (hasFinished.current) return;
    hasFinished.current = true;

    setProgress(100);
    const elapsed = performance.now() - startTime.current;
    const remaining = Math.max(0, minDuration - elapsed);
    setTimeout(() => {
      setReady(true);
    }, remaining);
  }, [minDuration]);

  useEffect(() => {
    let isMounted = true;
    const tracked = new WeakSet<HTMLImageElement>();

    let totalAssets = 0;
    let loadedAssets = 0;

    function tick() {
      if (!isMounted || hasFinished.current) return;
      if (totalAssets === 0) {
        setProgress(0);
        return;
      }
      const pct = Math.min(99, Math.round((loadedAssets / totalAssets) * 100));
      setProgress(pct);
    }

    function onAssetSettled() {
      loadedAssets++;
      tick();
      if (loadedAssets >= totalAssets) {
        markDone();
      }
    }

    function collectImages() {
      const imgs = document.querySelectorAll<HTMLImageElement>("img");

      if (imgs.length === 0) {
        // No images at all — done immediately
        markDone();
        return;
      }

      imgs.forEach((img) => {
        // Skip if we already tracked this element (prevents double-counting)
        if (tracked.has(img)) return;
        tracked.add(img);

        totalAssets++;

        if (img.complete && img.naturalWidth > 0) {
          // Already loaded
          loadedAssets++;
        } else {
          img.addEventListener("load", onAssetSettled, { once: true });
          img.addEventListener("error", onAssetSettled, { once: true });
        }
      });

      tick();

      // Check if everything was already loaded
      if (loadedAssets >= totalAssets) {
        markDone();
      }
    }

    // Wait one frame so React has flushed the initial DOM,
    // then collect all <img> elements
    const raf = requestAnimationFrame(() => {
      if (!isMounted) return;
      collectImages();
    });

    // Safety timeout — never hang forever
    const safetyTimer = setTimeout(() => {
      if (!isMounted) return;
      markDone();
    }, maxWait);

    return () => {
      isMounted = false;
      cancelAnimationFrame(raf);
      clearTimeout(safetyTimer);
    };
  }, [maxWait, markDone]);

  return { progress, ready };
}

