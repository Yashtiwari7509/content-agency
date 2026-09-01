import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionHeader from "@/components/SectionHeader";
import { projects } from "@/constant/client_reviews";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function WorkCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Query all rows by class — no ref arrays needed.
      const rows = gsap.utils.toArray<HTMLElement>(".gsap-row");

      rows.forEach((row) => {
        const img = row.querySelector<HTMLElement>(".gsap-img");
        const title = row.querySelector<HTMLElement>(".row-title");
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
            },
          );
        }

        // ── 2. Hover — image + arrow + title nudge ────────────────────────
        // Initial state is set purely via GSAP so there's no CSS ↔ GSAP
        // transform conflict. The arrow's inline `style` on the element has
        // NO transform, so GSAP's matrix is the only thing writing to it.
        if (img) gsap.set(img, { opacity: 0, scale: 1.08, y: 0 });

        if (!img) return;

        // quickTo for EVERY hover-animated property — including arrow, title,
        // and row bg. This is the only safe approach for fast mouse movement:
        // calling a quickTo fn always overrides the in-flight target instantly,
        // so no tween ever "wins" late and leaves the arrow half-visible.
        const imgOpacity = gsap.quickTo(img, "opacity", { duration: 0.35, ease: "power2.out" });
        const imgScale = gsap.quickTo(img, "scale", { duration: 0.5, ease: "power3.out" });
        const imgY = gsap.quickTo(img, "y", { duration: 0.5, ease: "power3.out" });
        const titleX = title ? gsap.quickTo(title, "x", { duration: 0.45, ease: "power2.out" }) : null;
        const rowBg = gsap.quickTo(row, "backgroundColor", { duration: 0.35, ease: "none" });

        const onEnter = () => {
          imgOpacity(1);
          imgScale(1);
          titleX?.(12);
          rowBg("rgba(28,111,214,0.05)" as unknown as number);
        };

        const onLeave = () => {
          imgOpacity(0);
          imgScale(1.08);
          imgY(0);
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
    { scope: containerRef },
  );

  return (
    <div id="acheive" ref={containerRef} className="relative w-full px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-end justify-between pb-6" style={{ borderColor: "rgba(11,27,43,0.12)" }}>
          <SectionHeader label="Why choose us" title="Everything a health creator" gradientWord="needs" align="center" className="mb-0" />
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
              <p className="hidden sm:block w-8 md:w-10 shrink-0 text-xs tabular-nums">{p.index}</p>

              {/* Title + category */}
              <div className="row-title flex flex-1 flex-col gap-0.5 md:gap-1 min-w-0">
                <h3 className="text-lg sm:text-2xl md:text-[2rem] font-semibold leading-snug tracking-[-0.025em] truncate">{p.title}</h3>
                <p className="text-[11px] uppercase tracking-[0.15em]">{p.category}</p>
              </div>

              {/* Year / tag — hide on mobile */}
              <p className="shrink-0 text-xs tracking-[0.12em] capitalize">{p.year}</p>

              {/* Reveal image — gsap-img ← queried by useGSAP, no ref needed */}
              <div className="gsap-img pointer-events-none absolute right-0 top-1/2 h-40 w-56 -translate-y-1/2 overflow-hidden rounded-xl md:block">
                <img src={p.image} alt="" className="h-full w-full object-cover" draggable={false} />
              </div>

              {/* Bottom rule */}
              <div
                className="row-rule pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left"
                style={{ background: "rgba(11,2,43,0.05)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
