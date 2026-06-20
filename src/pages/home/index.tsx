import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import Hero from "./Hero";
import GridScore from "./GridScore";
import DonutSlider from "./DonutSlider";
import PhoneVideo from "./new/PhoneVideo";
import PhoneStats from "./PhoneStats";
import ApertureCardSlider from "@/components/ApertureCardSlider";
import ServicesSlider from "./ServicesSlider";
import TeamSection from "./TeamSection";
import ContactSection from "./ContactSection";
import SiteFooter from "./SiteFooter";
import Preloader from "./new/Preloader";
import TeamLineup from "./new/Loader";
import PortfolioLayout from "./Portfolio";
import VerticalSlider from "./VerticalSlider";
import MarqueeReviews from "./MarqueeReviews";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Home = () => {
  const lenis = useLenis();
  const tl1Ref = useRef<GSAPTimeline>(null);
  const tl2Ref = useRef<GSAPTimeline>(null);

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [lenis]);

  useGSAP(() => {
    tl1Ref.current = gsap.timeline({}).from(".img-side", {
      delay: 1,
      y: 600,
      duration: 2,
      ease: "expo.out",
      stagger: {
        each: 0.04,
        from: "center",
      },
    });

    tl2Ref.current = gsap
      .timeline({ paused: true })
      // 1. Loader slides up — expo.in feels like it's being pulled away
      .to(".loader-screen", {
        delay: 0.5,
        y: "-100vh",
        duration: 1.2,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set(".loader-screen", { display: "none" });
        },
      })
      // 2. Hero diamond → fullscreen clip-path reveal (starts 0.3s before loader fully exits)
      .fromTo(
        "#hero-section",
        { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.4, ease: "expo.out" },
        "-=0.5",
      )
      // 3. Clouds drift in, overlapping with the expand
      .from(
        ".clouds",
        { y: 80, opacity: 0, duration: 1.1, stagger: 0.18, ease: "power3.out" },
        "-=0.8",
      )
      // 4. Center ring scales in, overlapping with clouds
      .from(
        ".center",
        { opacity: 0, scale: 0, duration: 0.9, ease: "back.out(1.4)" },
        "-=0.7",
      );
  });

  return (
    <Preloader minDuration={4000}>
      {({ progress, ready }) => {
        return (
          <>
            <div className="fixed left-2 top-2 z-2000  font-bold text-3xl">
              {progress}
              {ready &&
                tl2Ref.current &&
                (() => {
                  tl2Ref.current!.paused(false);
                  return null;
                })()}
            </div>
            <TeamLineup />

            <div
              className="w-screen relative"
              style={{
                // Hidden until loader exits, but still rendered so assets preload
                visibility: ready ? "visible" : "hidden",
                pointerEvents: ready ? "auto" : "none",
              }}
            >
              <PhoneVideo />
              <Hero />
              <ApertureCardSlider />
              <GridScore />
              <PhoneStats />
              <DonutSlider />
              <ServicesSlider />
              <PortfolioLayout />
              <VerticalSlider />
              <MarqueeReviews />
              <ContactSection />
              <TeamSection />
              <SiteFooter />
            </div>
          </>
        );
      }}
    </Preloader>
  );
};

export default Home;
