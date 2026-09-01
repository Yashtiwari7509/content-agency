import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";
import { members } from "@/constant/workflowSection";

gsap.registerPlugin(ScrollTrigger);


export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tooltipRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isVisibleRef = useRef<Record<string, boolean>>({});

  const { contextSafe } = useGSAP(() => {
    // Initialize all tooltips as hidden
    Object.values(tooltipRefs.current).forEach((el) => {
      if (el) {
        gsap.set(el, {
          autoAlpha: 0,
          scale: 0.75,
          y: 16,
          x: 0,
          rotation: 0,
          transformOrigin: "center bottom",
        });
      }
    });
  }, []);

  const handleMouseMove = contextSafe((event: React.MouseEvent<HTMLDivElement>, alt: string) => {
    const tooltip = tooltipRefs.current[alt];
    if (!tooltip || !isVisibleRef.current[alt]) return;
    const halfWidth = event.currentTarget.offsetWidth / 2;
    const offsetX = event.nativeEvent.offsetX - halfWidth;
    const rotate = gsap.utils.mapRange(-halfWidth, halfWidth, -18, 18, offsetX);
    const translateX = gsap.utils.mapRange(-halfWidth, halfWidth, -50, 50, offsetX);
    gsap.to(tooltip, {
      x: translateX,
      rotation: rotate,
      ease: "power2.out",
      duration: 0.15,
      overwrite: "auto",
    });
  });

  const handleMouseEnter = contextSafe((alt: string) => {
    if (isVisibleRef.current[alt]) return;
    isVisibleRef.current[alt] = true;
    const tooltip = tooltipRefs.current[alt];
    if (!tooltip) return;
    gsap.killTweensOf(tooltip);
    gsap.to(tooltip, {
      autoAlpha: 1,
      y: -20,
      x : 10,
      scale: 1,
      duration: 0.4,
      ease: "back.out(1.7)",
      overwrite: "auto",
    });
  });

  const handleMouseLeave = contextSafe((alt: string) => {
    if (!isVisibleRef.current[alt]) return;
    isVisibleRef.current[alt] = false;
    const tooltip = tooltipRefs.current[alt];
    if (!tooltip) return;
    gsap.killTweensOf(tooltip);
    gsap.to(tooltip, {
      autoAlpha: 0,
      y: 16,
      scale: 0.75,
      x: 0,
      rotation: 0,
      duration: 0.28,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  });

  return (
    <section ref={sectionRef} className="relative w-full bg-transparent h-[550px] lg:h-[700px]">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 110%, oklch(85.273% 0.13885 208.93 / 0.35) 0%, transparent 70%)",
        }}
      />

      <SectionHeader
        label="Clients"
        title="We've Worked With"
        align="center"
        description="We've had the privilege of working with some incredible creators, helping them enhance their content and reach a wider audience."
        gradientWord="the Best"
      />

      <div className="relative lg:max-w-360 max-w-100 mx-auto  -translate-y-60 lg:-translate-y-10 h-[600px]">
        {members.map((member, index) => (
          <div
            key={index}
            className={cn("team-section-img absolute object-contain object-center w-auto", member.className)}
            style={{ cursor: "none" }}
            onMouseEnter={() => handleMouseEnter(member.alt)}
            onMouseLeave={() => handleMouseLeave(member.alt)}
            onMouseMove={(e) => handleMouseMove(e, member.alt)}
          >
            {/* Tooltip — wrapper has no flip so tooltip is always in normal coordinate space */}
            <div
              ref={(el) => {
                tooltipRefs.current[member.alt] = el;
              }}
              className="absolute bottom-[calc(100%-24px)] left-1/2 -translate-x-1/2 pointer-events-none z-50"
              style={{ willChange: "transform, opacity" }}
            >
              <div
                className="whitespace-nowrap px-4 py-2 rounded-2xl text-sm font-semibold text-white shadow-xl border border-white/20"
                style={{
                  background: "rgba(10,10,20,0.72)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: "0 8px 32px 0 rgba(0,0,0,0.32), 0 1.5px 8px 0 rgba(100,180,255,0.10)",
                  letterSpacing: "0.01em",
                }}
              >
                {member.name}
              </div>
              {/* Arrow */}
              <div
                className="mx-auto -mt-[1px] w-0 h-0"
                style={{
                  borderLeft: "7px solid transparent",
                  borderRight: "7px solid transparent",
                  borderTop: "7px solid rgba(10,10,20,0.72)",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.18))",
                }}
              />
            </div>

            {/* The actual image — only the img gets the flip, not the wrapper */}
            <img
              src={member.src}
              alt={member.alt}
              className={cn("w-full h-full object-contain object-center pointer-events-none select-none", member.imgClassName)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
