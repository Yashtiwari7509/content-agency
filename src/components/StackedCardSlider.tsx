import { useRef, useState, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Compare } from "@/components/compare";
import { cards, type CardDef } from "@/constant/workflowSection";


// ─── Per-slot visual properties ───────────────────────────────────────────────

type SlotConfig = {
  x: number;
  scale: number;
  opacity: number;
  rotation: number;
  zIndex: number;
};

/** Slot configs for [prev, center, next] positions */
const SLOTS: SlotConfig[] = [
  { x: -60, scale: 0.82, opacity: 0.48, rotation: -5, zIndex: 1 },
  { x: 0, scale: 1.00, opacity: 1.00, rotation: 0, zIndex: 3 },
  { x: 60, scale: 0.82, opacity: 0.48, rotation: 5, zIndex: 1 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Wrap index into [0, len) */
function wrap(i: number, len: number) {
  return ((i % len) + len) % len;
}

function slotForCard(cardIdx: number, newCenter: number, len: number): SlotConfig {
  const prevIdx = wrap(newCenter - 1, len);
  const nextIdx = wrap(newCenter + 1, len);
  if (cardIdx === newCenter) return SLOTS[1];
  if (cardIdx === prevIdx) return SLOTS[0];
  if (cardIdx === nextIdx) return SLOTS[2];
  return { ...SLOTS[1], opacity: 0, zIndex: 0 };
}

/** Render the content of a single card */
function CardContent({ card }: { card: CardDef }) {
  if (card.type === "compare") {
    return (
      <Compare
        firstVideo={card.firstVideo}
        secondVideo={card.secondVideo}
        firstImage={card.firstImage}
        secondImage={card.secondImage}
        className="w-full h-full"
        slideMode="hover"
        showHandlebar
        autoplay
        autoplayDuration={4000}
      />
    );
  }
  return (
    <img
      src={(card as { type: "image"; src: string; alt?: string }).src}
      alt={(card as { type: "image"; src: string; alt?: string }).alt ?? "Slide"}
      className="w-full h-full object-cover rounded-2xl"
      draggable={false}
    />
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function StackedCardSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAnimating = useRef(false);

  const [center, setCenter] = useState(1);

  // ── Animation ───────────────────────────────────────────────────────────────

  const animateToSlots = useCallback(
    (newCenter: number, onComplete?: () => void) => {
      const len = cards.length;

      const tl = gsap.timeline({
        defaults: { duration: 0.65, ease: "power3.inOut" },
        onComplete: () => {
          isAnimating.current = false;
          onComplete?.();
        },
      });

      cardRefs.current.forEach((el, idx) => {
        if (!el) return;
        const s = slotForCard(idx, newCenter, len);
        tl.to(
          el,
          {
            x: s.x,
            scale: s.scale,
            opacity: s.opacity,
            rotation: s.rotation,
            zIndex: s.zIndex,
          },
          0,
        );
      });
    },
    [],
  );

  const goTo = useCallback(
    (newCenter: number) => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      const normalized = wrap(newCenter, cards.length);
      setCenter(normalized);
      animateToSlots(normalized);
    },
    [animateToSlots],
  );

  const goPrev = useCallback(() => goTo(center - 1), [center, goTo]);
  const goNext = useCallback(() => goTo(center + 1), [center, goTo]);

  // ── Auto-play ───────────────────────────────────────────────────────────────

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearTimeout(autoplayRef.current);
    autoplayRef.current = setTimeout(() => {
      goNext();
    }, 3500);
  }, [goNext]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [center, startAutoplay, stopAutoplay]);

  // ── Initial placement (no tween — instant set) ──────────────────────────────

  useGSAP(
    () => {
      cardRefs.current.forEach((el, idx) => {
        if (!el) return;
        const s = slotForCard(idx, center, cards.length);
        gsap.set(el, {
          x: s.x,
          scale: s.scale,
          opacity: s.opacity,
          rotation: s.rotation,
          zIndex: s.zIndex,
        });
      });
    },
    { scope: containerRef, dependencies: [] },
  );

  return (
    <div
      ref={containerRef}
      className="stacked-slider"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
      role="region"
      aria-label="Card slider"
    >
      {/* ── Track ── */}
      <div className="stacked-slider__track">
        {cards.map((card, idx) => (
          <div
            key={idx}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            className="stacked-slider__card"
            aria-hidden={idx !== center}
            style={{ cursor: idx !== center ? "pointer" : "default" }}
            onClick={() => idx !== center && goTo(idx)}
          >
            <CardContent card={card} />
          </div>
        ))}
      </div>

      {/* ── Controls ── */}
      <div className="stacked-slider__controls">
        <button
          className="stacked-slider__btn"
          onClick={goPrev}
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="stacked-slider__dots">
          {cards.map((_, i) => (
            <button
              key={i}
              className={`stacked-slider__dot${i === center ? " stacked-slider__dot--active" : ""
                }`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          className="stacked-slider__btn"
          onClick={goNext}
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
