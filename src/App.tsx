import "./App.css";
import { NavbarTop } from "@/components/Navbar";
import { useRef } from "react";
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

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable, InertiaPlugin, DrawSVGPlugin, MotionPathPlugin);

function App() {
  const mainRef = useRef(null);
  const lenisRef = useRef<LenisRef>(null);

  useGSAP(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    // lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <>
      <ReactLenis
        ref={lenisRef}
        options={{
          autoRaf: false,
          easing: function easeOutCubic(x: number): number {
            return 1 - Math.pow(1 - x, 3);
          },
          duration: 2,
        }}
        root
      />
      <div ref={mainRef} className="relative w-screen">
        <NavbarTop />
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
