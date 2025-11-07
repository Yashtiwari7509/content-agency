import Hero from "./Hero";
import GridScore from "./GridScore";
import { Footer } from "./Footer";
import PortfolioLayout from "./Portfolio";
import PhoneVideo from "./PhoneVideo";
import ServicesLayout from "./Services";
import MarqueeReviews from "./MarqueeReviews";
import VerticalSlider from "./VerticalSlider";
import FixedText2 from "./FixedText2";
import FixedText from "./FixedText";
import { useLenis } from "lenis/react";
import { useEffect } from "react";

const Home = () => {
  const lenis = useLenis();
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [lenis]);

  return (
    <div className="w-screen ">
      <Hero />
      <GridScore />
      <FixedText />
      <PortfolioLayout />
      <PhoneVideo />
      <div id="ndPage" className="w-screen h-screen relative pointer-events-none -z-10"></div>
      <div id="lastPage" className="w-screen h-screen relative pointer-events-none -z-10"></div>
      <ServicesLayout />
      <FixedText2 />
      <VerticalSlider />
      <MarqueeReviews />
      <Footer />
    </div>
  );
};

export default Home;
