/**
 * usePageLoad.ts
 *
 * Tracks real browser asset loading progress (images only).
 * Returns a 0–100 progress value and a `ready` boolean.
 *
 * Strategy:
 *  1. Wait for window "load" event (HTML, CSS, sync scripts)
 *  2. Collect all <img> elements and wait for them to load
 *  3. Safety timeout so we never hang forever
 *
 * Videos and 3D models (canvas/GLB) are intentionally excluded
 * so the page becomes interactive as fast as possible.
 * They continue loading in the background after the preloader finishes.
 */

import { useState, useEffect, useRef, useCallback } from "react";

interface UsePageLoadOptions {
  /** Minimum time (ms) the loader stays visible. Default: 1000 */
  minDuration?: number;
  /** Maximum time (ms) to wait before force-completing. Default: 12000 */
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
  maxWait = 12000,
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
    const wait = Math.max(0, minDuration - elapsed);
    setTimeout(() => {
      setReady(true);
    }, wait);
  }, [minDuration]);

  useEffect(() => {
    let isMounted = true;

    // ── Tracker: count settled vs total assets ─────────────────────────────
    let totalAssets = 0;
    let loadedAssets = 0;

    function tick() {
      if (!isMounted || hasFinished.current) return;
      const pct = totalAssets > 0
        ? Math.min(95, Math.round((loadedAssets / totalAssets) * 100))
        : 0;
      setProgress(pct);
    }

    function onAssetLoaded() {
      loadedAssets++;
      tick();
      checkAllDone();
    }

    function checkAllDone() {
      if (hasFinished.current) return;
      if (loadedAssets >= totalAssets && windowLoaded) {
        markDone();
      }
    }

    // ── 1. Window load (baseline) ──────────────────────────────────────────
    let windowLoaded = document.readyState === "complete";

    function onWindowLoad() {
      windowLoaded = true;
      // After window load, collect DOM assets that may still be loading
      collectAssets();
      tick();
      checkAllDone();
    }

    if (document.readyState === "complete") {
      // Already loaded (e.g. HMR refresh)
      // Use a small delay to let React render the DOM first
      setTimeout(() => {
        if (!isMounted) return;
        collectAssets();
        tick();
        checkAllDone();
      }, 100);
    } else {
      window.addEventListener("load", onWindowLoad, { once: true });
    }

    // ── 2. Collect image assets from the DOM ───────────────────────────────
    function collectAssets() {
      // Images only — videos and canvas/GLB load in the background
      document.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
        totalAssets++;
        if (img.complete && img.naturalWidth > 0) {
          loadedAssets++;
        } else {
          img.addEventListener("load", onAssetLoaded, { once: true });
          img.addEventListener("error", onAssetLoaded, { once: true });
        }
      });

      // If no assets were found, we're done immediately
      if (totalAssets === 0) {
        checkAllDone();
      }

      tick();
    }

    // ── 3. Periodic progress updates for smoother feel ─────────────────────
    const progressInterval = setInterval(() => {
      if (!isMounted || hasFinished.current) {
        clearInterval(progressInterval);
        return;
      }
      tick();
    }, 200);

    // ── 4. Safety timeout — never hang forever ─────────────────────────────
    const safetyTimer = setTimeout(() => {
      if (!isMounted) return;
      markDone();
    }, maxWait);

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      isMounted = false;
      clearInterval(progressInterval);
      clearTimeout(safetyTimer);
      window.removeEventListener("load", onWindowLoad);
    };
  }, [minDuration, maxWait, markDone]);

  return { progress, ready };
}
