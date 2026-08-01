import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { LaptopMinimalIcon, Smartphone, SwatchBookIcon } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import SectionHeader from "@/components/SectionHeader";

const SEGMENTS = [
  {
    title: "Long-form Editing",
    subtitle: "YouTube, documentaries, podcasts",
    color: "#86EFAC", // Emerald 300
    lightColor: "#DCFCE7", // Emerald 100
    icon: LaptopMinimalIcon,
  },
  {
    title: "Short-form Editing",
    subtitle: "Reels, Shorts, TikToks",
    color: "#67E8F9", // Cyan 300
    lightColor: "#CFFAFE", // Cyan 100
    icon: Smartphone,
  },
  {
    title: "Social Media Management",
    subtitle: "Growth, strategy & distribution",
    color: "#F9A8D4", // Pink 300
    lightColor: "#FCE7F3", // Pink 100
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
        start: "-10px top",
        end: () => `${window.innerHeight * 2.3}px`,
        scrub: 2,
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

  useGSAP(
    () => {
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
      return () => {
        tl.kill();
        title.revert();
        subtitle.revert();
      };
    },
    {
      dependencies: [activeIndex],
      revertOnUpdate: true,
    },
  );

  const activeSegment = SEGMENTS[activeIndex];

  const ActiveIcon = activeSegment.icon;

  const size = 420;
  const cx = 210;
  const cy = 210;
  const outerR = 120;
  const innerR = 70;

  const circumference = 2 * Math.PI * 80;

  return (
    <section ref={sectionRef} className="relative h-[340vh] max-w-5xl mx-auto">
      <div className="pin-donut flex flex-col h-screen items-center justify-center pt-8">
        <div className="w-full px-4 sm:px-6 md:px-10">
          <SectionHeader
            label="Our Services"
            title="What we"
            gradientWord="specialise in"
            description="Three core pillars powering every creator we partner with."
          />
        </div>
        <div className="mx-auto grid w-full max-w-5xl grid-rows-[.6fr,2fr] grid-cols-1 md:grid-cols-2 md:grid-rows-[.2fr,1fr] items-center gap-4 px-4 sm:px-6 md:px-10">
          {/* LEFT */}
          <div className="relative flex justify-center align-bottom w-full">
            <div className="relative w-full  max-w-[320px] sm:max-w-[380px] md:max-w-[420px] mx-auto">
              <svg ref={wheelRef} viewBox={`0 0 ${size} ${size}`} width="100%" height="100%" style={{ display: "block" }}>
                {SEGMENTS.map((_, index) => {
                  const start = index * (SEGMENT_ANGLE + GAP_ANGLE);

                  const end = start + SEGMENT_ANGLE;

                  const fillEnd = start + SEGMENT_ANGLE * fills[index];

                  const bgPath = arcPath(cx, cy, outerR, innerR, start, end);

                  const fillPath = fills[index] > 0 ? arcPath(cx, cy, outerR, innerR, start, Math.max(start + 0.2, fillEnd)) : null;

                  return (
                    <g key={index}>
                      <path d={bgPath} fill={_.lightColor} />

                      {fillPath && <path d={fillPath} fill={_.color} />}
                    </g>
                  );
                })}

                <circle cx={cx} cy={cy} r={80} fill="black" className="hidden" stroke="white" strokeWidth="2" />

                <circle
                  cx={cx}
                  cy={cy}
                  r={80}
                  fill="none"
                  stroke={"skyblue"}
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="hidden md:block"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - circumference * progress}
                  transform={`rotate(-90 ${cx} ${cy})`}
                />
              </svg>

              {/* center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 items-center backdrop justify-center rounded-full transition-all duration-500">
                  <ActiveIcon size={40} className="text-black sm:text-black md:hidden" strokeWidth={2} />
                  <ActiveIcon size={56} className="text-black hidden md:block" strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-full">
            <div ref={cardRef} className="rounded-3xl md:rounded-4xl p-5 sm:p-7 md:px-10">
              <h2
                key={activeIndex}
                ref={titleRef}
                className="mb-4 text-3xl text-center sm:text-4xl md:text-5xl md:text-start font-bold leading-tight md:leading-15 tracking-tight"
              >
                {activeSegment.title}
              </h2>

              <p
                key={`subtitle-${activeIndex}`}
                ref={subtitleRef}
                className="mb-6 text-center md:mb-8 text-base md:text-lg md:text-start text-zinc-600"
              >
                {activeSegment.subtitle}
              </p>
              <div className="flex gap-2 justify-center md:justify-start">
                {SEGMENTS.map((segment, index) => (
                  <div
                    key={segment.title}
                    className={`h-2 rounded-full transition-all border duration-500 ${index === activeIndex ? "w-6" : "w-2"}`}
                    style={{
                      background: index === activeIndex ? "black" : "rgb(0,0,0,.2)",
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
