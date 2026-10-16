import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export function useTextReveal(scope?: RefObject<HTMLElement | null>) {
  const fallbackRef = useRef<HTMLElement>(null);
  const rootRef = scope ?? fallbackRef;

  useGSAP(
    () => {
      const elements = gsap.utils.toArray<HTMLElement>("[data-reveal='words']", rootRef.current);

      elements.forEach((el) => {
        SplitText.create(el, {
          type: "words,lines",
          mask: "lines",
          autoSplit: true,

          onSplit(self) {
            return gsap.from(self.words, {
              yPercent: 100,
              duration: 0.8,
              stagger: 0.02,
              ease: "power3.out",

              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                once: true,
              },
            });
          },
        });
      });
    },
    { scope: rootRef },
  );

  return fallbackRef;
}

export function useCardReveal(scope?: RefObject<HTMLElement | null>) {
  const fallbackRef = useRef<HTMLElement>(null);
  const rootRef = scope ?? fallbackRef;

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-reveal='card']", rootRef.current);
      if (!cards.length) return;

      // Set initial state (avoids flash of unstyled content)
      gsap.set(cards, { autoAlpha: 0, y: 60, scale: 0.96 });

      // Each card triggers independently as it enters the viewport
      cards.forEach((card) => {
        gsap.to(card, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",

          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true,
          },
        });
      });
    },
    { scope: rootRef },
  );

  return fallbackRef;
}
