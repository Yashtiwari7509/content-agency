import { Thomas1 } from "@/assets/ClientImage";
import { insta, short, youtube } from "@/assets/Image";
import { useRef, useState } from "react";

/* ─────────────────────────────────────────
   Page 1 — Section A: Floating Stats
───────────────────────────────────────── */

function PageFloatingStats() {
  const card = "relative overflow-hidden rounded-[28px] border";

  return (
    <div className="w-full max-w-2xl">
      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-3">
        {/* =====================================================
            HERO CARD
        ====================================================== */}
        <div className={`${card} col-span-12 min-h-[300px] p-7 md:p-9`}>
          {/* Decorative PNG */}
          <img
            src={short}
            alt=""
            className="
              pointer-events-none
              absolute
              right-10
              w-[48%]
              max-w-[200px]
              rotate-[-5deg]
            "
          />

          {/* Main content */}
          <div className="relative z-10 mt-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">Avg views per short</div>

            <div className="mt-3 flex items-end gap-3">
              <h2
                className="
                  text-[64px]
                  font-black
                  leading-[0.85]
                  tracking-[-0.06em]
                  text-gray-950
                  md:text-[88px]
                "
              >
                210k
              </h2>

              <span className="mb-1 text-[11px] font-bold uppercase tracking-wider text-primary">Views</span>
            </div>

            <div className="mt-5 max-w-[280px] text-[12px] leading-relaxed text-gray-500">
              Every short is engineered to capture attention, hold retention, and turn passive scrolling into measurable reach.
            </div>
          </div>

          {/* Bottom metric */}
          <div className="absolute bottom-7 right-7 z-10 text-right">
            <div className="text-[11px] font-bold text-primary">+340%</div>

            <div className="mt-1 text-[9px] uppercase tracking-[0.15em] text-gray-400">Since we took over</div>
          </div>
        </div>

        {/* =====================================================
            RETENTION CARD
        ====================================================== */}
        <div className={`${card} col-span-6 min-h-[250px] p-6 md:p-7`}>
          <img
            src={insta}
            alt=""
            className="
              pointer-events-none
              absolute
              -right-6
              -bottom-6
              w-[55%]
              opacity-70
              mix-blend-multiply
              rotate-6
            "
          />

          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-gray-900">Avg retention</h3>
            </div>

            <div>
              <div className="text-[48px] font-black leading-none tracking-[-0.05em] text-gray-950 md:text-[58px]">67%</div>

              <div className="mt-3 flex items-center gap-2">
                <h5 className="rounded-full bg-primary/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-primary">
                  +39%
                </h5>

                <h5 className="text-[10px] text-gray-400">vs 28% avg</h5>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            WATCH TIME CARD
        ====================================================== */}
        <div className={`${card} col-span-6 min-h-[250px] p-6 md:p-7`}>
          <img
            src={youtube}
            alt=""
            className="
              pointer-events-none
              absolute
              -right-10
              -bottom-10
              w-[60%]
              rotate-[-8deg]
            "
          />

          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-gray-900">Average watch time</h3>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-[52px] font-black leading-none tracking-[-0.05em] text-gray-950 md:text-[62px]">47</span>

                <span className="text-[13px] font-semibold text-gray-400">sec</span>
              </div>

              <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">Full views</div>
            </div>
          </div>
        </div>

        {/* =====================================================
            CATEGORY CARD
        ====================================================== */}
        <div className={`${card} col-span-12 min-h-[190px] p-7 md:p-8`}>
          <img
            src={Thomas1}
            alt=""
            className="
              pointer-events-none
              absolute
              right-[-2%]
              top-[-5%]
              w-[38%]
              max-w-[240px]
            "
          />

          <div className="relative z-10 flex h-full flex-col justify-between md:flex-row md:items-end">
            <div>
              <h3 className="text-[32px] font-black tracking-[-0.04em] text-gray-950 md:text-[42px]">Health niche</h3>

              <p className="mt-2 max-w-[280px] text-[11px] leading-relaxed text-gray-500">
                Content built around high-intent topics with strong repeat viewing and organic discovery.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 md:mt-0">
              <span className="rounded-full border border-black/10 bg-white/60 px-3 py-2 text-[10px] font-semibold text-gray-700">
                Keto
              </span>

              <span className="rounded-full border border-black/10 bg-white/60 px-3 py-2 text-[10px] font-semibold text-gray-700">
                Fasting
              </span>

              <span className="rounded-full border border-black/10 bg-white/60 px-3 py-2 text-[10px] font-semibold text-gray-700">
                Longevity
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================
            OPTIONAL MINI CARD
        ====================================================== */}
        <div className={`${card} col-span-12 min-h-[120px] p-6`}>
          <div className="flex h-full items-center justify-between">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400">Content velocity</div>

              <div className="mt-2 text-[22px] font-black tracking-tight text-gray-950">Consistent growth.</div>
            </div>

            <div className="text-right">
              <div className="text-[24px] font-black tracking-tight text-primary">4.8×</div>

              <div className="mt-1 text-[9px] uppercase tracking-[0.14em] text-gray-400">Organic reach</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Panel B — Repurposing Flow
───────────────────────────────────────── */
function PanelB() {
  const card = "backdrop rounded-2xl border";
  return (
    <div className={`${card} px-5 py-5 flex flex-col gap-[10px] w-full`}>
      {[
        { label: "1× long-form podcast (60 min)", accent: true },
        { label: "We identify 6 high-retention moments", accent: false },
        { label: "Cut, caption, reformat for vertical", accent: false },
      ].map((s, i) => (
        <div key={i} className="flex flex-col gap-[6px]">
          <div
            className={`rounded-xl px-4 py-[10px] text-[12px] font-medium border ${
              s.accent ? "border-primary/40 text-primary bg-primary/[0.06]" : "border-black/[0.07] text-gray-700 bg-black/[0.02]"
            }`}
          >
            {s.label}
          </div>
          {i < 2 && (
            <div className="flex justify-center opacity-20">
              <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                <path d="M5 0v10M1 6l4 8 4-8" stroke="black" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      ))}
      <div className="mt-1">
        <div className="text-[10px] text-gray-400 mb-[6px] uppercase tracking-widest">You get</div>
        <div className="flex flex-wrap gap-[6px]">
          {["6 Shorts", "6 Reels", "6 TikToks"].map((p) => (
            <span
              key={p}
              className="rounded-full border border-primary/30 px-3 py-[3px] text-[11px] text-primary font-medium bg-primary/[0.05]"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Panel C — Feature Callouts
───────────────────────────────────────── */
function PanelC() {
  const card = "backdrop rounded-2xl border";
  return (
    <div className={`${card} px-5 py-4 flex flex-col gap-[9px] w-full`}>
      {[
        { title: "Strong hook (0–3s)", sub: "Pattern interrupt for health audience", active: true },
        { title: "Study citations", sub: "On-screen text with source reference", active: true },
        { title: "Science B-roll", sub: "Anatomy, lab, nutrition visuals", active: true },
        { title: "Auto-captions styled", sub: "Brand font, highlight keywords", active: true },
        { title: "CTA overlay", sub: "Subscribe / link push", active: false },
      ].map((c, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="h-[7px] w-[7px] flex-shrink-0 rounded-full" style={{ background: c.active ? "#1d9e75" : "rgba(0,0,0,0.18)" }} />
          <div className="w-5 flex-shrink-0 h-px bg-black/10" />
          <div className="flex-1 rounded-xl border border-black/[0.06] px-3 py-[6px] bg-black/[0.02]">
            <div className="text-[11px] font-semibold text-gray-800">{c.title}</div>
            <div className="text-[10px] text-gray-400 mt-[1px]">{c.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Panel D — Before / After
───────────────────────────────────────── */
function PanelD() {
  const card = "backdrop rounded-2xl border";
  return (
    <div className={`${card} px-5 py-4 w-full`}>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-3">Before</div>
          <div className="flex items-end gap-[4px] h-16">
            {[30, 50, 40, 20, 35, 15, 28].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-[3px]" style={{ height: `${h}%`, background: "rgba(0,0,0,0.12)" }} />
            ))}
          </div>
          <div className="mt-2 text-[10px] text-gray-400">Avg retention: 22%</div>
          <p className="mt-2 text-[11px] text-gray-400 leading-snug">Raw talking head. No cuts, captions, or B-roll.</p>
        </div>
        <div>
          <div className="text-[10px] text-primary uppercase tracking-wider mb-3">After</div>
          <div className="flex items-end gap-[4px] h-16">
            {[90, 95, 88, 85, 80, 82, 78].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-[3px]" style={{ height: `${h}%`, background: "#1d9e75" }} />
            ))}
          </div>
          <div className="mt-2 text-[10px] text-primary font-semibold">Avg retention: 67%</div>
          <p className="mt-2 text-[11px] text-gray-500 leading-snug">Tight cuts, captions, health B-roll, strong hook.</p>
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
  { id: "B", label: "B — Repurposing flow" },
  { id: "C", label: "C — Feature callouts" },
  { id: "D", label: "D — Before / after" },
];

function PageTabbed() {
  const [active, setActive] = useState<Tab>("B");

  return (
    <div className="w-full  w-3xl! flex flex-col gap-4 pointer-events-auto">
      {/* Tab switcher */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`rounded-full px-4 py-[6px] text-[11px] font-medium tracking-wide border transition-all duration-200 cursor-pointer ${
              active === tab.id
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-transparent text-gray-500 border-black/15 hover:border-gray-400 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="w-full">
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

  return (
    <section ref={sectionRef} className="PhoneStats relative w-screen h-[200vh]" style={{ pointerEvents: "none" }}>
      <div className="w-5xl mx-auto ">
        {/* Page 1 — Section A */}
        <div className="relative h-screen flex items-center">
          <PageFloatingStats />
        </div>

        {/* Page 2 — Sections B / C / D (tabbed) */}
        <div className="relative h-screen flex items-center">
          <PageTabbed />
        </div>
      </div>
    </section>
  );
};

export default PhoneStats;
