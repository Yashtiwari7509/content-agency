import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionHeader from "@/components/SectionHeader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Project {
  index: string;
  category: string;
  title: string;
  year: string;
  image: string;
}

const projects: Project[] = [
  { index: "01", category: "Production — Delivery", title: "2500+ Videos", year: "Counting", image: "https://images.unsplash.com/photo-1574717024453-354056aafa98?q=80&w=1200&auto=format&fit=crop" },
  { index: "02", category: "Relationships — Trust", title: "50+ Satisfied Clients", year: "Clients", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200&auto=format&fit=crop" },
  { index: "03", category: "Team — Specialists", title: "20+ Team Members", year: "People", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop" },
  { index: "04", category: "YouTube — Management", title: "40 Channels Managed", year: "Growth", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop" },
];

export default function WorkCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Query all rows by class — no ref arrays needed.
      const rows = gsap.utils.toArray<HTMLElement>(".gsap-row");

      rows.forEach((row) => {
        const img = row.querySelector<HTMLElement>(".gsap-img");
        const title = row.querySelector<HTMLElement>(".row-title");
        const arrow = row.querySelector<HTMLElement>(".row-arrow");
        const rule = row.querySelector<HTMLElement>(".row-rule");

        // ── 1. Scroll entrance ────────────────────────────────────────────
        gsap.set(row, { opacity: 0, y: 40 });
        gsap.to(row, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        if (rule) {
          gsap.fromTo(
            rule,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              ease: "power2.out",
              transformOrigin: "left center",
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // ── 2. Hover — image + arrow + title nudge ────────────────────────
        // Initial state is set purely via GSAP so there's no CSS ↔ GSAP
        // transform conflict. The arrow's inline `style` on the element has
        // NO transform, so GSAP's matrix is the only thing writing to it.
        if (arrow) gsap.set(arrow, { opacity: 0, x: -8 });
        if (img) gsap.set(img, { opacity: 0, scale: 1.08, y: 0 });

        if (!img) return;

        // quickTo for EVERY hover-animated property — including arrow, title,
        // and row bg. This is the only safe approach for fast mouse movement:
        // calling a quickTo fn always overrides the in-flight target instantly,
        // so no tween ever "wins" late and leaves the arrow half-visible.
        const imgOpacity = gsap.quickTo(img, "opacity", { duration: 0.35, ease: "power2.out" });
        const imgScale = gsap.quickTo(img, "scale", { duration: 0.5, ease: "power3.out" });
        const imgY = gsap.quickTo(img, "y", { duration: 0.5, ease: "power3.out" });
        const arrowOpacity = gsap.quickTo(arrow, "opacity", { duration: 0.25, ease: "power2.out" });
        const arrowX = gsap.quickTo(arrow, "x", { duration: 0.25, ease: "power2.out" });
        const titleX = title ? gsap.quickTo(title, "x", { duration: 0.45, ease: "power2.out" }) : null;
        const rowBg = gsap.quickTo(row, "backgroundColor", { duration: 0.35, ease: "none" });

        const onEnter = () => {
          imgOpacity(1);
          imgScale(1);
          arrowOpacity(1);
          arrowX(0);
          titleX?.(12);
          rowBg("rgba(28,111,214,0.05)" as unknown as number);
        };

        const onLeave = () => {
          imgOpacity(0);
          imgScale(1.08);
          imgY(0);
          arrowOpacity(0);
          arrowX(-8);
          titleX?.(0);
          rowBg("rgba(28,111,214,0)" as unknown as number);
        };

        const onMove = (e: MouseEvent) => {
          const rect = row.getBoundingClientRect();
          imgY((e.clientY - rect.top - rect.height / 2) * 0.15);
        };

        row.addEventListener("mouseenter", onEnter);
        row.addEventListener("mouseleave", onLeave);
        row.addEventListener("mousemove", onMove);
      });
    },
    { scope: containerRef }
  );

  return (
    <div id="acheive" ref={containerRef} className="relative w-full px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">

        <div
          className="mb-10 flex items-end justify-between border-b pb-6"
          style={{ borderColor: "rgba(11,27,43,0.12)" }}
        >
          <SectionHeader
            label="Why choose us"
            title="Everything a health creator"
            gradientWord="needs"
            align="center"
            className="mb-0"
          />
          <span
            className="hidden shrink-0 text-[11px] font-semibold tracking-[0.2em] uppercase md:block"
            style={{ color: "rgba(11,27,43,0.3)", fontFamily: "Poppins, sans-serif" }}
          >
            Our services
          </span>
        </div>

        {/* Rows */}
        <div>
          {projects.map((p) => (
            <div
              key={p.index}
              /* gsap-row ← queried by useGSAP, no ref needed */
              className="gsap-row group relative flex cursor-pointer items-center gap-3 md:gap-6 overflow-hidden rounded-xl px-2 py-6 md:px-4 md:py-8"
            >
              {/* Index — hidden on xs */}
              <span
                className="hidden sm:block w-8 md:w-10 shrink-0 text-xs tabular-nums"
                style={{ color: "rgba(11,27,43,0.25)", fontFamily: "Poppins, sans-serif" }}
              >
                {p.index}
              </span>

              {/* Title + category */}
              <div className="row-title flex flex-1 flex-col gap-0.5 md:gap-1 min-w-0">
                <h3
                  className="text-lg sm:text-2xl md:text-[2rem] font-semibold leading-snug tracking-[-0.025em] truncate"
                  style={{ fontFamily: "Poppins, sans-serif", color: "#0b1b2b" }}
                >
                  {p.title}
                </h3>
                <span
                  className="text-[11px] uppercase tracking-[0.15em]"
                  style={{ color: "#1c6fd6", fontFamily: "Poppins, sans-serif" }}
                >
                  {p.category}
                </span>
              </div>

              {/* Year / tag — hide on mobile */}
              <span
                className="hidden md:block shrink-0 text-xs tracking-[0.12em] uppercase"
                style={{ color: "rgba(11,27,43,0.3)", fontFamily: "Poppins, sans-serif" }}
              >
                {p.year}
              </span>

              {/* Arrow — NO inline transform, GSAP owns it entirely */}
              <span className="row-arrow relative shrink-0">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17L17 7M17 7H9M17 7V15"
                    stroke="#1c6fd6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              {/* Reveal image — gsap-img ← queried by useGSAP, no ref needed */}
              <div
                className="gsap-img pointer-events-none absolute right-16 top-1/2 hidden h-40 w-56 -translate-y-1/2 overflow-hidden rounded-xl md:block"
                style={{ border: "1px solid rgba(28,111,214,0.15)" }}
              >
                <img
                  src={p.image}
                  alt=""
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>

              {/* Bottom rule */}
              <div
                className="row-rule pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left"
                style={{ background: "rgba(11,27,43,0.1)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}