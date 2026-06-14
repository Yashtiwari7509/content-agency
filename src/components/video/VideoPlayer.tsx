import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Plyr as PlyrComponent } from "plyr-react";
import type { APITypes, PlyrInstance, PlyrOptions } from "plyr-react";
import "plyr-react/plyr.css";
import { cn } from "@/lib/utils";
import { buildPlyrSource, getVideoProvider, isPlayableVideoSrc } from "./videoSource";
import { useVideoPlaybackOptional } from "./VideoPlaybackContext";

export type VideoPlayerVariant = "default" | "preview" | "theater";

export interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  variant?: VideoPlayerVariant;
  className?: string;
  label?: string;
  /** Unique id for exclusive playback across the portfolio */
  playbackId?: string;
  autoPlay?: boolean;
}

const THEATER_CONTROLS: PlyrOptions["controls"] = ["play", "progress", "current-time", "mute", "volume", "fullscreen"];

const PREVIEW_CONTROLS: PlyrOptions["controls"] = [];

/** Must include customControls — shallow option merge drops Plyr defaults otherwise */
const YOUTUBE_EMBED_OPTIONS = {
  customControls: true,
  controls: 0,
  disablekb: 1,
  fs: 0,
  rel: 0,
  showinfo: 0,
  iv_load_policy: 3,
  modestbranding: 1,
  playsinline: 1,
  noCookie: true,
} as const;

/** plyr-react exposes a stub on ref until the real Plyr instance is ready */
function getReadyPlyr(ref: RefObject<APITypes | null>): PlyrInstance | null {
  const plyr = ref.current?.plyr;
  if (plyr && typeof plyr.on === "function" && typeof plyr.pause === "function") {
    return plyr;
  }
  return null;
}

function waitForPlyr(ref: RefObject<APITypes | null>, onReady: (plyr: PlyrInstance) => void): (() => void) | undefined {
  const ready = getReadyPlyr(ref);
  if (ready) {
    onReady(ready);
    return undefined;
  }

  const interval = window.setInterval(() => {
    const plyr = getReadyPlyr(ref);
    if (plyr) {
      window.clearInterval(interval);
      onReady(plyr);
    }
  }, 50);

  return () => window.clearInterval(interval);
}

const VideoPlayer = ({ src, poster, title, variant = "default", className, label, playbackId, autoPlay = false }: VideoPlayerProps) => {
  const isPreview = variant === "preview";
  const isTheater = variant === "theater";
  const innerRef = useRef<APITypes>(null);
  const playback = useVideoPlaybackOptional();

  const source = useMemo(() => buildPlyrSource(src, poster), [src, poster]);
  const isYoutube = getVideoProvider(src) === "youtube";

  const options = useMemo<PlyrOptions>(
    () => ({
      controls: isPreview ? PREVIEW_CONTROLS : THEATER_CONTROLS,
      autoplay: isPreview ? true : false,
      muted: isPreview ? true : false,
      loop: { active: isPreview },
      // YouTube iframe clicks fight Plyr; use Plyr controls only
      clickToPlay: !isPreview && !isYoutube,
      hideControls: isPreview,
      fullscreen: { enabled: isTheater || variant === "default" },
      youtube: { ...YOUTUBE_EMBED_OPTIONS },
    }),
    [isPreview, isTheater, autoPlay, variant, isYoutube],
  );

  useEffect(() => {
    if (!playbackId || !playback) return;

    let detach: (() => void) | undefined;

    const setup = (plyr: PlyrInstance) => {
      const onPlay = () => {
        playback.registerPlaying(playbackId, () => {
          plyr.pause();
        });
      };

      plyr.on("play", onPlay);
      detach = () => {
        plyr.off("play", onPlay);
        playback.unregister(playbackId);
      };
    };

    const cancelWait = waitForPlyr(innerRef, setup);

    return () => {
      cancelWait?.();
      detach?.();
    };
  }, [playbackId, playback, src]);

  useEffect(() => {
    if (!autoPlay || isPreview) return;

    let cancelled = false;
    let playTimeout: number | undefined;

    const cancelWait = waitForPlyr(innerRef, (plyr) => {
      playTimeout = window.setTimeout(() => {
        if (cancelled) return;
        const result = plyr.play();
        if (result instanceof Promise) void result.catch(() => undefined);
      }, 150);
    });

    return () => {
      cancelled = true;
      cancelWait?.();
      if (playTimeout) window.clearTimeout(playTimeout);
    };
  }, [autoPlay, isPreview, src]);

  if (!isPlayableVideoSrc(src)) {
    return (
      <div
        className={cn("flex h-full w-full items-center justify-center bg-gray-900 text-sm text-gray-400", className)}
        role="img"
        aria-label={label ?? title ?? "Video unavailable"}
      >
        Unsupported video source
      </div>
    );
  }

  return (
    <div
      className={cn(
        "video-player h-full w-full",
        isPreview && "video-player--preview",
        isTheater && "video-player--theater",
        isYoutube && "video-player--youtube",
        className,
      )}
      aria-label={label ?? title}
    >
      <PlyrComponent ref={innerRef} source={source} options={options} />
    </div>
  );
};

export type { APITypes };
export default VideoPlayer;
