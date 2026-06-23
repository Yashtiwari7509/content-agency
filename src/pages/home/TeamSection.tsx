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
    name: "Andrew Koutnik",
    role: "Fitness & Lifestyle",
    className: "left-[2%] bottom-0 h-[580px] w-110 z-10 translate-y-10 scale-x-[-1]",
  },
  {
    src: Thomas,
    alt: "Thomas",
    name: "Thomas DeLauer",
    role: "Health & Nutrition",
    className: "left-[19%] bottom-0 h-[600px] w-120 z-20 translate-y-2",
  },
  {
    src: Rahul,
    alt: "Rahul",
    name: "Rahul Malodia",
    role: "Business & Finance",
    className: "left-1/2 -translate-x-1/2 bottom-0 w-120 h-[640px] z-30",
  },
  {
    src: Nick,
    alt: "Nick",
    name: "Nick Norwitz",
    role: "Science & Research",
    className: "right-[19%] bottom-0 h-[590px] z-20 w-120 translate-y-2 scale-x-[-1]",
  },
  {
    src: Chris,
    alt: "Chris",
    name: "Chris (Sponsor)",
    role: "Tech & Innovation",
    className: "right-[6%] bottom-0 h-[580px] z-10 w-120 translate-y-12 scale-x-[-1]",
  },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden" style={{ minHeight: "100vh" }}>
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
      <div className="relative w-full translate-y-20" style={{ height: "clamp(420px, 72vh, 700px)" }}>
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
        <h2 className="select-none font-black  text-[15vw] translate-y-6 leading-none tracking-tighter glow">xPro</h2>
      </div>
    </section>
  );
}
