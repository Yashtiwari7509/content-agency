import { useEffect, Suspense, lazy } from "react";
import { useLenis } from "lenis/react";
import Hero from "./Hero";
import GridScore from "./GridScore";
import DonutSlider from "./DonutSlider";
import PhoneVideo from "./new/PhoneVideo";
import PhoneStats from "./PhoneStats";
import Slider1 from "./new/slider1";

// Dynamically imported components
const Footer = lazy(() => import("./Footer"));
const PortfolioLayout = lazy(() => import("./Portfolio"));
const ServicesLayout = lazy(() => import("./Services"));
const MarqueeReviews = lazy(() => import("./MarqueeReviews"));
const VerticalSlider = lazy(() => import("./VerticalSlider"));
const FixedText = lazy(() => import("./FixedText"));

const Home = () => {
    const lenis = useLenis();

    useEffect(() => {
        lenis?.scrollTo(0, { immediate: true });
    }, [lenis]);

    return (
        <div className="w-screen relative">
            <PhoneVideo/>
            <Hero />
            <Slider1/>
            <GridScore />
            <PhoneStats/>
            <FixedText />
            <DonutSlider/>

            <Suspense fallback={<div>Loading...</div>}>
                <PortfolioLayout />
                <ServicesLayout />
                <VerticalSlider />
                <MarqueeReviews />
                <Footer />
            </Suspense>
        </div>
    );
};

export default Home;
