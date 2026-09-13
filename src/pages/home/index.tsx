import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const [locked, setLocked] = useState(true);
  const unlockedRef = useRef(false); // guards against double-unlock (timeline + fallback both firing)
  const scrollYRef = useRef(0); // remembers scroll position while body is pinned

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

  // --- Safari-safe scroll lock: pin body with position:fixed instead of
  // relying on overflow:hidden + preventDefault, which Safari/iOS ignores
  // for rubber-band and some touch gestures.
  useEffect(() => {
    if (!locked) return;

    const body = document.body;
    scrollYRef.current = window.scrollY;

    lenis?.stop();

    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";

      window.scrollTo(0, scrollYRef.current);

      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }

      lenis?.start();
    };
  }, [locked, lenis]);

  const unlockScroll = () => {
    if (unlockedRef.current) return; // avoid double-run from timeline + fallback race
    unlockedRef.current = true;

    // Force the overlay out of the way regardless of what triggered this.
    gsap.set(".loader-screen", { display: "none" });

    setLocked(false); // triggers the cleanup above, which un-pins the body
  };

  useEffect(() => {
    // True fallback — only fires if the GSAP timeline never completes.
    // Timeline duration: delay(0.5) + img-side(2) + loader-screen(1.2) = 3.7s,
    // so this must sit comfortably after that.
    const fallbackTimer = setTimeout(() => {
      unlockScroll();
    }, 4500);
    return () => clearTimeout(fallbackTimer);
  }, []);

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
      .call(unlockScroll)
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
