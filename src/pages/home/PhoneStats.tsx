import SectionLabel from "@/components/SectionLabel";
import { useRef } from "react";

const STATS = [
  {
    label: "Views Delivered",
    value: "12M",
    suffix: "+",
    description: "Organic reach across YouTube, Shorts & Reels for our creator partners.",
    accent: "cyan" as const,
    align: "left" as const,
  },
  {
    label: "Creators Scaled",
    value: "150",
    suffix: "+",
    description: "Channels grown with strategy, editing, and consistent publishing.",
    accent: "pink" as const,
    align: "right" as const,
  },
];

const accentStyles = {
  cyan: {
    glow: "rgba(20, 229, 226, 0.35)",
    line: "from-[#14E5E2] to-transparent",
    badge: "bg-[#14E5E2]/15 text-[#0d9e9c]",
    number: "from-white via-[#14E5E2] to-[#7af8f6]",
  },
  pink: {
    glow: "rgba(249, 119, 178, 0.35)",
    line: "from-transparent to-[#F977b2]",
    badge: "bg-[#F977b2]/15 text-[#c93d82]",
    number: "from-[#F977b2] via-[#ffb8dc] to-white",
  },
};

function StatPanel({ stat, panelRef }: { stat: (typeof STATS)[number]; panelRef: React.RefObject<HTMLDivElement | null> }) {
  const theme = accentStyles[stat.accent];
  const isLeft = stat.align === "left";

  return (
    <div
      ref={panelRef}
      className={`relative border-white/40 border backdrop p-10 rounded-2xl flex h-full w-full max-w-xl flex-col justify-center gap-5 px-6 md:px-10 ${
        isLeft ? "items-start text-left" : "ml-auto items-end text-right"
      }`}
    >
      <div
        className={`pointer-events-none absolute ${isLeft ? "-left-24 top-1/2" : "-right-24 top-1/2"} size-64 -translate-y-1/2 rounded-full blur-3xl`}
        style={{ background: `radial-gradient(circle, ${theme.glow}, transparent 70%)` }}
      />
      <div className="relative z-10 space-y-2">
        <SectionLabel text={stat.label} align={isLeft ? "left" : "right"} />
        <div
          className={`text-7xl font-black leading-none tracking-tight md:text-8xl lg:text-9xl bg-linear-to-br ${theme.number} bg-clip-text text-transparent`}
          style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.85)" }}
        >
          <h1 className="stat-value inline-block">{stat.value}</h1>
          <h2 className="text-5xl md:text-6xl lg:text-7xl inline">{stat.suffix}</h2>
        </div>
      </div>

      <div className={`relative z-10 h-px w-24 bg-linear-to-r ${theme.line}`} />

      <p className="relative z-10 max-w-sm text-sm leading-relaxed text-gray-700 md:text-base">{stat.description}</p>
    </div>
  );
}

const PhoneStats = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="PhoneStats relative w-screen h-[300vh] pointer-events-none">
      {/* First stat — left, cyan */}
      <div className="relative h-[150vh]">
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-2 md:px-8">
            <StatPanel stat={STATS[0]} panelRef={panel1Ref} />
            <div className="hidden md:block" aria-hidden />
          </div>
        </div>
      </div>

      {/* Second stat — right, pink */}
      <div className="relative h-[150vh]">
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-2 md:px-8">
            <div className="hidden md:block" aria-hidden />
            <StatPanel stat={STATS[1]} panelRef={panel2Ref} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhoneStats;
