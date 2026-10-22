import { useRef, useState, useCallback, type ReactNode, type Ref, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Video, Scissors, Film, Palette, CheckCircle2, ChevronRight } from "lucide-react";
import StackedCardSlider from "@/components/StackedCardSlider";
import SectionHeader from "@/components/SectionHeader";
import SectionLabel from "@/components/SectionLabel";

gsap.registerPlugin(ScrollTrigger, SplitText);

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Step {
  id: number;
  label: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  accentColor: string;
  icon: typeof Video;
  headline: string;
  body: string;
  metric: string;
  metricLabel: string;
  visual: React.ReactNode;
}

const STEPS: Step[] = [
  {
    id: 1,
    label: "Raw Footage",
    tag: "01",
    tagColor: "#0F6E56",
    tagBg: "#14E5E230",
    accentColor: "#1D9E75",
    icon: Video,
    headline: "You send. We receive.",
    body: "Client uploads raw footage — long-form podcast, talking head, or screen-record — directly to our secure project drive.",
    metric: "< 1hr",
    metricLabel: "Avg. upload window",
    visual: <UploadVisual accent="#1D9E75" />,
  },
  {
    id: 2,
    label: "Cut & Structure",
    tag: "02",
    tagColor: "#185FA5",
    tagBg: "#E6F1FB",
    accentColor: "#2979FF",
    icon: Scissors,
    headline: "Filler out. Story in.",
    body: "We cut dead air, restructure for retention, and lock the story arc — crafting a tight edit that holds attention to the last second.",
    metric: "3–5×",
    metricLabel: "Avg. watchtime boost",
    visual: <CutVisual accent="#2979FF" />,
  },
  {
    id: 3,
    label: "B-roll & Graphics",
    tag: "03",
    tagColor: "#854F0B",
    tagBg: "#FAEEDA",
    accentColor: "#F59E0B",
    icon: Film,
    headline: "Science. Visuals. Impact.",
    body: "Adding science visuals, study citations, motion graphics and health-topic B-roll that turns dry data into cinematic credibility.",
    metric: "12+",
    metricLabel: "Graphics per video",
    visual: <BrollVisual accent="#F59E0B" />,
  },
  {
    id: 4,
    label: "Color & Audio",
    tag: "04",
    tagColor: "#3C3489",
    tagBg: "#EEEDFE",
    accentColor: "#7C3AE2",
    icon: Palette,
    headline: "Cinematic. Clean. Loud.",
    body: "Color-grade for platform spec, clean the audio, add music bed and layered sound design that feels premium from the first frame.",
    metric: "4K",
    metricLabel: "Delivery standard",
    visual: (
      <div className="wf-visual-color">
        <StackedCardSlider />
      </div>
    ),
  },
  {
    id: 5,
    label: "Delivery",
    tag: "05",
    tagColor: "#993C1D",
    tagBg: "#FAECE7",
    accentColor: "#EF4444",
    icon: CheckCircle2,
    headline: "Ready to upload.",
    body: "Final file delivered to your drive within the agreed SLA. Upload-ready format, caption file, and thumbnail included.",
    metric: "48h",
    metricLabel: "Guaranteed turnaround",
    visual: <DeliveryVisual accent="#EF4444" />,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function WorkflowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const pillsRowRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // contextSafe wraps imperative GSAP calls so they are registered to the
  // component's GSAP context and cleaned up on unmount.
  const { contextSafe } = useGSAP({ scope: sectionRef });

  const [active, setActive] = useState(0);

  const stepsCount = STEPS.length;

  // Animate step content on change — wrapped in contextSafe so all tweens are
  // registered to this component's GSAP context and cleaned up on unmount.
  const activateStep = useCallback(
    contextSafe((index: number) => {
      if (index === active) return;

      // const outDir = index > active ? -24 : 24;

      gsap.to(".wf-step-body", {
        filter: "blur(10px)",
        duration: 0.22,
        ease: "power2.in",
        onComplete: contextSafe(() => {
          setActive(index);
          gsap.fromTo(".wf-step-body", { filter: "blur(10px)" }, { filter: "blur(0px)", duration: 0.38, ease: "power3.out" });
        }),
      });

      // Animate progress bar
      gsap.to(progressBarRef.current, {
        width: `${((index + 1) / stepsCount) * 100}%`,
        duration: 0.5,
        ease: "power2.out",
      });
    }),
    [active, stepsCount, contextSafe],
  );

  // Scroll-triggered entrance
  useGSAP(
    () => {
      // Header reveal
      const headSplit = SplitText.create(".wf-heading", {
        type: "words,lines",
        mask: "lines",
      });

      gsap.from(headSplit.words, {
        yPercent: 110,
        opacity: 0,
        stagger: 0.06,
        duration: 0.9,
        ease: "power4.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".wf-kicker", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Step pills stagger in — use ref trigger, immediateRender:false prevents opacity:0 on mount
      if (pillsRowRef.current) {
        const pills = pillsRowRef.current.querySelectorAll(".wf-pill");
        gsap.from(pills, {
          opacity: 0,
          y: 30,
          stagger: 0.08,
          duration: 0.65,
          ease: "expo.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: pillsRowRef.current,
            start: "top 90%",
            once: true,
          },
        });
      }

      // Content panel — use ref, immediateRender:false
      if (panelRef.current) {
        gsap.from(panelRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "expo.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: panelRef.current,
            start: "top 92%",
            once: true,
          },
        });
      }

      // Progress bar initial
      gsap.set(progressBarRef.current, { width: `${(1 / stepsCount) * 100}%` });
    },
    { scope: sectionRef },
  );

  const step = STEPS[active];

  return (
    <section ref={sectionRef} id="workflow" className="relative w-full py-24 ">
      {/* Subtle ambient blobs */}
      <div className="wf-blob wf-blob-a" aria-hidden="true" />
      <div className="wf-blob wf-blob-b" aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-6">
        {/* ── Header ── */}
        <div ref={headerRef} className="mb-14">
          <SectionHeader
            label="Production Workflow"
            title="From raw to"
            gradientWord="ready-to-upload"
            description="Five clean steps from raw footage to a polished, upload-ready video — every time."
            align="center"
          />
        </div>

        {/* ── Step Pill Nav ── */}
        <div ref={pillsRowRef} className="wf-pills-row flex flex-wrap justify-center gap-2 mb-10">
          {STEPS.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.id}
                className="wf-pill"
                data-active={isActive}
                style={
                  isActive
                    ? {
                        background: s.tagBg,
                        color: s.tagColor,
                        borderColor: s.accentColor + "66",
                      }
                    : {}
                }
                onMouseEnter={() => activateStep(i)}
                aria-label={`Step ${s.id}: ${s.label}`}
              >
                <span className="wf-pill-num" style={isActive ? { color: s.accentColor } : {}}>
                  {s.tag}
                </span>
                {s.label}
                {i <= active && <CheckCircle2 size={13} className="wf-pill-check" style={{ color: s.accentColor }} />}
              </button>
            );
          })}
        </div>

        {/* ── Progress Track ── */}
        <div className="wf-progress-track mb-10">
          <div ref={progressBarRef} className="wf-progress-fill" style={{ background: step.accentColor }} />
        </div>

        {/* ── Main Panel ── */}
        <div ref={panelRef} className="wf-panel">
          <div className="wf-step-body grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left: Content */}
            <div className="wf-panel-left">
              {/* Tag + icon */}
              {/* <div className="wf-panel-badge" style={{ background: step.tagBg }}>
                <StepIcon size={16} style={{ color: step.tagColor }} strokeWidth={2} />
                <span style={{ color: step.tagColor }}>Step {step.tag}</span>
              </div> */}
              <SectionLabel align="left" text={"Step " + step.tag} />

              <h3 className="wf-panel-headline">{step.headline}</h3>
              <p className="wf-panel-body">{step.body}</p>

              {/* Metric */}
              <div className="wf-metric-chip w-fit flex gap-2 justify-center items-center">
                <span className="wf-metric-value">{step.metric}</span>
                <p className={"wf-metric-label p-2 border rounded-full"}>{step.metricLabel}</p>
              </div>

              {/* Navigation arrows */}
              <div className="wf-nav-row">
                <button className="wf-nav-btn" disabled={active === 0} onClick={() => activateStep(active - 1)} aria-label="Previous step">
                  <ChevronRight size={16} className="rotate-180" />
                </button>
                <div className="wf-step-counter">
                  {active + 1} of {stepsCount}
                </div>
                <button
                  className="wf-nav-btn wf-nav-btn--next"
                  disabled={active === stepsCount - 1}
                  onClick={() => activateStep(active + 1)}
                  style={active < stepsCount - 1 ? { background: step.accentColor, borderColor: step.accentColor } : {}}
                  aria-label="Next step"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="wf-panel-right" style={{ background: step.tagBg }}>
              {step.visual}

              {/* Step label watermark */}
              <h2 className="wf-panel-watermark" style={{ color: step.accentColor }}>
                {step.label}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
type VP = { accent: string };

const INK = "#0f1114";
/** accent at p% opacity, works with the --a CSS var */
const tint = (p: number) => `color-mix(in srgb, var(--a) ${p}%, transparent)`;

/* ------------------------------------------------------------------ */
/* Shared                                                              */
/* DOM is authored in its FINAL state, so reduced-motion = static.     */
/* ------------------------------------------------------------------ */
function useLoop(build: (tl: gsap.core.Timeline, q: gsap.utils.SelectorFunc) => void) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.2,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          end: "bottom 5%",
          toggleActions: "play pause resume pause",
        },
      });
      build(tl, gsap.utils.selector(ref));
    },
    { scope: ref },
  );

  return ref;
}

/** Accent-tinted dot-grid canvas the visuals sit on */
function Stage({ accent, r, children }: { accent: string; r: Ref<HTMLDivElement>; children: ReactNode }) {
  return (
    <div
      ref={r}
      aria-hidden
      style={
        {
          "--a": accent,
          color: INK,
          backgroundColor: "color-mix(in srgb, var(--a) 7%, white)",
          backgroundImage: "radial-gradient(color-mix(in srgb, var(--a) 28%, transparent) 1px, transparent 1.2px)",
          backgroundSize: "16px 16px",
        } as CSSProperties
      }
      className="relative flex aspect-[4/3] w-full flex-col gap-3 overflow-hidden rounded-2xl p-4 ring-1 ring-black/[0.06]"
    >
      {children}
    </div>
  );
}

/** White raised surface */
const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div
    className={`rounded-xl bg-white shadow-[0_1px_0_rgba(0,0,0,.04),0_14px_30px_-14px_rgba(15,17,20,.28)] ring-1 ring-black/[0.05] ${className}`}
  >
    {children}
  </div>
);

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.round(s % 60)).padStart(2, "0")}`;

/* ------------------------------------------------------------------ */
/* 01  Raw footage — waveform fills as the file uploads                */
/* ------------------------------------------------------------------ */
const BARS = Array.from({ length: 52 }, (_, i) => 16 + 76 * Math.abs(Math.sin(i * 0.71) * Math.cos(i * 0.23)));

const Bars = ({ fill }: { fill: string }) => (
  <div className="absolute inset-0 flex items-center gap-[3px]">
    {BARS.map((h, i) => (
      <span key={i} data-bar className="flex-1 rounded-full" style={{ height: `${h}%`, background: fill }} />
    ))}
  </div>
);

export function UploadVisual({ accent }: VP) {
  const r = useLoop((tl, q) => {
    const pct = { v: 0 };
    tl.fromTo(q("[data-bar]"), { scaleY: 0 }, { scaleY: 1, duration: 0.7, ease: "power3.out", stagger: 0.008 })
      .fromTo(
        q("[data-fill]"),
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 2.4, ease: "power2.inOut" },
        0.9,
      )
      .fromTo(q("[data-prog]"), { scaleX: 0 }, { scaleX: 1, duration: 2.4, ease: "power2.inOut" }, 0.9)
      .fromTo(
        pct,
        { v: 0 },
        {
          v: 100,
          duration: 2.4,
          ease: "power2.inOut",
          onUpdate: () => {
            const el = q("[data-pct]")[0];
            if (el) el.textContent = `${Math.round(pct.v)}%`;
          },
        },
        0.9,
      )
      .fromTo(q("[data-done]"), { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, 3.3)
      .to({}, { duration: 1 });
  });

  return (
    <Stage accent={accent} r={r}>
      <Card className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: tint(14) }}>
            <svg
              viewBox="0 0 24 24"
              className="h-4.5 w-4.5 h-[18px] w-[18px]"
              fill="none"
              stroke="var(--a)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="6" width="13" height="12" rx="2.5" />
              <path d="m16 10.5 5-3v9l-5-3z" />
            </svg>
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate text-[13px] font-medium">podcast_ep42_RAW.mov</div>
            <div className="text-[11px] text-black/45">2.4 GB · Project drive</div>
          </div>
          <span data-done className="rounded-full px-2.5 py-1 text-[11px] font-medium" style={{ background: tint(14) }}>
            Received
          </span>
        </div>

        <div className="relative my-auto h-24">
          <Bars fill="rgba(15,17,20,.12)" />
          <div data-fill className="absolute inset-0">
            <Bars fill="var(--a)" />
          </div>
        </div>

        <div className="flex items-end justify-between">
          <span data-pct className="text-4xl font-light leading-none tracking-tight tabular-nums">
            100%
          </span>
          <div className="mb-1.5 h-1 w-1/2 overflow-hidden rounded-full bg-black/[0.07]">
            <div data-prog className="h-full origin-left rounded-full bg-[var(--a)]" />
          </div>
        </div>
      </Card>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 02  Cut & structure — playhead scans, dead air collapses            */
/* ------------------------------------------------------------------ */
const SEGS = [
  { n: 14, dead: false },
  { n: 6, dead: true },
  { n: 20, dead: false },
  { n: 9, dead: true },
  { n: 16, dead: false },
  { n: 7, dead: true },
  { n: 22, dead: false },
  { n: 6, dead: true },
];

const HATCH = "repeating-linear-gradient(135deg, rgba(15,17,20,.16) 0 2px, transparent 2px 7px)";

const Track = ({ audio }: { audio?: boolean }) => (
  <div className="flex h-10 w-full overflow-hidden rounded-lg bg-black/[0.04]">
    {SEGS.map((s, i) => (
      <div
        key={i}
        data-seg={s.dead ? "dead" : "live"}
        style={{
          flexGrow: s.n,
          flexBasis: 0,
          ...(s.dead ? { backgroundImage: HATCH } : { background: audio ? tint(38) : "var(--a)" }),
        }}
        className={s.dead ? "" : "shadow-[inset_-2px_0_0_#fff]"}
      />
    ))}
  </div>
);

export function CutVisual({ accent }: VP) {
  const r = useLoop((tl, q) => {
    const t = { v: 3720 };
    tl.fromTo(q("[data-playhead]"), { left: "0%", autoAlpha: 1 }, { left: "100%", duration: 2.4, ease: "none" })
      .to(q("[data-playhead]"), { autoAlpha: 0, duration: 0.2 }, ">")
      .to(q("[data-seg=dead]"), { flexGrow: 0, opacity: 0, duration: 0.6, ease: "power3.inOut", stagger: 0.14 }, ">0.1")
      .fromTo(
        t,
        { v: 3720 },
        {
          v: 3720 * 0.72,
          duration: 1.2,
          ease: "power3.inOut",
          onUpdate: () => {
            const el = q("[data-rt]")[0];
            if (el) el.textContent = fmt(t.v);
          },
        },
        "<",
      )
      .fromTo(q("[data-saved]"), { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, ">-0.1")
      .to({}, { duration: 1 });
  });

  return (
    <Stage accent={accent} r={r}>
      <Card className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between">
          <div className="leading-none">
            <div className="mb-1.5 text-[11px] text-black/45">Runtime</div>
            <div data-rt className="text-4xl font-light tracking-tight tabular-nums">
              44:38
            </div>
          </div>
          <span data-saved className="rounded-full px-2.5 py-1 text-[11px] font-medium" style={{ background: tint(14) }}>
            28% dead air cut
          </span>
        </div>

        <div className="relative my-auto space-y-1.5">
          <Track />
          <Track audio />
          <div
            data-playhead
            className="pointer-events-none absolute -bottom-2 -top-2 w-px"
            style={{ left: "100%", opacity: 0, background: INK }}
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45" style={{ background: INK }} />
          </div>
        </div>

        <div className="flex justify-between text-[11px] text-black/40">
          <span>Video</span>
          <span>Audio</span>
        </div>
      </Card>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 03  B-roll & graphics — overlays wipe onto a frame                  */
/* ------------------------------------------------------------------ */
const CLIPS = [
  { row: 0, left: "6%", w: "26%" },
  { row: 1, left: "30%", w: "34%" },
  { row: 2, left: "58%", w: "30%" },
];

export function BrollVisual({ accent }: VP) {
  const r = useLoop((tl, q) => {
    const wipe = { clipPath: "inset(0 100% 0 0)" };
    const open = { clipPath: "inset(0 0% 0 0)", duration: 0.6, ease: "power3.out" };
    const clips = q("[data-clip]");

    tl.fromTo(q("[data-ov=cite]"), wipe, open, 0.3)
      .fromTo(clips[0], { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power3.out" }, 0.3)
      .fromTo(q("[data-ov=chart]"), wipe, open, 1.1)
      .fromTo(clips[1], { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power3.out" }, 1.1)
      .fromTo(q("[data-line]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, 1.4)
      .fromTo(q("[data-ov=lower]"), wipe, open, 2.2)
      .fromTo(clips[2], { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power3.out" }, 2.2)
      .to([q("[data-ov]"), clips], { autoAlpha: 0, duration: 0.4 }, 4.2)
      .set([q("[data-ov]"), clips], { autoAlpha: 1 }, ">");
  });

  return (
    <Stage accent={accent} r={r}>
      <div
        className="relative aspect-video w-full overflow-hidden rounded-xl shadow-[0_14px_30px_-14px_rgba(15,17,20,.28)] ring-1 ring-black/[0.06]"
        style={{ background: `linear-gradient(160deg, ${tint(26)}, ${tint(8)}), #fff` }}
      >
        <svg viewBox="0 0 100 100" className="absolute bottom-0 left-1/2 h-[92%] -translate-x-1/2" fill="var(--a)" fillOpacity="0.22">
          <circle cx="50" cy="34" r="14" />
          <path d="M18 100c0-22 14-34 32-34s32 12 32 34z" />
        </svg>

        <div
          data-ov="cite"
          className="absolute left-3 top-3 rounded-lg bg-white px-2.5 py-1.5 text-[10px] leading-tight shadow-[0_6px_16px_-8px_rgba(15,17,20,.35)] ring-1 ring-black/[0.05]"
        >
          <div className="font-medium">Cell Metabolism, 2023</div>
          <div className="text-black/45">n = 4,210</div>
        </div>

        <div
          data-ov="chart"
          className="absolute right-3 top-3 w-[40%] rounded-lg bg-white p-2 shadow-[0_6px_16px_-8px_rgba(15,17,20,.35)] ring-1 ring-black/[0.05]"
        >
          <svg viewBox="0 0 100 40" className="w-full">
            <path d="M0 38H100M0 26H100M0 14H100" stroke="rgba(15,17,20,.08)" strokeWidth="0.5" fill="none" />
            <path
              data-line
              d="M2 34C20 32 30 28 45 20S75 8 98 4"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={0}
              stroke="var(--a)"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <div className="mt-1 text-[9px] text-black/50">Autophagy markers</div>
        </div>

        <div
          data-ov="lower"
          className="absolute bottom-3 left-3 flex items-stretch gap-2 rounded-lg bg-white py-1.5 pl-2 pr-3 shadow-[0_6px_16px_-8px_rgba(15,17,20,.35)] ring-1 ring-black/[0.05]"
        >
          <span className="w-0.5 rounded-full bg-[var(--a)]" />
          <div className="text-[11px] leading-tight">
            <div className="font-medium">16:8 fasting</div>
            <div className="text-black/50">What the data shows</div>
          </div>
        </div>
      </div>

      <Card className="mt-auto space-y-1.5 px-3 py-2.5">
        {[0, 1, 2].map((row) => (
          <div key={row} className="relative h-2 rounded-full bg-black/[0.06]">
            {CLIPS.filter((c) => c.row === row).map((c) => (
              <span
                key={c.left}
                data-clip
                className="absolute inset-y-0 origin-left rounded-full bg-[var(--a)]"
                style={{ left: c.left, width: c.w }}
              />
            ))}
          </div>
        ))}
      </Card>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 04  Captions — only if your step 4 is captions/polish; swap freely  */
/* ------------------------------------------------------------------ */
const WORDS = ["Fasting", "changes", "how", "your", "cells", "repair", "themselves."];

export function CaptionsVisual({ accent }: VP) {
  const r = useLoop((tl, q) => {
    const w = q("[data-w]");
    tl.set(w, { color: "rgba(15,17,20,.2)", backgroundColor: "rgba(255,255,255,0)" });
    w.forEach((el, i) => {
      const t = 0.4 + i * 0.42;
      tl.to(el, { color: "#ffffff", backgroundColor: accent, duration: 0.12 }, t).to(
        el,
        { color: INK, backgroundColor: "rgba(255,255,255,0)", duration: 0.25 },
        t + 0.38,
      );
    });
    tl.to({}, { duration: 1 });
  });

  return (
    <Stage accent={accent} r={r}>
      <Card className="flex flex-1 flex-col p-4">
        <div className="text-[11px] tabular-nums text-black/40">00:01:12,400 → 00:01:15,100</div>
        <div className="my-auto flex flex-wrap gap-x-1 gap-y-2 text-[28px] font-medium leading-tight tracking-tight">
          {WORDS.map((word) => (
            <span key={word} data-w className="rounded-md px-1.5" style={{ color: INK }}>
              {word}
            </span>
          ))}
        </div>
      </Card>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 05  Delivery — ring closes, files land                              */
/* ------------------------------------------------------------------ */
const FILES = [
  { ext: "MP4", name: "episode_final", size: "1.2 GB" },
  { ext: "SRT", name: "captions", size: "48 KB" },
  { ext: "PNG", name: "thumbnail", size: "860 KB" },
];

export function DeliveryVisual({ accent }: VP) {
  const r = useLoop((tl, q) => {
    tl.fromTo(q("[data-ring]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" })
      .fromTo(q("[data-tick]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, ">-0.1")
      .fromTo(q("[data-title]"), { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: "power3.out" }, "<")
      .fromTo(q("[data-file]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.14 }, ">-0.1")
      .to({}, { duration: 1.6 });
  });

  return (
    <Stage accent={accent} r={r}>
      <Card className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 80 80" className="h-14 w-14 shrink-0">
            <circle cx="40" cy="40" r="34" fill="var(--a)" fillOpacity="0.12" />
            <circle
              data-ring
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke="var(--a)"
              strokeWidth="3"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={0}
              transform="rotate(-90 40 40)"
            />
            <path
              data-tick
              d="M27 41l9 9 17-19"
              fill="none"
              stroke="var(--a)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={0}
            />
          </svg>
          <div data-title className="leading-tight">
            <div className="text-xl font-medium tracking-tight">Delivered</div>
            <div className="text-xs text-black/45">Within the 48h window</div>
          </div>
        </div>

        <ul className="mt-auto space-y-1.5">
          {FILES.map((f) => (
            <li
              key={f.ext}
              data-file
              className="flex items-center justify-between rounded-lg bg-black/[0.03] px-3 py-2 text-[13px] ring-1 ring-black/[0.04]"
            >
              <div className="flex items-center gap-3">
                <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold" style={{ background: tint(18) }}>
                  {f.ext}
                </span>
                <span>{f.name}</span>
              </div>
              <span className="text-xs text-black/40">{f.size}</span>
            </li>
          ))}
        </ul>
      </Card>
    </Stage>
  );
}
