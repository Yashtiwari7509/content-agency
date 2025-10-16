import macPng from "../../../public/mac.png";
import starSvg2 from "../../../public/roundstar.svg?url";
import bgrays from "../../../public/bgrays.png?url";
import hands from "../../../public/hands.png?url";
import lh from "../../../public/eh-split (1).png";
import rh from "../../../public/eh-split.png";
import social from "../../../public/social.png";
import start5 from "../../../public/5stars.png";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import ChatBubble from "@/components/ChatBubble";
import HeroCard, { type CardStatsItem } from "@/components/HeroCard";
import SectionLabel from "@/components/SectionLabel";
import RevealAnimation from "@/components/ui/animationReveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const CardStatsData: CardStatsItem[] = [
  {
    top: ["https://www.shutterstock.com/image-photo/close-head-shot-portrait-preppy-600nw-1433809418.jpg", hands],
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
    alignmentCss: "35% 50%",
  },
  {
    top: [social, starSvg2],
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
    alignmentCss: "100% 20%",
  },
  {
    top: [social, starSvg2],
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
    alignmentCss: "100% 80%",
  },
];
const GridScore = () => {
  useGSAP(() => {
    gsap.from(".handds", {
      opacity: 1,
      ease: "power4.out",
      x: (x) => (x === 0 ? -100 : 100),
      scrollTrigger: {
        trigger: ".container",
        start: `top top`,
        end: "30% top",
        scrub: 5,
      },
    });
  });
  return (
    <div className="w-screen min-h-screen p-2 bg-white relative py-20">
      <SectionLabel text="Score" />
      <div className="text-center mb-20">
        <RevealAnimation blurAmount={20} yPercent={0}>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Success Score</h1>
        </RevealAnimation>

        <RevealAnimation className="overflow-hidden">
          <p className="text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
            Each frame tells a story, capturing genuine moments that showcase my style and vision. Browse through my
            favorite projects.
          </p>
        </RevealAnimation>
      </div>
      <div className="container max-w-5xl  mx-auto">
        <div className="top-left relative overflow-hidden">
          <div className="relative z-10 inner-grid w-full h-full flex flex-col justify-center items-center">
            <img src={starSvg2} className="size-30 absolute brightness-110 top-10 right-12 rotate-0" alt="" />
            <h1
              style={{ filter: "drop-shadow(1px -1px 10px skyblue)" }}
              className="c-text text-9xl font-black w-fit h-fit leading-none"
            >
              300
            </h1>
            <h4 className="text-3xl tracking-tight font-semibold">Projects Completed</h4>
          </div>
          <div className="absolute -z-0 bottom-0 left-0 size-full">
            <img src={bgrays} className="size-full" alt="" />
          </div>
        </div>

        <div className="top-right overflow-hidden">
          <div className="inner-grid w-full h-full relative ">
            <img
              src={macPng}
              style={{ filter: "drop-shadow(0px -1px 20px black)" }}
              className=" size-[100%] absolute  top-6 -right-24  object-contain rotate-0"
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
            <div className="size-full flex">
              <img src={rh} className="h-full w-[50%] handds" alt="" />
              <img src={lh} className="h-full w-[50%] handds" alt="" />
            </div>
            {/* <img
              src={hands}
              className="size-[100%] bottom-0 mt-1 hue-rotate-15 brightness-90 relative  object-cover rotate-0"
              alt=""
            /> */}
            <h4 className="absolute text-center bottom-8 font-bold  text-3xl w-full">
              We <br /> DELIVERED
            </h4>
          </div>
        </div>
        <div className="bottom-left overflow-hidden">
          <div className="inner-grid w-full h-full ">
            <div className="absolute px-3 top-10 left-0 w-full flex justify-center ">
              <ChatBubble />
            </div>
            <img
              src={social}
              className="h-[45%] w-[100%] bottom-0 mt-48 brightness-95 relative  object-cover"
              alt=""
              style={{ maskImage: "linear-gradient(to top , transparent 10%, black , transparent )" }}
            />
            <h4 className="absolute z-10 px-8 text-left bottom-8 font-semibold text-3xl w-full">
              Platform handled by our Agency
            </h4>
            <div className="radial-blur-v size-50 absolute bottom-0  -right-20 z-0 blur-xl "></div>
          </div>
        </div>

        <div className="bottom relative">
          <div className="inner-grid w-full h-full relative ">
            <img src={start5} className="absolute h-[20%] w-[100%] top-6  object-contain" alt="" />
            <h1 className="absolute z-10  bottom-34 text-5xl font-bold text-center w-full">
              120<sup className="absolute top-1.5">+</sup>{" "}
            </h1>
            <h4 className="absolute z-10 px-8 bottom-28 text-xl text-center w-full">Clients Satisfied</h4>
            <div className="size-full flex  items-end py-8 justify-center  w-full">
              <AnimatedTooltip className="border-none" items={people} />
            </div>
          </div>
        </div>
        <div className="bottom-right relative">
          <div className="inner-grid w-full h-full relative overflow-hidden">
            <div className="absolute top-0 grid grid-cols-2 w-full h-[40%] gap-2 z-10">
              {CardStatsData.map((card, index) => (
                <HeroCard key={index + "grid"} card={card} />
              ))}
            </div>
            <h4 className="absolute px-8 z-10  bottom-8 tracking-tighter leading-none  text-5xl w-full">
              Our work speaks more than us
            </h4>
            <div className="radial-blur-v size-50 absolute bottom-0  right-0 z-0 blur-xl "></div>
            <div className="radial-blur-b size-[20rem] absolute top-0  -left-20 z-0 blur-xl "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridScore;

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];
