import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import Hero from "./Hero";
import GridScore from "./GridScore";
import DonutSlider from "./DonutSlider";
import PhoneVideo from "./new/PhoneVideo";
import PhoneStats from "./PhoneStats";
import ApertureCardSlider from "@/components/ApertureCardSlider";
import TeamLineup from "./new/Loader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import DesktopOnly from "@/components/DesktopOnly";

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
  const readyRef = useRef(false);


  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true }); // instant, not animated — avoids a second source of "current" scroll position
  }, [lenis]);

  useEffect(() => {
    if (!locked) return;

    const html = document.documentElement;
    const body = document.body;

    // scrollY is guaranteed 0 here because of the useLayoutEffect above
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = "0";
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    lenis?.stop();

    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const preventScrollKeys = (e: KeyboardEvent) => {
      const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
      if (keys.includes(e.key)) e.preventDefault();
    };

    document.addEventListener("wheel", preventScroll, { passive: false });
    document.addEventListener("touchmove", preventScroll, { passive: false });
    document.addEventListener("keydown", preventScrollKeys, { passive: false });

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, 0);

      // Re-enable native scroll restoration once the lock is over,
      // so normal back/forward navigation behaves as expected again.
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }

      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
      document.removeEventListener("keydown", preventScrollKeys);

      lenis?.start();
    };
  }, [locked, lenis]);

  const unlockScroll = () => {
    if (readyRef.current) return;
    readyRef.current = true;
    setLocked(false);
  };

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
      .from(".text-container", { y: 250, duration: 1, ease: "power4.out" }, "<")
      .from(".center", { y: 20, scale: 1.2, opacity: 0, immediateRender: true }, "<");
  });

  return (
    <>
      <TeamLineup />
      <div
        className="w-screen relative"
      >
        <DesktopOnly>
          <PhoneVideo />
        </DesktopOnly>
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
