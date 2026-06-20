import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PhotoSliderProps {
  photos: string[];
  altPrefix: string;
  intervalMs?: number;
}

const PhotoSlider = ({
  photos,
  altPrefix,
  intervalMs = 3500,
}: PhotoSliderProps) => {
  const [current, setCurrent] = useState(0);
  const count = photos.length;

  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % count);
    }, intervalMs);
    return () => clearInterval(id);
  }, [count, intervalMs]);

  const go = (delta: number) => {
    setCurrent((c) => (c + delta + count) % count);
  };

  if (count === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100 text-sm text-gray-400">
        No photos yet
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full rounded-2xl overflow-hidden">
      {photos.map((src, i) => (
        <img
          key={src + i}
          src={src}
          alt={`${altPrefix} ${i + 1}`}
          className="absolute inset-0 w-full object-cover transition-opacity duration-700 aspect-video"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/55"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/55"
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "h-2 w-2 scale-110 bg-white"
                    : "h-1.5 w-1.5 bg-white/50"
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
