import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import PhoneVideo from "./new/PhoneVideo";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);

/* ─────────────────────────────────────────
   Page 1 — Section A: Floating Stats
───────────────────────────────────────── */

function PageFloatingStats() {
  const card = "relative overflow-hidden rounded-[28px] border backdrop backdrop";

  return (
    <div className="w-full max-w-2xl">
      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-3">
        {/* =====================================================
            HERO CARD
        ====================================================== */}
        <div className={`${card} col-span-12 min-h-[200px] p-7 md:p-9`}>
          <div className="relative z-10 mt-4 flex justify-between">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">Avg views per short</div>
              <div className="mt-3 items-end gap-3 flex">
                <p className="text-[48px] leading-[0.85] tracking-[-0.06em] text-gray-950 md:text-[64px]">210k</p>
                <p className="mb-1 text-[11px] uppercase tracking-wider text-primary">Views</p>
              </div>
            </div>

            <div className="mt-5 hidden max-w-[280px] text-[12px] leading-relaxed text-gray-500">
              Every short is engineered to capture attention, hold retention, and turn passive scrolling into measurable reach.
            </div>
          </div>

          {/* Bottom metric */}
          <div className="absolute bottom-7 right-7 z-10 text-right">
            <div className="text-[11px] text-primary">+340%</div>
            <div className="mt-1 text-[9px] uppercase tracking-[0.15em] text-gray-400">Since we took over</div>
          </div>
        </div>

        {/* =====================================================
            RETENTION CARD
        ====================================================== */}
        <div className={`${card} col-span-6 h-[200px] p-6 md:p-7`}>
          <div className="relative z-10 flex h-full flex-col justify-between">
            <h3 className="text-[15px] font-semibold tracking-tight text-gray-900">Avg retention</h3>

            <p className="text-[48px] leading-none tracking-[-0.05em] text-gray-950 md:text-[58px]">67%</p>

            <div className="mt-3 flex items-center gap-2">
              <div className="rounded-full bg-background/10 px-2 py-1 text-[9px] uppercase tracking-wider text-primary">+39%</div>
              <div className="text-[10px] text-gray-400">vs 28% avg</div>
            </div>
          </div>
        </div>

        {/* =====================================================
            WATCH TIME CARD
        ====================================================== */}
        <div className={`${card} col-span-6 h-[200px] p-6 md:p-7`}>
          <div className="relative z-10 flex h-full flex-col justify-between">
            <h3 className="text-[15px] font-semibold tracking-tight text-gray-900">Average watch time</h3>

            <div className="flex items-baseline gap-2">
              <p className="text-[52px] leading-none tracking-[-0.05em] text-gray-950 md:text-[62px]">47</p>
              <sup className="text-[13px] font-semibold text-gray-400">sec</sup>
            </div>

            <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">Full views</div>
          </div>
        </div>

        {/* =====================================================
            CATEGORY CARD
        ====================================================== */}
        <div className={`${card} col-span-12 h-[180px] sm:h-[150px] p-7 md:p-8`}>
          <div className="relative z-10 flex h-full flex-col justify-between sm:flex-row md:items-end">
            <div>
              <h3 className="text-3xl tracking-[-0.04em] text-gray-950 md:text-5xl">Health niche</h3>
              <p className="mt-2 max-w-[280px] text-[11px] leading-relaxed text-gray-500">
                Content built around high-intent topics with strong repeat viewing and organic discovery.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 h-8">
              <div className="rounded-full border border-black/10 bg-white/60 px-3 py-2 text-[10px] font-semibold text-gray-700">Keto</div>
              <div className="rounded-full border border-black/10 bg-white/60 px-3 py-2 text-[10px] font-semibold text-gray-700">
                Fasting
              </div>
              <div className="rounded-full border border-black/10 bg-white/60 px-3 py-2 text-[10px] font-semibold text-gray-700">
                Longevity
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            OPTIONAL MINI CARD
        ====================================================== */}
        <div className={`${card} col-span-12 min-h-[120px] p-6`}>
          <div className="flex h-full items-center justify-between">
            <div>
              <h3 className="mt-2 text-3xl md:text-5xl tracking-tight text-gray-950">Consistent growth.</h3>
            </div>

            <div className="text-right">
              <p className="text-[24px] tracking-tight text-primary">4.8×</p>
              <div className="mt-1 text-[9px] uppercase tracking-[0.14em] text-gray-400">Organic reach</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelB() {
  const card = "group relative min-h-[440px] overflow-hidden rounded-[28px] border p-6 md:p-7 flex flex-col backdrop";
  const pill = "rounded-full border border-black/10 bg-white/60 px-3 py-2 text-[10px] font-semibold text-gray-700";

  const steps = [
    { label: "1x long-form podcast (60 min)", accent: true },
    { label: "We identify 6 high-retention moments", accent: false },
    { label: "Cut, caption, reformat for vertical", accent: false },
  ];

  return (
    <div className={cn(card, "backdrop")}>
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full  blur-3xl transition-transform duration-700 group-hover:scale-150" />

      {/* Header */}
      <div className="relative z-10 mb-8 flex items-start justify-between">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">Content Engine</div>
          <h3 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight text-gray-900">One → Many</h3>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-[11px] font-semibold text-gray-400">
          01
        </div>
      </div>

      {/* Process */}
      <div className="relative z-10 flex flex-col gap-2">
        {steps.map((s, i) => (
          <div key={i}>
            <div
              className={`rounded-[14px] border px-4 py-3 text-[11px] font-medium leading-relaxed transition-all duration-300 ${s.accent ? "border-primary/30  text-primary" : "border-black/10 text-gray-700"
                }`}
            >
              {s.label}
            </div>

            {i < steps.length - 1 && (
              <div className="flex h-5 justify-center">
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" className="opacity-20">
                  <path d="M5 0v11M1 7l4 8 4-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Output pushed to bottom */}
      <div className="relative z-10 mt-auto pt-8">
        <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-400">You get</div>

        <div className="flex flex-wrap gap-2">
          {["6 Shorts", "6 Reels", "6 TikToks"].map((p) => (
            <div key={p} className={pill}>
              {p}
            </div>
          ))}
        </div>

        <div className="mt-5 h-px w-full bg-black/[0.06]" />

        <p className="mt-4 text-[11px] leading-relaxed text-gray-500">
          One long-form conversation transformed into a complete short-form content system.
        </p>
      </div>
    </div>
  );
}

function PanelC() {
  const card = "group relative min-h-[440px] overflow-hidden rounded-[28px] border p-6 md:p-7 flex flex-col backdrop";

  const content = [
    { title: "Strong hook (0–3s)", sub: "Pattern interrupt for health audience", active: true },
    { title: "Study citations", sub: "On-screen text with source reference", active: true },
    { title: "Science B-roll", sub: "Anatomy, lab, nutrition visuals", active: true },
    { title: "Auto-captions styled", sub: "Brand font, highlight keywords", active: true },
    { title: "CTA overlay", sub: "Subscribe / link push", active: false },
  ];

  return (
    <div className={card}>
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-primary/[0.05] blur-3xl" />

      {/* Header */}
      <div className="relative z-10 mb-7 flex items-start justify-between">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">Production</div>
          <h3 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight text-gray-900">Built for retention</h3>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-[11px] font-semibold text-gray-400">
          02
        </div>
      </div>

      {/* Features */}
      <div className="relative z-10 flex flex-col gap-[9px]">
        {content.map((c, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`h-[7px] w-[7px] flex-shrink-0 rounded-full ${c.active ? "bg-primary" : "bg-black/15"}`} />
            <div className="h-px w-4 flex-shrink-0 bg-black" />

            <div
              className={`flex-1 rounded-[12px] border px-3 py-2 transition-all duration-300 ${c.active ? "border-black/[0.06] group-hover:bg-primary/[0.03]" : "border-black/[0.04] bg-black/[0.01] opacity-60"
                }`}
            >
              <div className="text-[11px] font-semibold text-gray-800">{c.title}</div>
              <div className="mt-0.5 text-[9px] leading-relaxed text-gray-400">{c.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom statement */}
      <div className="relative z-10 mt-auto pt-7">
        <div className="h-px w-full bg-black/[0.06]" />

        <div className="mt-4 flex items-center justify-between">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-400">Editing system</div>
          <div className="text-[10px] font-semibold text-primary">Optimized</div>
        </div>
      </div>
    </div>
  );
}

function PanelD() {
  const card = "group relative min-h-[440px] overflow-hidden rounded-[28px] border p-6 md:p-7 flex flex-col backdrop";

  const before = [30, 50, 40, 20, 35, 15, 28];
  const after = [90, 95, 88, 85, 80, 82, 78];

  return (
    <div className={card}>
      {/* Header */}
      <div className="relative z-10 mb-8 flex items-start justify-between">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">Performance</div>
          <h3 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight text-gray-900">The transformation</h3>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-[11px] font-semibold text-gray-400">
          03
        </div>
      </div>

      {/* Comparison */}
      <div className="relative z-10 grid grid-cols-2 gap-5">
        {/* Before */}
        <div>
          <div className="mb-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-400">Before</div>

          <div className="flex h-20 items-end gap-[4px]">
            {before.map((h, i) => (
              <div key={i} className="flex-1 rounded-t-[3px] bg-black/[0.10]" style={{ height: `${h}%` }} />
            ))}
          </div>

          <div className="mt-3 text-[11px] text-gray-500">Avg retention: 22%</div>
          <p className="mt-3 text-[11px] leading-relaxed text-gray-500">Raw talking head. No cuts, captions, or B-roll.</p>
        </div>

        {/* After */}
        <div>
          <div className="mb-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-primary">After</div>

          <div className="flex h-20 items-end gap-[4px]">
            {after.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-[3px] bg-primary transition-all duration-500 group-hover:opacity-80"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          <div className="mt-3 text-[11px] font-semibold text-primary">Avg retention: 67%</div>
          <p className="mt-3 text-[11px] leading-relaxed text-gray-500">Tight cuts, captions, health B-roll, strong hook.</p>
        </div>
      </div>

      {/* Bottom result */}
      <div className="relative z-10 mt-auto pt-8">
        <div className="h-px w-full bg-black/[0.06]" />

        <div className="mt-5 flex items-end justify-between">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-400">Retention lift</div>
            <p className="mt-1 text-[28px] font-semibold tracking-[-0.05em] text-gray-950">+45%</p>
          </div>

          <div className="text-right text-[11px] font-semibold text-primary">
            Better content.
            <br />
            Better performance.
          </div>
        </div>
      </div>
    </div>
  );
}
/* ─────────────────────────────────────────
   Page 2 — Tabbed B / C / D
───────────────────────────────────────── */

type Tab = "B" | "C" | "D";

const TABS: { id: Tab; label: string }[] = [
  { id: "B", label: "Repurposing flow" },
  { id: "C", label: "Feature callouts" },
  { id: "D", label: "Before / after" },
];

function PageTabbed() {
  const [active, setActive] = useState<Tab>("B");
  const panelRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: panelRef });

  // Enter animation — runs whenever `active` changes (i.e. after new panel mounts)
  useGSAP(
    () => {
      if (!panelRef.current) return;
      gsap.fromTo(panelRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
    },
    { dependencies: [active], scope: panelRef },
  );

  // Exit animation — plays before the tab actually switches
  const switchTab = contextSafe((next: Tab) => {
    if (next === active || !panelRef.current) return;

    gsap.to(panelRef.current, {
      opacity: 0,
      y: -8,
      duration: 0.15,
      ease: "power1.in",
      onComplete: () => setActive(next),
    });
  });

  return (
    <div className="w-full max-w-2xl mx-auto my-auto lg:mt-auto lg:ml-auto lg:mx-0 lg:w-[672px] mt-10 lg:mt-40 flex flex-col gap-4 pointer-events-auto">
      {/* Tab switcher */}
      <div className="flex justify-center lg:justify-end gap-2 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onPointerEnter={() => switchTab(tab.id)}
            className={`rounded-full px-4 py-[6px] text-[11px] font-medium tracking-wide border transition-all duration-200 cursor-pointer ${active === tab.id
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-transparent text-gray-500 border-black/15 hover:border-gray-400 hover:text-gray-700"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div ref={panelRef} className="w-full">
        {active === "B" && <PanelB />}
        {active === "C" && <PanelC />}
        {active === "D" && <PanelD />}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Root
───────────────────────────────────────── */
const PhoneStats = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ".PhoneStats",
      pin: ".canvas-wrapper",
      start: "top top",
      end: "47% top",
      anticipatePin: 1
    })
  })

  return (
    <section ref={sectionRef} className="PhoneStats relative w-screen h-[180vh] lg:h-[210vh] pointer-events-none">
      <PhoneVideo />
      <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-25 blur-3xl bg-background" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl bg-background" />

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-0 lg:w-[1024px]">
        {/* Page 1 — Section A */}
        <div className="relative h-screen flex items-center justify-center lg:justify-start pt-30">
          <PageFloatingStats />
        </div>

        {/* Page 2 — Sections B / C / D (tabbed) */}
        <div className="relative h-screen flex justify-center lg:justify-start tabbedPage pt-0">
          <PageTabbed />
        </div>
      </div>
    </section>
  );
};

export default PhoneStats;
