import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { brush } from "@/assets/Image";

type SlotName = "far-left" | "left" | "center" | "right" | "far-right";

interface CardData {
  src: string;
  ratio: "9/16" | "16/9";
}

interface SlotProps {
  tx: number;
  tz: number;
  ry: number;
  rot: number;
  sc: number;
  op: number;
  bl: number;
  z: number;
}

const DEFAULT_CARDS: CardData[] = [
  {
    src: "./video.mp4",
    ratio: "9/16",
  },
  {
    src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610823/dorian_pod_ir9eke.mp4",
    ratio: "16/9",
  },
  {
    src: "./video2.mp4",
    ratio: "9/16",
  },
  {
    src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610824/3_Engazing_Intro_yet9ws.mp4",
    ratio: "16/9",
  },
];

const DEFAULT_WORDS = ["Shorts", "Podcasts", "Reels", "LongForm"];

const SLOTS: Record<SlotName, SlotProps> = {
  "far-left": {
    tx: -370,
    tz: -220,
    ry: 42,
    rot: -13,
    sc: 0.7,
    op: 0,
    bl: 8,
    z: 1,
  },
  left: { tx: -185, tz: -110, ry: 30, rot: -8, sc: 0.84, op: 1, bl: 3, z: 5 },
  center: { tx: 0, tz: 0, ry: 0, rot: 0, sc: 1, op: 1, bl: 0, z: 10 },
  right: { tx: 185, tz: -110, ry: -30, rot: 8, sc: 0.84, op: 1, bl: 3, z: 5 },
  "far-right": {
    tx: 370,
    tz: -220,
    ry: -42,
    rot: 13,
    sc: 0.7,
    op: 0,
    bl: 8,
    z: 1,
  },
};

const STEP = 2.2;

// Circular offset: instead of a raw `index - current` (which breaks once the
// cycle wraps, e.g. jumping from -3 straight into a "far" slot), we normalize
// the difference into the shortest signed distance around the ring. That
// makes the slot assignment identical every single lap, so there's no
// "reset" moment — it just keeps sliding.
function getSlot(index: number, current: number, count: number): SlotName {
  let off = index - current;

  // wrap into [0, count)
  off = ((off % count) + count) % count;
  // shift into (-count/2, count/2] so it reads as a signed distance
  if (off > count / 2) off -= count;

  if (off === -1) return "left";
  if (off === 0) return "center";
  if (off === 1) return "right";
  return off < -1 ? "far-left" : "far-right";
}

// function CardCorner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
//   const positionClasses = {
//     tl: "left-2.5 top-2.5 border-t-2 border-l-2",
//     tr: "right-2.5 top-2.5 border-t-2 border-r-2",
//     bl: "bottom-2.5 left-2.5 border-b-2 border-l-2",
//     br: "bottom-2.5 right-2.5 border-b-2 border-r-2",
//   };

//   return <div className={cn("pointer-events-none absolute z-4 h-4 w-4 border-white/80", positionClasses[position])} />;
// }

interface ApertureCardSliderProps {
  cards?: CardData[];
  words?: string[];
  prefix?: string;
  className?: string;
}

export default function ApertureCardSlider({
  cards = DEFAULT_CARDS,
  words = DEFAULT_WORDS,
  prefix = "We specialize in\u00A0",
  className,
}: ApertureCardSliderProps) {
  const count = cards.length;

  const containerRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const currentRef = useRef(0);
  const pausedRef = useRef(false);
  const masterTlRef = useRef<GSAPTimeline | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startXRef = useRef<number | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const activeWordRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef(0);

  const applySlot = useCallback((card: HTMLDivElement, slotName: SlotName, animate: boolean) => {
    const slot = SLOTS[slotName];
    const baseTransform = `translateX(${slot.tx}px) translateZ(${slot.tz}px) rotateY(${slot.ry}deg) rotate(${slot.rot}deg) scale(${slot.sc})`;

    card.style.cursor = slotName === "left" || slotName === "right" ? "pointer" : "default";

    const props = {
      transform: baseTransform,
      opacity: slot.op,
      filter: `blur(${slot.bl}px)`,
      zIndex: slot.z,
      visibility: slotName === "far-left" || slotName === "far-right" ? "hidden" : "visible",
    };

    if (animate) {
      gsap.killTweensOf(card);

      gsap.to(card, {
        ...props,
        duration: 0.65,
        ease: "back.out",
        overwrite: true,
      });
    } else {
      gsap.set(card, props);
    }
  }, []);

  const renderSlider = useCallback(
    (animate: boolean) => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        applySlot(card, getSlot(i, currentRef.current, count), animate);
      });

      setCurrentIndex(currentRef.current);
    },
    [applySlot, count],
  );

  const buildTimeline = useCallback(() => {
    masterTlRef.current?.kill();

    const tl = gsap.timeline({
      repeat: -1,
      paused: pausedRef.current,
    });

    masterTlRef.current = tl;

    for (let i = 0; i < count; i++) {
      const next = (i + 1) % count;

      tl.call(() => {
        currentRef.current = next;
        renderSlider(true);
      });

      tl.to({}, { duration: STEP });
    }
  }, [count, renderSlider]);

  // idx no longer needs to stay inside [0, count) — any integer (including
  // negative, or ones way past `count`) wraps correctly, so swiping/clicking
  // past either end keeps looping instead of getting blocked.
  const goTo = useCallback(
    (idx: number) => {
      currentRef.current = ((idx % count) + count) % count;

      renderSlider(true);
    },
    [count, renderSlider],
  );

  useGSAP(
    () => {
      if (!activeWordRef.current) return;

      gsap.killTweensOf(activeWordRef.current);

      gsap.fromTo(
        activeWordRef.current,
        {
          y: 40,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
          filter: "blur(0px)",
        },
      );

      prevIndexRef.current = currentIndex;
    },
    { dependencies: [currentIndex] },
  );

  const handleCardClick = useCallback(
    (index: number) => {
      const slot = getSlot(index, currentRef.current, count);
      if (slot === "left" || slot === "right") goTo(index);
    },
    [count, goTo],
  );

  const pauseOnHover = useCallback(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (!pausedRef.current) {
      pausedRef.current = true;
      masterTlRef.current?.pause();
    }
  }, []);

  const resumeOnLeave = useCallback(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      if (pausedRef.current) {
        pausedRef.current = false;
        masterTlRef.current?.resume();
      }
    }, 80);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (startXRef.current === null) return;
      const dx = e.changedTouches[0].clientX - startXRef.current;
      if (Math.abs(dx) > 40) {
        goTo(dx < 0 ? currentRef.current + 1 : currentRef.current - 1);
      }
      startXRef.current = null;
    },
    [goTo],
  );

  useGSAP(
    () => {
      renderSlider(false);
      buildTimeline();

      return () => {
        if (hoverTimerRef.current) {
          clearTimeout(hoverTimerRef.current);
        }

        masterTlRef.current?.kill();
        masterTlRef.current = null;
      };
    },
    {
      scope: containerRef,
      dependencies: [buildTimeline, renderSlider],
    },
  );

  return (
    <section ref={containerRef} className={cn("lg:min-h-[800px] relative overflow-hidden bg-transparent py-8 mt-20", className)}>
      <div className=" flex flex-col items-center gap-10 lg:gap-40">
        <div
          ref={textBlockRef}
          className="flex select-none items-center justify-center whitespace-nowrap text-2xl lg:text-4xl font-medium text-foreground mt-10"
        >
          <h1>{prefix}</h1>
          <div className="relative h-8 w-20 lg:w-40">
            <img src={brush} className="absolute shrink-0 lg:-top-10 -top-2 left-2 -z-10" alt="" />
            <span
              key={currentIndex}
              ref={activeWordRef}
              style={{ fontWeight: 800 }}
              className="absolute inset-0 text-black flex items-center"
            >
              {words[currentIndex]}
            </span>
          </div>
        </div>
        <div ref={stageRef} className="relative flex h-[440px] w-full items-center justify-center perspective-distant lg:scale-150 pointer-events-none">
          <div className="relative h-[390px] w-[220px] transform-3d">
            {cards.map((card, i) => {
              const isLandscape = card.ratio === "16/9";

              return (
                <div
                  key={card.src + i}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleCardClick(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCardClick(i);
                    }
                  }}
                  className={cn(
                    "absolute overflow-hidden rounded-2xl will-change-[transform,filter,opacity] border pointer-events-auto",
                    isLandscape ? "left-1/2 top-1/2 -ml-[170px] -mt-[95.5px] h-[191px] w-[340px] origin-center" : "inset-0 h-full w-full",
                  )}
                  onMouseEnter={pauseOnHover}
                  onMouseLeave={resumeOnLeave}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <video
                    src={card.src}
                    loop
                    muted
                    autoPlay
                    playsInline
                    preload="none"
                    draggable={false}
                    className="pointer-events-none block h-full w-full select-none object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Info button with tooltip — tooltip shows on ⓘ button hover */}
      <div className="absolute bottom-0 right-[20%] z-50 bg-black rounded-full overflow-visible pointer-events-auto cursor-pointer group">
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap rounded-lg bg-black/80 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-sm pointer-events-none opacity-0 translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
          Hovering on cards will pause slider
          <div className="absolute top-full left-1/2 -translate-x-1/2 h-0 w-0 border-x-[5px] border-x-transparent border-t-[5px] border-t-black/80" />
        </div>
        {/* ⓘ button */}
        <span
          aria-label="Card info"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg font-bold text-white backdrop-blur-md transition-colors duration-200"
        >
          i
        </span>
      </div>
    </section>
  );
}
