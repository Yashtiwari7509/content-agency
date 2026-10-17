import { useEffect, useRef } from "react";
import Hero from "./Hero";
import GridScore from "./GridScore";
import DonutSlider from "./DonutSlider";
import PhoneStats from "./PhoneStats";
import ApertureCardSlider from "@/components/ApertureCardSlider";
import TeamLineup from "./new/Loader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ServicesSlider from "./ServicesSlider";
import WorkflowSection from "./WorkflowSection";
import PortfolioLayout from "./Portfolio";
import MarqueeReviews from "./MarqueeReviews";
import VerticalSlider from "./VerticalSlider";
import ContactSection from "./ContactSection";
import TeamSection from "./TeamSection";
import SiteFooter from "./SiteFooter";
import { useLenis } from "lenis/react";

const Home = () => {
  const tl1Ref = useRef<GSAPTimeline>(null);
  const lenisRef = useRef<ReturnType<typeof useLenis>>(null);

  // Always keep lenisRef in sync with the latest instance
  const lenis = useLenis();
  lenisRef.current = lenis;

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, []);

  useEffect(() => {
    if (lenis) {
      lenis.stop();
    }
  }, [lenis]);

  useGSAP(() => {
    tl1Ref.current = gsap
      .timeline({})
      .from(".img-side", {
        delay: 0.5,
        y: 700,
        duration: 2,
        ease: "expo.out",
        stagger: { each: 0.04, from: "center" },
      })
      .to(".loader-screen", {
        y: "-120vh",
        duration: 1.2,
        ease: "expo.inOut",
        filter: "blur(50px)",
        onComplete: () => {
          lenisRef.current?.start();
          gsap.set(".loader-screen", { display: "none" });
        },
      })
      .from(".clouds", { y: 200, duration: 1.6, ease: "power4.out" }, "-=.6")
      .from(".hero-anime", { y: 50, duration: 1, ease: "power4.out", stagger: 0.05 }, "<")
      .from(".center", { y: 100, opacity: 0, immediateRender: true }, "<");
  });

  return (
    <>
      <TeamLineup />
      <div className="w-screen relative">
        <Hero />
        <ApertureCardSlider />
        <GridScore />
        <PhoneStats />
        <DonutSlider />
        <ServicesSlider />
        <WorkflowSection />
        <PortfolioLayout />
        <VerticalSlider />
        <MarqueeReviews />
        <ContactSection />
        <TeamSection />
        <SiteFooter />
      </div>
    </>
  );
};

export default Home;
