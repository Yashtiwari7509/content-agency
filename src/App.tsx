import "./App.css";
import "lenis/dist/lenis.css";
import { NavbarTop } from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, type LenisRef } from "lenis/react";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import Home from "./pages/home";
import { Route, Routes } from "react-router";
import About from "./pages/about/About";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import "lenis/dist/lenis.css";
import Pricing from "./pages/pricing/Pricing";
import MouseMove from "./components/MouseMove";
import TeamLineup from "./pages/home/new/Loader";
import { ContactProvider } from "./components/contact/ContactContext";
import { ContactModal } from "./components/contact/ContactModal";

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable, InertiaPlugin, DrawSVGPlugin, MotionPathPlugin);

function App() {
  const mainRef = useRef(null);
  const lenisRef = useRef<LenisRef>(null);
  const [loading, setLoading] = useState(true);
  const tl1Ref = useRef<GSAPTimeline>(null);

  useGSAP(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  useEffect(() => {
    const root = document.getElementById("root");
    if (loading) {
      root?.classList.add("is-loading");
      lenisRef.current?.lenis?.stop();
    } else {
      root?.classList.remove("is-loading");
      lenisRef.current?.lenis?.start();
    }
  }, [loading]);

  useGSAP(() => {
    tl1Ref.current = gsap
      .timeline({})
      .from(".img-side", {
        delay: 1,
        y: 600,
        duration: 1.5,
        ease: "expo.out",
        stagger: {
          each: 0.07,
          from: "center",
        },
      })
      .from(".img-side", {
        onComplete: () => {
          setLoading(false);
        },
      })
      .to(".loader-bg-mask", {})
      .to(".loader-screen", {
        delay: 0.5,
        y: -700,
        duration: 1.5,
        ease: "expo.in",
        onComplete: () => {
          gsap.set(".loader-screen", {
            display: "none",
          });
        },
      });
  });

  return (
    <>
      <TeamLineup />
      <ReactLenis
        ref={lenisRef}
        options={{
          autoRaf: false,
          duration: 1,
        }}
        root
      />
      <ContactProvider>
        <div ref={mainRef} className="relative w-screen" style={{ visibility: loading ? "hidden" : "visible" }}>
          <NavbarTop />
          <MouseMove />
          <ContactModal />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </div>
      </ContactProvider>
    </>
  );
}

export default App;
