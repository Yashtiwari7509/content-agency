import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const [locked, setLocked] = useState(true);
  const readyRef = useRef(false);

  // 1. Disable native scroll restoration and force the page to the
  //    top synchronously, BEFORE the lock effect reads window.scrollY.
  //    useLayoutEffect runs before paint and before regular useEffects,
  //    so this always wins the race against reload scroll restoration.
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
    tl1Ref.current = gsap.timeline({}).from(".img-side", {
      delay: 1,
      y: 600,
      duration: 2,
      ease: "expo.out",
      stagger: { each: 0.04, from: "center" },
    });

    tl2Ref.current = gsap
      .timeline({ paused: true })
      .to(".loader-screen", {
        delay: 0.5,
        y: "-100vh",
        duration: 1.2,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set(".loader-screen", { display: "none" });
        },
      })
      .fromTo(
        "#hero-section",
        { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.4, ease: "expo.out" },
        "-=0.5",
      )
      .from(".clouds", { y: 80, opacity: 0, duration: 1.1, stagger: 0.18, ease: "power3.out" }, "-=0.8")
      .from(".center", { opacity: 0, scale: 0, duration: 0.9, ease: "back.out(1.4)" }, "-=0.7")
      .call(unlockScroll);
  });

  return (
    <Preloader minDuration={4000} onReady={() => tl2Ref.current?.paused(false)}>
      {({ ready }) => (
        <>
          <TeamLineup />
          <div
            className="w-screen relative"
            style={{
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
      )}
    </Preloader>
  );
};

export default Home;
