import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

interface VideoPlaybackContextValue {
  /** Pause every registered player except `id`, then register `id`'s pause handler. */
  registerPlaying: (id: string, pause: () => void) => void;
  unregister: (id: string) => void;
  pauseAll: () => void;
}

const VideoPlaybackContext = createContext<VideoPlaybackContextValue | null>(null);

export function VideoPlaybackProvider({ children }: { children: ReactNode }) {
  const playersRef = useRef(new Map<string, () => void>());

  const pauseAll = useCallback(() => {
    playersRef.current.forEach((pause) => pause());
  }, []);

  const registerPlaying = useCallback((id: string, pause: () => void) => {
    playersRef.current.forEach((pauseOthers, key) => {
      if (key !== id) pauseOthers();
    });
    playersRef.current.set(id, pause);
  }, []);

  const unregister = useCallback((id: string) => {
    playersRef.current.delete(id);
  }, []);

  const value = useMemo(
    () => ({ registerPlaying, unregister, pauseAll }),
    [registerPlaying, unregister, pauseAll],
  );

  return (
    <VideoPlaybackContext.Provider value={value}>{children}</VideoPlaybackContext.Provider>
  );
}

export function useVideoPlayback() {
  const ctx = useContext(VideoPlaybackContext);
  if (!ctx) {
    throw new Error("useVideoPlayback must be used within VideoPlaybackProvider");
  }
  return ctx;
}

export function useVideoPlaybackOptional() {
  return useContext(VideoPlaybackContext);
}
