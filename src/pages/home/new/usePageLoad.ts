/**
 * usePageLoad.ts
 *
 * Tracks real browser asset loading progress.
 * Returns a 0–100 progress value and a `ready` boolean.
 *
 * Strategy:
 *  1. Wait for window "load" event (HTML, CSS, sync scripts)
 *  2. Collect all <img>, <video>, <audio> elements and wait for them
 *     - images: wait for `load` event (or already `.complete`)
 *     - videos: wait for `canplaythrough` (enough data buffered to play)
 *  3. Wait for any <canvas> elements to have non-empty content (3D models)
 *  4. Safety timeout so we never hang forever
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

    // ── 2. Collect all media assets from the DOM ───────────────────────────
    function collectAssets() {
      // Images
      document.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
        totalAssets++;
        if (img.complete && img.naturalWidth > 0) {
          loadedAssets++;
        } else {
          img.addEventListener("load", onAssetLoaded, { once: true });
          img.addEventListener("error", onAssetLoaded, { once: true });
        }
      });

      // Videos — wait for canplaythrough (enough buffered to play smoothly)
      document.querySelectorAll<HTMLVideoElement>("video").forEach((video) => {
        totalAssets++;
        if (video.readyState >= 4) {
          // HAVE_ENOUGH_DATA
          loadedAssets++;
        } else {
          video.addEventListener("canplaythrough", onAssetLoaded, { once: true });
          video.addEventListener("error", onAssetLoaded, { once: true });
          // Also accept loadeddata as a fallback (readyState >= 2)
          // Some videos behind CDN may never reach canplaythrough quickly
          const fallbackTimer = setTimeout(() => {
            if (video.readyState >= 2) {
              onAssetLoaded();
            }
          }, 5000);
          video.addEventListener("canplaythrough", () => clearTimeout(fallbackTimer), { once: true });
          video.addEventListener("error", () => clearTimeout(fallbackTimer), { once: true });
        }
      });

      // Canvas elements (e.g. Three.js / WebGL) — wait until they have content
      document.querySelectorAll<HTMLCanvasElement>("canvas").forEach((canvas) => {
        totalAssets++;
        // Check if the canvas already has rendered content
        if (canvasHasContent(canvas)) {
          loadedAssets++;
        } else {
          // Poll until canvas has content (Three.js renders asynchronously)
          let attempts = 0;
          const maxAttempts = 40; // 40 * 250ms = 10s
          const pollInterval = setInterval(() => {
            attempts++;
            if (canvasHasContent(canvas) || attempts >= maxAttempts) {
              clearInterval(pollInterval);
              onAssetLoaded();
            }
          }, 250);
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

/**
 * Check if a canvas element has been initialized and rendered.
 *
 * For WebGL canvases (Three.js etc.), we can't call getContext without
 * conflicting with the existing context. Instead, we check:
 *  - The canvas has non-zero dimensions (Three.js has sized it)
 *  - The canvas has a data attribute or we just check it's been mounted
 *    for long enough that the renderer has had time to draw a frame.
 */
function canvasHasContent(canvas: HTMLCanvasElement): boolean {
  // Canvas must be in the DOM and have real dimensions
  if (!canvas.isConnected) return false;
  if (canvas.width === 0 || canvas.height === 0) return false;
  if (canvas.clientWidth === 0 || canvas.clientHeight === 0) return false;

  // If the canvas has a rendered width > 1px, Three.js/WebGL has initialized
  return true;
}
