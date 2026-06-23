import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGsapSlider } from "./useGsapSlider";

interface PhotoSliderProps {
  photos: string[];
  altPrefix: string;
  intervalMs?: number;
}

const PhotoSlider = ({ photos, altPrefix, intervalMs = 3500 }: PhotoSliderProps) => {
  const total = photos.length;
  const { trackRef, current, goTo, onPointerDown, onPointerMove } = useGsapSlider(total);

  // Auto-advance
  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(() => {
      goTo((current + 1) % total);
    }, intervalMs);
    return () => clearInterval(id);
  }, [current, total, intervalMs, goTo]);

  if (total === 0) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-gray-100 text-sm text-gray-400">
        No photos yet
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl select-none">
      {/* Track */}
      <div
        ref={trackRef}
        className="flex h-full will-change-transform cursor-grab"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
      >
        {photos.map((src, i) => (
          <div key={src + i} className="relative h-full w-full shrink-0">
            <img
              src={src}
              alt={`${altPrefix} ${i + 1}`}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/55 disabled:pointer-events-none disabled:opacity-30"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(current + 1)}
            disabled={current === total - 1}
            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/55 disabled:pointer-events-none disabled:opacity-30"
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? "h-2 w-6 bg-white" : "h-1.5 w-1.5 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PhotoSlider;
