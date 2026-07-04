import Balloons from "@/components/Balloons";
import HeroCard, { type CardStatsItem } from "@/components/HeroCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import TypingLoop from "@/components/TypingEffect";
import { Andrew, Nick, Thomas } from "@/assets/ClientImage";
import { cloud, fb, reel, short } from "@/assets/Image";

const Icons = [{ src: fb }, { src: fb }, { src: short }, { src: short }, { src: reel }, { src: reel }, { src: short }, { src: short }];
export const CardStatsData: CardStatsItem[] = [
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
    alignmentCss: window.innerWidth < 600 ? "40% 20%" : "30% 15%",
  },
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
    alignmentCss: window.innerWidth < 600 ? "40% 80%" : "30% 85%",
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
    alignmentCss: window.innerWidth < 600 ? "72% 50%" : "60% 50%",
  },
];
const Hero = () => {
  const heroTlRef = useRef<GSAPTimeline>(null);

  useGSAP(() => {
    let splitInstance: ReturnType<typeof SplitText.create> | null = null;

    gsap.from(".center", {
      rotationZ: -360,
      duration: 50,
      repeat: -1,
      ease: "none",
      delay: 3,
    });

    gsap.to(".hero-card", {
      y: "20px",
      yoyo: true,
      repeat: -1,
      duration: 1,
      stagger: 0.4,
      delay: 3,
    });

    splitInstance = SplitText.create(".hero-h1");
    const { words } = splitInstance.split({ type: "words,lines", mask: "words" });

    heroTlRef.current = gsap.timeline({
      defaults: { ease: "power4.out" },
    });
    const tl = heroTlRef.current;
    tl.from(words, {
      yPercent: 100,
      ease: "power4.out",
      opacity: 0,
      stagger: 0.1,
    });
  });

  return (
    <section id="hero-section" className="w-screen h-[clamp(700px,100vh,800px)] relative top-0 overflow-hidden">
      <div className="h-full w-full bg-background absolute top-0 z-0 hero-bg-mask"></div>
      <div className="absolute clouds top-5 left-1/3 z-0">
        <img src={cloud} width={300} height={200} alt="" />
      </div>
      <div className="absolute clouds top-32 left-2/4 z-20">
        <img src={cloud} width={300} height={200} alt="" />
      </div>
      <Balloons />

      <div className="absolute top-64! text-container text-5xl">
        <h4 className="font-sans hero-h1 text-xl leading-none">We do</h4>
        <TypingLoop prefix="We Do" words={["Video Editing", "Color Grading", "Motion Graphics", "Cinematic Reels"]} />
      </div>

      <div className="absolute h-[80vh] w-screen top-40 md:top-0 center-con">
        <div className="center  relative flex items-center w-[30vw] shrink-0 aspect-square justify-center border-2 border-white  rounded-full overflow-visible pointer-events-none">
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
                    className="flex bg-background items-center justify-center size-14 border-2 border-white rounded-lg backdrop"
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
                    className="flex bg-background items-center justify-center size-14 border-2 border-white rounded-lg backdrop"
                  >
                    <img src={icon2.src} className="w-6 h-6" alt="" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-[clamp(300px,100vw,1200px)] card-center h-80 relative">
        {CardStatsData.map((card, index) => (
          <HeroCard key={index + "hero"} card={card} id={"hero-card"} />
        ))}
      </div>
    </section>
  );
};

export default Hero;
