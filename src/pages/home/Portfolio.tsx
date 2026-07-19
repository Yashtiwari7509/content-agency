import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionHeader from "@/components/SectionHeader";
import PortfolioClientRow from "@/components/portfolio/PortfolioClientRow";
import { VideoPlaybackProvider } from "@/components/video/VideoPlaybackContext";
import { portfolioClients } from "./portfolio/clients";

gsap.registerPlugin(ScrollTrigger);

const PIN_TOP = window.innerWidth < 600 ? 60 : 200; // px from viewport top where each card pins

export default function PortfolioLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (!cards.length) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1000px)", () => {
        cards.forEach((card, i) => {
          // const isLast = i === cards.length - 1;

          // Pin each card at PIN_TOP from the top.
          // pinSpacing: false keeps the DOM flow tight so the next card
          // naturally scrolls up from below.
          ScrollTrigger.create({
            trigger: card,
            start: () => `top ${PIN_TOP}`,
            // Keep it pinned long enough for all remaining cards to scroll over it
            end: () => `+=${(cards.length - 1 - i) * card.offsetHeight}`,
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
          });

          // As the NEXT card scrolls over this one: shrink + slight rotate
          // if (!isLast) {
          //   gsap.to(card, {
          //     scale: 0.94,
          //     rotate: -1.5,
          //     transformOrigin: "50% 0%",
          //     ease: "none",
          //     scrollTrigger: {
          //       trigger: cards[i + 1],
          //       start: `top ${PIN_TOP + 80}`,
          //       end: `top ${PIN_TOP}`,
          //       scrub: true,
          //     },
          //   });
          // }
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [] },
  );

  return (
    <section id="portfolio" className="relative p-2 pb-32">
      <div className="relative mx-auto max-w-5xl">
        <SectionHeader
          label="Portfolio"
          title="Where creativity meets —"
          gradientWord="motion"
          description="Dive into our work — bold visuals, sharp edits, and stories built to move your audience."
        />

        <VideoPlaybackProvider>
          <div ref={containerRef} className="relative mt-12">
            {portfolioClients.map((client, index) => (
              <div
                key={client.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="pb-2 bg-white"
              >
                <PortfolioClientRow client={client} reverse={index % 2 === 1} />
              </div>
            ))}
          </div>
        </VideoPlaybackProvider>
      </div>
    </section>
  );
}
