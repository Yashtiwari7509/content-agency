"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Video, Scissors, Film, Palette, CheckCircle2, ChevronRight } from "lucide-react";
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
    visual: (
      <div className="wf-visual-upload">
        <div className="wf-drive-box">
          <div className="wf-drive-icon">
            <Video size={28} strokeWidth={1.5} />
          </div>
          <div className="wf-drive-lines">
            <span />
            <span />
            <span />
          </div>
          <div className="wf-drive-badge">RAW</div>
        </div>
      </div>
    ),
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
    visual: (
      <div className="wf-visual-cut">
        <div className="wf-timeline-track">
          {[60, 40, 75, 30, 55, 80, 45, 65].map((h, i) => (
            <div key={i} className="wf-track-clip" style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }} />
          ))}
        </div>
        <div className="wf-playhead" />
      </div>
    ),
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
    visual: (
      <div className="wf-visual-broll">
        <div className="wf-layer wf-layer-1" />
        <div className="wf-layer wf-layer-2" />
        <div className="wf-layer wf-layer-3">
          <span>B•ROLL</span>
        </div>
      </div>
    ),
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
        <div className="wf-color-wheel">
          {["#7C3AE2", "#14E5E2", "#F977B2", "#F59E0B"].map((c, i) => (
            <div
              key={i}
              className="wf-color-seg"
              style={{
                background: c,
                transform: `rotate(${i * 90}deg) skewX(30deg)`,
              }}
            />
          ))}
        </div>
        <div className="wf-waveform">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="wf-wave-bar"
              style={{
                height: `${20 + Math.abs(Math.sin(i * 0.8)) * 55}%`,
                animationDelay: `${i * 0.06}s`,
              }}
            />
          ))}
        </div>
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
    visual: (
      <div className="wf-visual-delivery">
        <div className="wf-check-ring">
          <CheckCircle2 size={40} strokeWidth={1.5} />
        </div>
        <div className="wf-delivery-pills">
          <span>MP4</span>
          <span>SRT</span>
          <span>PNG</span>
        </div>
      </div>
    ),
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function WorkflowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const pillsRowRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);

  const stepsCount = STEPS.length;

  // Animate step content on change
  const activateStep = useCallback(
    (index: number) => {
      if (index === active) return;

      const outDir = index > active ? -24 : 24;

      gsap.to(".wf-step-body", {
        opacity: 0,
        y: outDir,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => {
          setActive(index);
          gsap.fromTo(".wf-step-body", { opacity: 0, y: -outDir }, { opacity: 1, y: 0, duration: 0.38, ease: "power3.out" });
        },
      });

      // Animate progress bar
      gsap.to(progressBarRef.current, {
        width: `${((index + 1) / stepsCount) * 100}%`,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    [active, stepsCount],
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
            align="left"
          />
        </div>

        {/* ── Step Pill Nav ── */}
        <div ref={pillsRowRef} className="wf-pills-row flex flex-wrap gap-2 mb-10">
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
              <div className="wf-metric-chip border-white!">
                <span className="wf-metric-value">{step.metric}</span>
                <span className="wf-metric-label">{step.metricLabel}</span>
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
