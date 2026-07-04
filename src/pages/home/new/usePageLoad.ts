/**
 * usePageLoad.ts
 *
 * Tracks real browser asset loading progress.
 * Returns a 0–100 progress value and a `ready` boolean.
 *
 * Strategy:
 *  1. Collect all <img>, <video>, <audio> elements + CSS background images
 *  2. Track each resource via PerformanceObserver (catches fonts, scripts, styles too)
 *  3. Falls back gracefully to window "load" event if PerformanceObserver unavailable
 */

import { useState, useEffect, useRef } from "react";

interface UsePageLoadOptions {
  /** Minimum time (ms) the loader stays visible. Default: 1000 */
  minDuration?: number;
}

interface UsePageLoadResult {
  /** 0 – 100 */
  progress: number;
  /** true once progress hits 100 AND minDuration has elapsed */
  ready: boolean;
}

export function usePageLoad({
  minDuration = 1000,
}: UsePageLoadOptions = {}): UsePageLoadResult {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const startTime = useRef(performance.now());

  useEffect(() => {
    let isMounted = true;

    // ── 1. Collect media elements already in the DOM ──────────────────────────
    function collectMediaAssets(): Promise<void>[] {
      const promises: Promise<void>[] = [];

      // <img> tags
      document.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
        if (img.complete) return; // already loaded
        promises.push(
          new Promise((resolve) => {
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true }); // don't stall on broken imgs
          })
        );
      });

      // <video> / <audio> — wait for metadata (not full download)
      // document
      //   .querySelectorAll<HTMLMediaElement>("video, audio")
      //   .forEach((el) => {
      //     if (el.readyState >= 1) return;
      //     promises.push(
      //       new Promise((resolve) => {
      //         el.addEventListener("loadedmetadata", () => resolve(), {
      //           once: true,
      //         });
      //         el.addEventListener("error", () => resolve(), { once: true });
      //       })
      //     );
      //   });

      return promises;
    }

    // ── 2. PerformanceObserver — catches fonts, scripts, stylesheets, XHR ────
    function observeResources(
      onTick: (loaded: number, total: number) => void
    ): () => void {
      if (typeof PerformanceObserver === "undefined") return () => {};

      // Snapshot what's already finished
      const alreadyDone = performance.getEntriesByType("resource").length;
      let loaded = alreadyDone;

      // Estimate total from network requests initiated so far
      // We'll grow `total` as new resources appear
      let total = Math.max(
        alreadyDone,
        performance.getEntriesByType("resource").length + 5 // headroom
      );

      const obs = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        loaded += entries.length;
        total = Math.max(total, loaded + 1); // always leave room
        onTick(loaded, total);
      });

      try {
        obs.observe({ type: "resource", buffered: true });
      } catch {
        // Firefox private mode etc.
      }

      return () => obs.disconnect();
    }

    // ── 3. Main logic ─────────────────────────────────────────────────────────
    let resourceLoaded = 0;
    let resourceTotal = 1;
    let mediaSettled = false;
    let windowLoaded = document.readyState === "complete";

    function computeProgress() {
      if (!isMounted) return;

      // Blend: 70% from PerformanceObserver resource count, 30% from window load
      const resourcePct =
        resourceTotal > 0
          ? Math.min(1, resourceLoaded / resourceTotal)
          : 0;

      const windowPct = windowLoaded ? 1 : 0;
      const mediaPct = mediaSettled ? 1 : 0;

      const blended = resourcePct * 0.6 + windowPct * 0.25 + mediaPct * 0.15;
      const pct = Math.min(99, Math.round(blended * 100)); // cap at 99 until truly done

      setProgress(pct);
    }

    function markDone() {
      if (!isMounted) return;
      setProgress(100);
      const elapsed = performance.now() - startTime.current;
      const wait = Math.max(0, minDuration - elapsed);
      setTimeout(() => {
        if (isMounted) setReady(true);
      }, wait);
    }

    // Resource observer
    const disconnectObs = observeResources((loaded, total) => {
      resourceLoaded = loaded;
      resourceTotal = total;
      computeProgress();
    });

    // Media assets
    const mediaPromises = collectMediaAssets();
    mediaSettled = mediaPromises.length === 0;
    if (mediaPromises.length > 0) {
      Promise.allSettled(mediaPromises).then(() => {
        mediaSettled = true;
        computeProgress();
      });
    }

    // Window load event (the ground truth)
    function onWindowLoad() {
      windowLoaded = true;
      computeProgress();

      // Give PerformanceObserver a tick to flush late entries, then mark done
      setTimeout(markDone, 150);
    }

    if (document.readyState === "complete") {
      // Already loaded before the hook mounted (e.g. HMR refresh)
      windowLoaded = true;
      setTimeout(markDone, 50);
    } else {
      window.addEventListener("load", onWindowLoad, { once: true });
    }

    // Kick off an initial progress paint
    computeProgress();

    return () => {
      isMounted = false;
      disconnectObs();
      window.removeEventListener("load", onWindowLoad);
    };
  }, [minDuration]);

  return { progress, ready };
}
