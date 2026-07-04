import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Andrew, Chris, Nick, Rahul, Thomas } from "@/assets/ClientImage";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const members = [
  {
    src: Andrew,
    alt: "Andrew",
    className: "left-[2%] bottom-2 h-[580px] hidden lg:block z-10 w-110 translate-y-10 scale-x-[-1]",
  },
  {
    src: Thomas,
    alt: "Thomas",
    className: "lg:left-[20%] -left-20 bottom-0 w-72 lg:h-[580px] lg:w-120 z-20 translate-y-2",
  },
  {
    src: Rahul,
    alt: "Rahul",
    className: "left-1/2 -translate-x-1/2 bottom-0 w-80 lg:w-120 lg:h-[620px] z-30",
  },
  {
    src: Nick,
    alt: "Nick",
    className: "lg:right-[20%] -right-20 bottom-0  lg:h-[570px] z-20 w-70 lg:w-120 translate-y-2 scale-x-[-1]",
  },
  {
    src: Chris,
    alt: "Chris",
    className: "right-[10%] bottom-0 h-[580px] hidden lg:block z-10 w-120 translate-y-12 scale-x-[-1]",
  },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden h-[70vh] lg:h-screen">
      {/* Background gradient blob */}
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

      {/* Stacked images stage */}
      <div className="relative w-full -translate-y-40 lg:translate-y-20" style={{ height: "clamp(420px, 72vh, 700px)" }}>
        {members.map((member, index) => (
          <img
            key={index}
            src={member.src}
            alt={member.alt}
            className={cn("team-section-img absolute object-contain object-center w-auto", member.className)}
          />
        ))}
      </div>
      {/* ── Giant wordmark ── */}
      <div className="absolute bottom-0 text-center  w-full z-100">
        {/* overflow-hidden here clips the slide-up reveal only vertically */}
        <h2 className="select-none font-black  text-[clamp(8rem,20vw,14rem)] translate-y-6 leading-none tracking-tighter glow">xPro</h2>
      </div>
    </section>
  );
}
