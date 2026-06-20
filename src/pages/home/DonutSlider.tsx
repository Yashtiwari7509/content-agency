import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { LaptopMinimalIcon, Smartphone, SwatchBookIcon } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

const SEGMENTS = [
  {
    title: "Long-form Editing",
    subtitle: "YouTube, documentaries, podcasts",
    color: "#7C3AE2", // Purple
    icon: LaptopMinimalIcon,
  },
  {
    title: "Short-form Editing",
    subtitle: "Reels, Shorts, TikToks",
    color: "#14E5E2", // Cyan
    icon: Smartphone,
  },
  {
    title: "Social Media Management",
    subtitle: "Growth, strategy & distribution",
    color: "#F977b2", // Soft Pink
    icon: SwatchBookIcon,
  },
];

const NUM_SEGMENTS = SEGMENTS.length;
const GAP_ANGLE = 4;
const SEGMENT_ANGLE = (360 - GAP_ANGLE * NUM_SEGMENTS) / NUM_SEGMENTS;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;

  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function arcPath(cx: number, cy: number, outerR: number, innerR: number, startAngle: number, endAngle: number) {
  const o1 = polarToCartesian(cx, cy, outerR, startAngle);

  const o2 = polarToCartesian(cx, cy, outerR, endAngle);

  const i1 = polarToCartesian(cx, cy, innerR, endAngle);

  const i2 = polarToCartesian(cx, cy, innerR, startAngle);

  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return `
    M ${o1.x} ${o1.y}
    A ${outerR} ${outerR} 0 ${largeArc} 1 ${o2.x} ${o2.y}
    L ${i1.x} ${i1.y}
    A ${innerR} ${innerR} 0 ${largeArc} 0 ${i2.x} ${i2.y}
    Z
  `;
}

export default function DonutSlider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<SVGSVGElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const [progress, setProgress] = useState(0);

  const fills = useMemo(() => {
    const segmentSize = 1 / NUM_SEGMENTS;

    return SEGMENTS.map((_, i) => {
      const start = i * segmentSize;
      const end = (i + 1) * segmentSize;

      if (progress <= start) return 0;
      if (progress >= end) return 1;

      return (progress - start) / segmentSize;
    });
  }, [progress]);

  const activeIndex = useMemo(() => {
    return fills.reduce((acc, fill, index) => (fill > 0 ? index : acc), 0);
  }, [fills]);

  useGSAP(() => {
    const state = { progress: 0 };

    const tween = gsap.to(state, {
      progress: 1,
      ease: "none",

      scrollTrigger: {
        trigger: sectionRef.current,
        pin: ".pin-donut",
        start: "top top",
        end: "+=2000",
        scrub: 1,
        anticipatePin: 1,
      },

      onUpdate() {
        setProgress(state.progress);

        gsap.set(wheelRef.current, {
          rotate: state.progress * 540,
          transformOrigin: "50% 50%",
        });
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);
  useGSAP(() => {
    if (!cardRef.current) return;
    const title = SplitText.create(titleRef.current, {
      type: "words,lines",
      mask: "lines",
    });
    const subtitle = SplitText.create(subtitleRef.current, {
      type: "words,lines",
      mask: "lines",
    });

    const tl = gsap.timeline({
      defaults: {
        ease: "power4.out",
      },
    });

    tl.fromTo(
      badgeRef.current,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
      },
    )
      .fromTo(
        title.lines,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
        },
        "-=0.15",
      )
      .fromTo(
        subtitle.lines,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
        },
        "-=0.25",
      );
  }, [activeIndex]);

  const activeSegment = SEGMENTS[activeIndex];

  const ActiveIcon = activeSegment.icon;

  const size = 420;
  const cx = 210;
  const cy = 210;
  const outerR = 100;
  const innerR = 70;

  const circumference = 2 * Math.PI * 80;

  return (
    <section ref={sectionRef} className="relative h-[340vh] max-w-5xl mx-auto">
      <div className="pin-donut flex h-screen items-center">
        <div className="radial-blur-v size-50 absolute bottom-60 left-20 z-0 blur-xl "></div>
        <div className="mx-auto grid w-full  max-w-5xl grid-cols-1 md:grid-cols-2 items-center gap-20 px-10">
          {/* LEFT */}
          <div className="relative flex justify-center">
            <svg ref={wheelRef} viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
              {SEGMENTS.map((_, index) => {
                const start = index * (SEGMENT_ANGLE + GAP_ANGLE);

                const end = start + SEGMENT_ANGLE;

                const fillEnd = start + SEGMENT_ANGLE * fills[index];

                const bgPath = arcPath(cx, cy, outerR, innerR, start, end);

                const fillPath = fills[index] > 0 ? arcPath(cx, cy, outerR, innerR, start, Math.max(start + 0.2, fillEnd)) : null;

                return (
                  <g key={index}>
                    <path d={bgPath} fill="transparent" />

                    {fillPath && <path d={fillPath} fill="none" />}
                  </g>
                );
              })}

              <circle cx={cx} cy={cy} r={80} fill="none" stroke="white" strokeWidth="2" />

              <circle
                cx={cx}
                cy={cy}
                r={80}
                fill="none"
                stroke={"skyblue"}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - circumference * progress}
                transform={`rotate(-90 ${cx} ${cy})`}
              />
            </svg>

            {/* center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-40 w-40 items-center backdrop-blur-xs justify-center rounded-full transition-all duration-500">
                <ActiveIcon size={56} className="text-white" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="max-w-xl">
            <div ref={cardRef} className="rounded-[32px] border border-white/40 p-10 backdrop-blur-xl">
              {/* <div className="radial-blur-v size-50 absolute bottom-0  right-20 z-0 blur-xl "></div> */}
              <div className="radial-blur-b size-80 absolute top-0  left-0 -z-1 blur-2xl "></div>
              <div ref={badgeRef} className="mb-8 flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{
                    background: activeSegment.color,
                  }}
                >
                  <ActiveIcon size={24} className="text-white" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-400">Active Segment</p>

                  <h3 className="font-semibold">{activeSegment.title}</h3>
                </div>
              </div>

              <h2 ref={titleRef} className="mb-4 text-5xl font-bold leading-15 tracking-tight">
                {activeSegment.title}
              </h2>

              <p ref={subtitleRef} className="mb-8 text-lg text-zinc-600">
                {activeSegment.subtitle}
              </p>

              <div className="flex gap-3">
                {SEGMENTS.map((segment, index) => (
                  <div
                    key={segment.title}
                    className={`h-2 rounded-full transition-all duration-500 ${index === activeIndex ? "w-16" : "w-6"}`}
                    style={{
                      background: index === activeIndex ? segment.color : "white",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
