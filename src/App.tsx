import "./App.css";
import { NavbarTop } from "@/components/Navbar";
import Hero from "@/pages/home/Hero";
import FixedText from "./pages/home/FixedText";
import ServicesLayout from "./pages/home/Services";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PortfolioLayout from "./pages/home/Portfolio";
import { ReactLenis } from "lenis/react";
import PhoneVideo from "./pages/home/PhoneVideo";
import GridScore from "./pages/home/GridScore";
import { Draggable } from "gsap/Draggable";
import { Footer } from "./pages/home/Footer";
import FixedText2 from "./pages/home/FixedText2";

import { InertiaPlugin } from "gsap/InertiaPlugin";
import MarqueeReviews from "./pages/home/MarqueeReviews";
import VerticalSlider from "./pages/home/VerticalSlider";

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable, InertiaPlugin);

function App() {
  const mainRef = useRef(null);
  return (
    <>
      <ReactLenis root />
      <div ref={mainRef} className="relative w-screen l-r-gradient">
        <NavbarTop />
        <div className="w-full">
          <Hero />
          <GridScore />
          <FixedText />
          <PortfolioLayout />
          <PhoneVideo />
          <ServicesLayout />
          <MarqueeReviews /> 
          <FixedText2 />
          <VerticalSlider />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
