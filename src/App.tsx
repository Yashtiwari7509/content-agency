import "./App.css";
import "lenis/dist/lenis.css";
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
import About from "./pages/about";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import MouseMove from "./components/MouseMove";
import { ContactProvider } from "./components/contact/ContactContext";
import { ContactModal } from "./components/contact/ContactModal";

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable, InertiaPlugin, DrawSVGPlugin, MotionPathPlugin);

function App() {
  const mainRef = useRef(null);
  const lenisRef = useRef<LenisRef>(null);

  useGSAP(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);
  return (
    <>
      <ReactLenis
        ref={lenisRef}
        options={{
          autoRaf: false,
          duration: 1,
        }}
        root
      />
      <ContactProvider>
        <div ref={mainRef} className="relative w-screen">
          <NavbarTop />
          <MouseMove />
          <ContactModal />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </ContactProvider>
    </>
  );
}

export default App;
