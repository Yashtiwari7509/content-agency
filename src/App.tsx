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
// import { MarqueeDemo } from "./pages/home/MarqueeReviews";
import PhoneVideo from "./pages/home/PhoneVideo";
import GridScore from "./pages/home/GridScore";
import { Draggable } from "gsap/Draggable";
import { Footer } from "./pages/home/Footer";

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);

function App() {
  const mainRef = useRef(null);
  return (
    <>
      <ReactLenis root />
      <div ref={mainRef} className="relative w-screen">
        <NavbarTop />
        <div className="w-full">
          <Hero />
          <GridScore />
          <FixedText />
          <PortfolioLayout />
          <PhoneVideo />
          <ServicesLayout />
          {/* <Slider/> */}
          <Footer />
          {/* <MarqueeDemo /> */}
        </div>
      </div>
    </>
  );
}

export default App;
