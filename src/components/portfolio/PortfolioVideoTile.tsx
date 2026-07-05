import { useState, type RefObject } from "react";
import { Play } from "lucide-react";
import VideoPlayer from "@/components/video/VideoPlayer";
import { useVideoPlayback } from "@/components/video/VideoPlaybackContext";
import {
  getVideoProvider,
  getVideoThumbnail,
  isPlayableVideoSrc,
} from "@/components/video/videoSource";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PortfolioVideo } from "./types";

interface PortfolioVideoTileProps {
  video: PortfolioVideo;
  playbackId: string;
  label: string;
  /** Ref from the parent slider — if true at click time, suppress dialog open */
  wasDragged?: RefObject<boolean>;
}

const PortfolioVideoTile = ({ video, playbackId, label, wasDragged }: PortfolioVideoTileProps) => {
  const [open, setOpen] = useState(false);
  const playback = useVideoPlayback();
  const thumbnail = getVideoThumbnail(video.src, video.poster);
  const isEmbed = getVideoProvider(video.src) !== "html5";

  const handleOpen = () => {
    // Don't open if the parent slider was just dragged
    if (wasDragged?.current) return;
    playback.pauseAll();
    setOpen(true);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) playback.pauseAll();
    setOpen(next);
  };

  if (!isPlayableVideoSrc(video.src)) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-400">
        Video unavailable
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="group relative flex w-full flex-col overflow-hidden rounded-xl bg-gray-950 text-left ring-1 ring-gray-200/80 transition hover:ring-pink-300/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
        aria-label={`Play ${label}`}
      >
        <div className="relative aspect-video w-full overflow-hidden">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt=""
              draggable={false}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <video
              src={video.src}
              muted
              playsInline
              preload="none"
              className="h-full w-full object-cover"
              aria-hidden
            />
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-black/10" />

          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full backdrop text-gray-900 border border-white/30 shadow-lg transition group-hover:scale-105">
              <Play className="ml-1 h-6 w-6 text-white" />
            </span>
          </span>

          {video.title && (
            <span className="absolute bottom-0 left-0 right-0 px-3 py-2.5 text-sm font-medium text-white">
              {video.title}
            </span>
          )}
        </div>
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          showCloseButton
          className={[
            // Responsive width: full on mobile, capped at 4xl on desktop
            "w-[calc(100vw-1rem)] sm:w-full sm:max-w-2xl md:max-w-4xl",
            "gap-0 overflow-hidden border-0 bg-black p-0",
            // Ensure close button is visible above the video
            "[&_[data-slot=dialog-close]]:z-20 [&_[data-slot=dialog-close]]:text-white [&_[data-slot=dialog-close]]:opacity-90 [&_[data-slot=dialog-close]]:hover:opacity-100",
            "[&_[data-slot=dialog-close]]:bg-black/40 [&_[data-slot=dialog-close]]:rounded-full [&_[data-slot=dialog-close]]:p-1",
          ].join(" ")}
        >
          <DialogTitle className="sr-only">{video.title ?? label}</DialogTitle>
          <div className="aspect-video w-full bg-black">
            {open && (
              <VideoPlayer
                key={playbackId}
                playbackId={playbackId}
                src={video.src}
                poster={video.poster}
                title={video.title}
                label={label}
                variant="theater"
                autoPlay
                className="video-player--theater h-full w-full"
              />
            )}
          </div>
          {video.title && (
            <p className="border-t border-white/10 px-4 py-3 text-sm font-medium text-white">
              {video.title}
              {isEmbed && (
                <span className="mt-0.5 block text-xs font-normal text-white/50">
                  Press play to start
                </span>
              )}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PortfolioVideoTile;
