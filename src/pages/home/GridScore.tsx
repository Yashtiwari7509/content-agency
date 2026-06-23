import ChatBubble from "@/components/ChatBubble";
import HeroCard, { type CardStatsItem } from "@/components/HeroCard";
import RevealAnimation from "@/components/ui/animationReveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import SectionHeader from "@/components/SectionHeader";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReviewSlider from "./ReviewSlider";
import { mac, rays, reel, short, social, starSvg } from "@/assets/Image";
import { Andrew, Nick, Thomas } from "@/assets/ClientImage";

const CardStatsData: CardStatsItem[] = [
  {
    top: [Nick, short],
    bottom: [
      {
        label: "Norwitz",
        value: "Nick",
      },
      {
        label: "Subscribe",
        value: "1M+",
      },
    ],
    heroCard: true,
    animation: true,
    alignmentCss: "35% 50%",
  },
  {
    top: [Thomas, short],
    bottom: [
      {
        label: "DeLauer",
        value: "Thomas",
      },
      {
        label: "Subscribe",
        value: "4M+",
      },
    ],
    heroCard: true,
    animation: true,
    alignmentCss: "100% 20%",
  },
  {
    top: [Andrew, reel],
    bottom: [
      {
        label: "Koutnik",
        value: "Andrew",
      },
      {
        label: "follower",
        value: "80k+",
      },
    ],
    heroCard: true,
    animation: true,
    alignmentCss: "100% 80%",
  },
];

const GridScore = () => {
  const gridTlRef = useRef<GSAPTimeline>(null);

  useGSAP(() => {
    gridTlRef.current = gsap.timeline({});
    gsap.from(".handds", {
      opacity: 1,
      ease: "power4.out",
      x: (x) => (x === 0 ? -100 : 100),
      scrollTrigger: {
        trigger: ".middle",
        start: `-250% top`,
        end: "top top",
        scrub: 4,
      },
    });
    gsap.from("#grid-num", {
      textContent: 1,
      duration: 1,
      snap: { textContent: 1 },
      scrollTrigger: {
        trigger: ".container",
        start: `-20% top`,
        end: "top top",
      },
    });
    ScrollTrigger.batch(".container > div", {
      interval: 0.1,
      batchMax: 3,
      once: true,
      onEnter: (elements) => gsap.from(elements, { y: 200, stagger: 0.15, clearProps: "transform", overwrite: "auto" }),
    });
  });
  return (
    <section id="score" className="w-screen  p-2 overflow-x-hidden relative py-20">
      <SectionHeader
        label="Score"
        title="Our Success—"
        gradientWord="Score"
        description="We edit for doctors, dietitians, and researchers who need their science communicated clearly and their channels growing."
      />

      <div className="container max-w-5xl min-h-screen lg:h-240  mx-auto">
        <div className="top-left relative overflow-hidden">
          <div className="relative z-10 inner-grid w-full h-full flex flex-col justify-center items-center">
            <img src={starSvg} className="size-30 absolute brightness-110 top-0 right-0 lg:top-10  lg:right-12 rotate-0" alt="" />
            <h1
              id="grid-num"
              style={{ filter: "drop-shadow(1px -1px 10px skyblue)" }}
              className="c-text text-9xl font-black w-fit h-fit leading-none"
            >
              40
            </h1>
            <RevealAnimation blurAmount={0} yPercent={200} className="overflow-hidden">
              <h4 className="text-3xl tracking-tight font-semibold">Channels Managed</h4>
            </RevealAnimation>
          </div>
          <div className="absolute z-0 bottom-0 left-0 size-full">
            <img src={rays} className="size-full" alt="" />
          </div>
        </div>

        <div className="top-right overflow-hidden">
          <div className="inner-grid w-full h-full relative ">
            <img
              src={mac}
              style={{ filter: "drop-shadow(0px -1px 20px black)" }}
              className="size-full absolute top-6 -right-42  object-contain rotate-0"
              alt=""
            />
            <div className="pt-5">
              <h3 style={{ WebkitTextStroke: "1px black" }} className="text-8xl ml-[4rem] font-bold text-transparent">
                2500+
              </h3>
              <h4 className="text-6xl ml-[4rem] font-bold">
                Raw <br />
                Video <br />
                Edited
              </h4>
            </div>
          </div>
        </div>
        <div className="middle">
          <div className="inner-grid w-full h-full relative overflow-hidden">
            <ReviewSlider />
          </div>
        </div>
        <div className="bottom-left overflow-hidden">
          <div className="inner-grid w-full h-full ">
            <div className="absolute px-3 top-10 left-0 w-full flex justify-center ">
              <ChatBubble />
            </div>
            <img
              src={social}
              className="h-[45%] w-full bottom-0 mt-48 brightness-95 relative  object-cover"
              alt=""
              style={{
                maskImage: "linear-gradient(to top , transparent 10%, black , transparent)",
              }}
            />
            <h4 className="absolute z-10 px-8 text-left bottom-8 font-semibold text-3xl w-full">Platform handled by our Agency</h4>
            <div className="radial-blur-v size-50 absolute bottom-0  -right-20 z-0 blur-xl "></div>
          </div>
        </div>
        <div className="bottom-right relative">
          <div className="inner-grid w-full h-full relative overflow-hidden">
            <div className="absolute top-0 grid grid-cols-2 w-full h-[40%] gap-2 z-10">
              {CardStatsData.map((card, index) => (
                <HeroCard key={index + "grid"} card={card} id="grid-card" />
              ))}
            </div>
            <h4 className="absolute px-8 z-10  bottom-8 tracking-tighter leading-none  text-5xl w-full">Our work speaks more than us</h4>
            <div className="radial-blur-v size-50 absolute bottom-0  right-0 z-0 blur-xl "></div>
            <div className="radial-blur-b size-80 absolute top-0  -left-20 z-0 blur-xl "></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GridScore;
