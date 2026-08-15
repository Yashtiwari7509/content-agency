import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rahul1, Yash, Harsh } from "@/assets/ClientImage";
import SectionHeader from "@/components/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

interface Founder {
  src: string;
  name: string;
  role: string;
  delay: number;
  flip?: boolean;
}

const founders: Founder[] = [
  {
    src: Rahul1,
    name: "Rahul Gaur",
    role: "Founder",
    delay: 0,
  },
  {
    src: Yash,
    name: "Yash Gupta",
    role: "Creative Lead",
    delay: 0.12,
  },
  {
    src: Harsh,
    name: "Harsh Gupta",
    role: "Operational manager",
    delay: 0.24,
  },
];

export default function FoundersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const figureRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section id="founders" ref={sectionRef} className="relative w-full overflow-hidden bg-white pt-20 pb-0">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -left-36 top-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(29,158,117,0.1)_0%,transparent_70%)] blur-[120px]" />
      <div className="pointer-events-none absolute -right-36 top-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(41,121,255,0.08)_0%,transparent_70%)] blur-[120px]" />

      {/* Header */}
      <SectionHeader
        label="The People Behind"
        title="Meet Our"
        gradientWord="Leadership"
        description="Visionaries who built the future of healthcare content from the ground up."
      />

      {/* Figures row */}
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-20 px-4 sm:flex-row sm:items-end sm:gap-0 sm:px-6">
        {founders.map((founder, i) => (
          <div
            key={founder.name}
            ref={(el) => {
              figureRefs.current[i] = el;
            }}
            className="group relative flex w-full flex-col items-center sm:flex-1"
          >
            {/* Divider between cards on desktop */}
            {i > 0 && (
              <div className="absolute bottom-[20%] left-0 hidden h-[40%] w-px bg-gradient-to-b from-transparent via-black/[0.08] to-transparent sm:block" />
            )}

            {/* Image + label wrapper */}
            <div className="relative w-full h-[450px] sm:h-[500px]">
              <img
                src={founder.src}
                alt={founder.name}
                className={[
                  "absolute bottom-0 left-1/2 pt-3 -translate-x-1/2 w-full max-w-[270px] sm:max-w-none sm:w-auto sm:h-full object-contain object-bottom",
                  "transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                  "group-hover:scale-[1.03] group-hover:-translate-y-1.5 group-hover:-translate-x-1/2",
                ].join(" ")}
              />

              {/* Index number — top-right badge */}
              <div className="absolute right-3 top-3 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white/70 backdrop-blur-sm">
                <span className="font-['Poppins'] text-[10px] font-700 tabular-nums text-black/50">0{i + 1}</span>
              </div>

              {/* Slide-up info panel */}
              <div className="absolute inset-x-0 bottom-0 z-10 translate-y-[calc(100%-68px)] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0">
                {/* Peek strip — always visible */}
                <div className="flex h-17 bg-white/50 items-center justify-between px-5 backdrop-blur-md">
                  <h1 className="text-sm font-extrabold uppercase tracking-[0.22em] opacity-80">{founder.role}</h1>
                  {/* Arrow indicator */}
                  <svg
                    className="h-4 w-4 -rotate-45 opacity-40 transition-all duration-500 group-hover:rotate-0 group-hover:opacity-100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" color="sklblue" />
                  </svg>
                </div>

                {/* Full reveal panel */}
                <div className="flex relative flex-col gap-3 bg-white px-5 py-4 backdrop-blur-xl">
                  <strong className="relative text-2xl font-bold leading-none tracking-[-0.03em] text-[#0a0a0a] sm:text-3xl">
                    {founder.name}
                    <div className={`absolute z-10 mt-2 h-px w-full bg-linear-to-r from-[#14E5E2] to-transparent`} />
                  </strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
