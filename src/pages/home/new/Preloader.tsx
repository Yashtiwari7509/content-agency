import { useEffect, useRef } from "react";
import { usePageLoad } from "./usePageLoad";

interface PreloaderProps {
  /** Minimum ms the loader stays visible (lets the team intro animate) */
  minDuration?: number;
  /** Fired once when loader is done — images loaded + minDuration elapsed */
  onReady?: () => void;
  /** Fired on every progress tick (0-100) */
  onProgress?: (progress: number) => void;
  children: (state: { progress: number; ready: boolean }) => React.ReactNode;
}

/**
 * Agency-style preloader.
 *
 * Waits for the critical above-the-fold images (team lineup + hero DPs)
 * to finish loading before signalling `ready`. Progress reflects real
 * image load state — no fake counters.
 */
export default function Preloader({
  minDuration = 1800,
  onReady,
  onProgress,
  children,
}: PreloaderProps) {
  const { progress, ready } = usePageLoad({ minDuration });
  const hasFiredReady = useRef(false);

  useEffect(() => {
    onProgress?.(progress);
  }, [progress, onProgress]);

  useEffect(() => {
    if (ready && !hasFiredReady.current) {
      hasFiredReady.current = true;
      onReady?.();
    }
  }, [ready, onReady]);

  return <>{children({ progress, ready })}</>;
}
