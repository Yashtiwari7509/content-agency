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
import { SplitText } from "gsap/SplitText";
import MouseMove from "./components/MouseMove";
import DesktopOnly from "./components/DesktopOnly";
import { ContactProvider } from "./components/contact/ContactContext";
import { ContactModal } from "./components/contact/ContactModal";

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable, InertiaPlugin, DrawSVGPlugin, MotionPathPlugin, SplitText);

function App() {
  const mainRef = useRef(null);
  const lenisRef = useRef<LenisRef>(null);

  useGSAP(() => {
    // ── Lenis RAF integration ────────────────────────────────────────────────
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);

    // ── Batch reveal animation ───────────────────────────────────────────────
    // Problems solved:
    // 1. "SplitText called before fonts loaded" — we defer ALL split calls
    //    until document.fonts.ready resolves so metrics are correct.
    // 2. Flash of visible text — .reveal-text starts visibility:hidden (CSS),
    //    revealEl sets it visible the instant GSAP takes over.
    // 3. Suspense elements — MutationObserver starts immediately (before fonts
    //    load) so no nodes are missed, but revealEl itself is gated by fonts.
    const animated = new WeakSet<Element>();
    let fontsLoaded = false;
    const pending: Element[] = [];

    function revealEl(el: Element) {
      if (animated.has(el)) return;
      animated.add(el);

      // Unhide exactly when GSAP is ready to set the start state
      gsap.set(el, { visibility: "visible" });

      SplitText.create(el, {
        type: "words,lines",
        mask: "lines",
        onSplit(self) {
          gsap.from(self.words, {
            y: "100%",
            duration: 0.8,
            stagger: 0.02,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              once: true,
            },
          });
        },
      });
    }

    // MutationObserver starts NOW so Suspense nodes are never missed.
    // Actual reveal is queued until fonts are ready.
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const el = node as Element;
          const targets: Element[] = [];
          if (el.matches(".reveal-text")) targets.push(el);
          el.querySelectorAll<Element>(".reveal-text").forEach((c) => targets.push(c));
          targets.forEach((target) => {
            if (fontsLoaded) {
              // Fonts already ready — wire up ScrollTrigger immediately
              ScrollTrigger.create({
                trigger: target,
                start: "top 80%",
                once: true,
                onEnter: () => revealEl(target),
              });
            } else {
              // Queue for processing once fonts load
              pending.push(target);
            }
          });
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Gate all SplitText calls on fonts being ready
    document.fonts.ready.then(() => {
      fontsLoaded = true;

      // Initial pass — elements already in the DOM
      ScrollTrigger.batch(".reveal-text", {
        start: "top 80%",
        once: true,
        onEnter: (batch) => batch.forEach(revealEl),
      });

      // Flush any nodes the MutationObserver caught before fonts were ready
      pending.forEach((el) => {
        if (animated.has(el)) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 80%",
          once: true,
          onEnter: () => revealEl(el),
        });
      });
      pending.length = 0;
    });

    return () => {
      gsap.ticker.remove(update);
      observer.disconnect();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
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
        <div ref={mainRef} className="relative w-screen overflow-hidden">
          <NavbarTop />
          <DesktopOnly>
            <MouseMove />
          </DesktopOnly>
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
