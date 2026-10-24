import AuroraFlair from "@/components/AuroraFlair";
import Balloons from "@/components/Balloons";
import HeroCard, { type CardStatsItem } from "@/components/HeroCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { aboutLogo, cloud, fb, reel, short } from "@/assets/Image";
import { A_dp, N_dp, T_dp } from "@/assets/ClientImage";

const Icons = [{ src: fb }, { src: fb }, { src: short }, { src: short }, { src: reel }, { src: reel }, { src: short }, { src: short }];
const CardStatsData: CardStatsItem[] = [
  {
    top: [T_dp, short],
    bottom: [
      {
        label: "DeLauer",
        value: "Thomas",
      },
      {
        label: "Subscribers",
        value: "4M",
      },
    ],
    heroCard: true,
    animation: true,
    alignmentCss: window.innerWidth < 600 ? "40% 20%" : "30% 15%",
  },
  {
    top: [N_dp, short],
    bottom: [
      {
        label: "Norwitz",
        value: "Nick",
      },
      {
        label: "Subscribers",
        value: "1M",
      },
    ],
    heroCard: true,
    animation: true,
    alignmentCss: window.innerWidth < 600 ? "40% 80%" : "30% 85%",
  },
  {
    top: [A_dp, reel],
    bottom: [
      {
        label: "Koutnik",
        value: "Andrew",
      },
      {
        label: "followers",
        value: "100k",
      },
    ],
    heroCard: true,
    animation: true,
    alignmentCss: window.innerWidth < 600 ? "72% 50%" : "60% 50%",
  },
];
const Hero = () => {
  const heroRef = useRef(null);
  const heroTlRef = useRef<GSAPTimeline>(null);

  useGSAP(
    () => {
      gsap.from(".center", {
        rotationZ: -360,
        duration: 50,
        repeat: -1,
        ease: "none",
        delay: 1,
        repeatRefresh: true,
      });

      gsap.to(".hero-card", {
        y: "20px",
        yoyo: true,
        repeat: -1,
        duration: 1,
        stagger: 0.4,
        delay: 2,
      });

      return () => {
        heroTlRef.current?.kill();
      };
    },
    {
      dependencies: [],
    },
  );

  return (
    <section ref={heroRef} id="hero-section" className="w-screen h-[clamp(700px,100vh,800px)] relative top-0 overflow-hidden">
      <div className="h-full w-full bg-background absolute top-0 z-0 hero-bg-mask"></div>
      <div className="absolute clouds top-5 left-1/3 z-0">
        <img src={cloud} width={300} height={200} alt="" loading="lazy" />
      </div>
      <div className="absolute clouds top-32 left-2/4 z-20">
        <img src={cloud} width={300} height={200} alt="" loading="lazy" />
      </div>
      <Balloons />

      <div className="absolute text-container flex flex-col items-center gap-3 sm:gap-4 md:gap-5 z-40 w-full max-w-[90vw] sm:max-w-xl md:max-w-3xl lg:max-w-4xl px-2 sm:px-6 md:px-0">
        {/* Hero heading */}
        {/* Glassmorphism badge */}
        <div className="hero-anime flex items-center gap-1.5 whitespace-nowrap sm:gap-2 border border-background rounded-full  bg-white/80 uppercase px-3 sm:px-2 py-1 sm:py-1.5 backdrop-blur-sm">
          <span className="h-6 w-6">
            <img src={aboutLogo} alt="" loading="lazy" />
          </span>
          <p className="text-sm text-foreground text-bold w-78 leading-snug ">
            The Content Agency for <TypeClip />
          </p>
        </div>
        <h1 className="hero-anime text-3xl sm:text-4xl md:text-4xl lg:text-7xl hero-main-text text-center leading-tighter text-foreground">
          We Turn Science <br /> Into <p className="inline text-primary">Influence.</p>
        </h1>

        {/* CTA Buttons */}
        <div className="hero-anime flex items-center justify-center gap-3 sm:gap-4 mt-6">
          <AuroraFlair className="relative cursor-pointer overflow-hidden rounded-full border border-primary/80  bg-primary/80 text-white px-6 py-2.5 text-base font-light shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97]">
            <p className="relative z-10 flex items-center rounded-full">View Work</p>
          </AuroraFlair>
          <AuroraFlair className="relative cursor-pointer tracking-tight overflow-hidden rounded-full border border-white/80 bg-white/80 px-6 py-2.5 text-base font-light shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]">
            <p className="relative z-10 flex items-center ">Contact Us → </p>
          </AuroraFlair>
        </div>
      </div>

      <div className="absolute h-screen w-screen top-40 md:top-0 center-con">
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
                    className="flex bg-background items-center justify-center size-14 border-2 border-white rounded-lg backdrop-blur-sm"
                  >
                    <img src={icon1.src} className="w-6 h-6" alt="" loading="lazy" />
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
                    <img src={icon2.src} className="w-6 h-6" alt="" loading="lazy" />
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

const WORDS = ["Health Experts", "Researchers", "Doctors", "Scientists", "Physician"];

function TypeClip() {
  const wrapRef = useRef<any>(null);
  const textRef = useRef<any>(null);
  const caretRef = useRef<any>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current!;
      const text = textRef.current!;

      gsap.set(wrap, { "--p": 0 });

      // caret blink
      gsap.to(caretRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });

      const tl = gsap.timeline({ repeat: -1, delay: 3 });

      WORDS.forEach((word) => {
        tl.call(() => {
          text.textContent = word; // swapped while width is 0%, so nothing is visible
        })
          // slow "typing" reveal
          .to(wrap, {
            "--p": 1,
            duration: word.length * 0.09,
            ease: "none", // use `steps(${word.length})` for a char-by-char feel
          })
          // hold
          .to(wrap, { "--p": 1, duration: 1.4 })
          // fast delete
          .to(wrap, { "--p": 0, duration: 0.35, ease: "power3.in" })
          .to(wrap, { duration: 0.15 });
      });
    },
    { scope: wrapRef },
  );

  return (
    <p ref={wrapRef} className="relative inline-block align-bottom">
      <p ref={textRef} className="inline-block" style={{ clipPath: "inset(0 calc((1 - var(--p)) * 100%) 0 0)" }}>
        {WORDS[0]}
      </p>
      <p ref={caretRef} className="absolute top-[10%] bottom-[10%] w-[2px] bg-foreground" style={{ left: "calc(var(--p) * 100%)" }} />
    </p>
  );
}
