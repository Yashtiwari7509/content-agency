import { lazy, Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import Hero from "./Hero";
import GridScore from "./GridScore";
import DonutSlider from "./DonutSlider";
import PhoneStats from "./PhoneStats";
import ApertureCardSlider from "@/components/ApertureCardSlider";
import TeamLineup from "./new/Loader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ServicesSlider = lazy(() => import("./ServicesSlider"));
const WorkflowSection = lazy(() => import("./WorkflowSection"));
const PortfolioLayout = lazy(() => import("./Portfolio"));
const VerticalSlider = lazy(() => import("./VerticalSlider"));
const MarqueeReviews = lazy(() => import("./MarqueeReviews"));
const ContactSection = lazy(() => import("./ContactSection"));
const TeamSection = lazy(() => import("./TeamSection"));
const SiteFooter = lazy(() => import("./SiteFooter"));

const Home = () => {
  const lenis = useLenis();

  const tl1Ref = useRef<GSAPTimeline>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
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
        y: "-100vh",
        duration: 1.2,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set(".loader-screen", { display: "none" });
        },
      })
      .from(".clouds", { y: 200, duration: 1.6, ease: "power4.out" }, "-=.6")
      .from(".text-container", { y: 50, duration: 1, ease: "power4.out" }, "<")
      .from(".center", { y: -100, opacity: 0, immediateRender: true }, "<");
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
        <Suspense fallback={null}>
          <ServicesSlider />
          <WorkflowSection />
          <PortfolioLayout />
          <VerticalSlider />
          <MarqueeReviews />
          <ContactSection />
          <TeamSection />
          <SiteFooter />
        </Suspense>
      </div>
    </>
  );
};

export default Home;
