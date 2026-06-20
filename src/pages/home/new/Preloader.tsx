import { useEffect, useRef } from "react";
import { usePageLoad } from "./usePageLoad";

interface PreloaderProps {
  /** Minimum ms the loader stays visible even if assets loaded faster */
  minDuration?: number;
  /** Fired once, the instant `ready` flips true */
  onReady?: () => void;
  /** Fired on every progress change */
  onProgress?: (progress: number) => void;
  children: (state: { progress: number; ready: boolean }) => React.ReactNode;
}

export default function Preloader({ minDuration = 1000, onReady, onProgress, children }: PreloaderProps) {
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
