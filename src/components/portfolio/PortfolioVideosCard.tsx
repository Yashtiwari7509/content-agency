import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGsapSlider } from "./useGsapSlider";
import PortfolioVideoTile from "./PortfolioVideoTile";
import type { PortfolioVideo } from "./types";

interface PortfolioVideosCardProps {
  videos: PortfolioVideo[];
  clientName: string;
  clientId: string;
}

const PortfolioVideosCard = ({ videos, clientName, clientId }: PortfolioVideosCardProps) => {
  const total = videos.length;
  const { trackRef, current, goTo, onPointerDown, onPointerMove, wasDragged } = useGsapSlider(total);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden select-none">
      {/* Slider viewport */}
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl">
        {/* Track */}
        <div
          ref={trackRef}
          className="flex h-full will-change-transform cursor-grab"
          style={{ touchAction: "pan-y" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
        >
          {videos.map((video, index) => (
            <div
              key={`${clientId}-${video.src}-${index}`}
              className="h-full w-full shrink-0 px-0.5"
            >
              <PortfolioVideoTile
                video={video}
                playbackId={`${clientId}-video-${index}`}
                label={`${clientName} — ${video.title ?? `video ${index + 1}`}`}
                wasDragged={wasDragged}
              />
            </div>
          ))}
        </div>

        {/* Prev / Next arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              disabled={current === 0}
              aria-label="Previous video"
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white shadow-lg ring-1 ring-white/10 backdrop-blur-sm transition hover:bg-black/70 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              disabled={current === total - 1}
              aria-label="Next video"
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white shadow-lg ring-1 ring-white/10 backdrop-blur-sm transition hover:bg-black/70 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {total > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5 pb-1">
          {videos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to video ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-gray-800" : "w-1.5 bg-gray-300 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioVideosCard;
