import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";
import { Andrew1, Chris1, Nick1, Rahul1, Thomas1 } from "@/assets/ClientImage";

gsap.registerPlugin(ScrollTrigger);

const members = [
  {
    src: Andrew1,
    alt: "Andrew",
    className: "left-[2%] bottom-2 h-[580px] hidden lg:block z-10 w-110 translate-y-10 scale-x-[-1]",
  },
  {
    src: Thomas1,
    alt: "Thomas",
    className: "lg:left-[20%] -left-20 bottom-0 w-72 lg:h-[580px] lg:w-120 z-20 translate-y-2",
  },
  {
    src: Rahul1,
    alt: "Rahul",
    className: "left-1/2 -translate-x-1/2 bottom-0 w-80 lg:w-120 lg:h-[620px] z-30",
  },
  {
    src: Nick1,
    alt: "Nick",
    className: "lg:right-[20%] -right-20 bottom-0  lg:h-[570px] z-20 w-70 lg:w-120 translate-y-2 scale-x-[-1]",
  },
  {
    src: Chris1,
    alt: "Chris",
    className: "right-[10%] bottom-0 h-[580px] hidden lg:block z-10 w-120 translate-y-12 scale-x-[-1]",
  },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative w-full h-[80vh]">
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
      <div
        className="relative lg:max-w-360 max-w-100 mx-auto  -translate-y-40 md:-translate-y-10 mt-20"
        style={{ height: "clamp(420px, 72vh, 800px)" }}
      >
        {members.map((member, index) => (
          <img
            key={index}
            src={member.src}
            alt={member.alt}
            className={cn("team-section-img absolute object-contain object-center w-auto", member.className)}
          />
        ))}
      </div>
    </section>
  );
}
