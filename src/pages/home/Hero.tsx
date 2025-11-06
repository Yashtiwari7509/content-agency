import image from "../../../public/img.png";
import image1 from "../../../public/facebook.svg?url";
import image2 from "../../../public/short.svg?url";
import image3 from "../../../public/reels.svg?url";
import image4 from "../../../public/vite.svg?url";
import image5 from "../../../public/short.svg?url";
import image6 from "../../../public/facebook.svg?url";

import Balloons from "@/components/Balloons";
import HeroCard, { type CardStatsItem } from "@/components/HeroCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";

const Icons = [
  { src: image1 },
  { src: image2 },
  { src: image3 },
  { src: image4 },
  { src: image5 },
  { src: image6 },
  { src: image5 },
  { src: image6 },
];
const CardStatsData: CardStatsItem[] = [
  {
    top: [image2, image6],
    bottom: [
      {
        label: "views",
        value: "170k",
      },
      {
        label: "subs",
        value: "18k",
      },
    ],
    heroCard: true,
    animation: true,
    alignmentCss: window.innerWidth < 600 ? "85% 20%" : "70% 20%",
  },
  {
    top: ["https://www.shutterstock.com/image-photo/close-head-shot-portrait-preppy-600nw-1433809418.jpg", image6],
    bottom: [
      {
        label: "views",
        value: "170k",
      },
      {
        label: "subs",
        value: "18k",
      },
    ],
    heroCard: true,
    animation: true,
    alignmentCss: window.innerWidth < 600 ? "85% 80%" : "70% 80%",
  },
  {
    top: ["https://www.shutterstock.com/image-photo/close-head-shot-portrait-preppy-600nw-1433809418.jpg", image6],
    bottom: [
      {
        label: "views",
        value: "700k",
      },
      {
        label: "follower",
        value: "40k",
      },
    ],
    heroCard: true,
    animation: true,
    alignmentCss: window.innerWidth < 600 ? "72% 50%" : "85% 50%",
  },
];
const Hero = () => {
  const heroTlRef = useRef<GSAPTimeline>(null);

  useGSAP(() => {
    const textLine = SplitText.create(".hero-h1");
    const { words } = textLine.split({ type: "words,lines", mask: "words" });
    gsap.to(".center", {
      rotationZ: 360,
      duration: 50,
      repeat: -1,
      ease: "none",
    });
    heroTlRef.current = gsap.timeline({
      defaults: { ease: "power4.out" },
    });
    const tl = heroTlRef.current;
    tl.
    from(".clouds", {
      filter: "blur(30px)",
      y: 500,
      ease: "power4.out",
      duration: 3,
      stagger: 0.2,
    })

      .from(
        ".center",
        {
          opacity: 0,
          scale: 0,
          duration: 3,
        },
        "-=3"
      )
      .from(
        words,
        {
          yPercent: 100,
          ease: "power4.out",
          opacity: 0,
          stagger: 0.1,
        },
        "-=1"
      )
      .from(".climax", {
        opacity: 0,
        scale: 0,
      })
      .from(
        "#heroCard",
        {
          y: 500,
          ease: "power4.out",
          duration: 3,
          stagger: 0.2,
        },
        "-=3"
      );
  }, []);

  return (
    <section id="hero-section"  className="w-screen h-screen relative top-0 overflow-hidden">
      <div className="h-full w-full bg-background absolute top-0 z-0 hero-bg-mask"></div>
      <div className="absolute clouds top-5 left-1/3 z-0">
        <img src={image} width={300} height={200} alt="" />
      </div>
      <div className="absolute clouds top-32 left-2/4 z-20">
        <img src={image} width={300} height={200} alt="" />
      </div>
      <Balloons />

      <div className="relative px-2 text-black text-4xl mx-auto md:text-5xl lg:text-5xl md:max-w-1/2  text-center leading-tight font-semibold mt-[25vh] md:mt-[30vh] ">
        <h1 className="hero-h1 inline-block">Cookin</h1>
        <span className="font-[sans] climax inline-block pr-2">'trends.</span> <br />
        <h1 className="hero-h1 font-normal inline-block text-zinc-800">that build Brands</h1>
      </div>

      <div className="absolute h-[80vh] w-screen top-40 md:top-0 center-con">
        <div className="center  relative flex items-center w-[30vw] shrink-0 aspect-square justify-center border-2 border-white  rounded-full overflow-visible">
          {Array.from({ length: Icons.length / 2 }).map((_, i) => {
            const angle = i * (360 / (Icons.length / 3));
            const icon1 = Icons[i * 2];
            const icon2 = Icons[i * 2 + 1];

            return (
              <div
                key={i}
                className="spoke absolute top-1/2 left-1/2 origin-center"
                style={{
                  width: "2px",
                  height: "100%",
                  transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                }}
              >
                {/* Icon at top end of spoke */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    style={{
                      transform: `rotate(180deg)`,
                      transformOrigin: "center",
                    }}
                    className="flex bg-background items-center justify-center size-14 border-2 border-white rounded-lg backdrop-blur-sm"
                  >
                    <img src={icon1.src} className="w-6 h-6" alt="" />
                  </div>
                </div>

                {/* Icon at bottom end of spoke */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                  <div
                    style={{
                      transform: `rotate(0deg)`,
                      transformOrigin: "center",
                    }}
                    className="flex bg-background items-center justify-center size-14 border-2 border-white rounded-lg backdrop-blur-sm"
                  >
                    <img src={icon2.src} className="w-6 h-6" alt="" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {CardStatsData.map((card, index) => (
        <HeroCard key={index + "hero"} card={card} />
      ))}
    </section>
  );
};

export default Hero;
