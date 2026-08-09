import { aboutLogo, cloud } from "@/assets/Image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import "./about.css";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

const About = () => {
  const heroTlRef = useRef<GSAPTimeline>(null);
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [lenis]);

  useEffect(() => {
    if (!lenis) return;
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
    };
  }, [lenis]);

  // --- Intro reveal (plays once on mount, not scroll-linked) ---------------
  useGSAP(() => {
    heroTlRef.current = gsap.timeline({
      defaults: { ease: "power4.out" },
    });
    const tl = heroTlRef.current;
    tl.from(".clouds", {
      filter: "blur(30px)",
      y: 500,
      ease: "power4.out",
      duration: 3,
      stagger: 0.2,
    }).from(
      ".center",
      {
        opacity: 0,
        scale: 0,
        duration: 3,
      },
      "-=3",
    );
  
  }, []);

  useGSAP(() => {
    const tl1 = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
      scrollTrigger: {
        trigger: ".pin-about",
        start: "top top",
        end: "+=2000",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl1
      .from("#maskone", { drawSVG: "0%", duration: 2 })
      .from(".text", { yPercent: 100, duration: 3 }, "-=1.4")
      .from("#masktwo", { drawSVG: "100% 100%", duration: 2 }, "-=1")
      .from(".text2", { yPercent: 100, duration: 3 }, "-=1.4")
      .from("#maskthree", { drawSVG: "100% 100%", duration: 2 }, "-=1")
      .from(".text3", { yPercent: 100, duration: 3 }, "-=1.4");
  });

  return (
    <div className="relative w-screen flex">
      <div className="w-full bg-background absolute top-0 z-0 hero-bg-mask h-[clamp(700px,100vh,800px)]"></div>
      <section className="absolute w-full top-0 z-0 h-[70vh]">
        <div className="absolute clouds top-50 left-1/3 z-0">
          <img src={cloud} width={300} height={200} alt="" />
        </div>
        <div className="absolute clouds top-30 left-2/4 z-0">
          <img src={cloud} width={300} height={200} alt="" />
        </div>
      </section>

      <div className="h-screen w-screen top-0 pin-about flex">
        <div className="w-4xl mx-auto h-full relative">
          <div className="hero-wrap">
            <div className="glass-card">
              <div className="glare-mask">
                <div className="glare"></div>
              </div>
              <div className="content">
                <span className="badge">
                  <span className="icon-circle">
                    <img src={aboutLogo} alt="" />
                  </span>
                  Healthcare Content Agency
                </span>

                <div className="title flex justify-center items-center">
                  <p className="the">The&nbsp; X</p>
                  <p className="xpro">Pro</p>
                </div>

                <p className="subtitle">
                  <b>#1</b> Content Agency
                  <br />
                  for Doctors &amp; Health Creators
                </p>

                <div className="stats-bar">
                  <div className="stat">
                    <span className="icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="13" r="8" stroke="#1c6fd6" strokeWidth="1.6" />
                        <path d="M12 9v4l3 2" stroke="#1c6fd6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 2h6" stroke="#1c6fd6" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </span>
                    <div>
                      <div className="number">48h</div>
                      <div className="label">First Draft</div>
                    </div>
                  </div>

                  <div className="stat">
                    <span className="icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 3l2.4 1.6 2.85-.3 1 2.7 2.55 1.4-.6 2.85 1.2 2.65-2.1 2 .1 2.85-2.75.75-1.6 2.4H9.3l-1.6-2.4-2.75-.75.1-2.85-2.1-2 1.2-2.65-.6-2.85 2.55-1.4 1-2.7 2.85.3L12 3z"
                          stroke="#1c6fd6"
                          strokeWidth="1.4"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.5 12.5l2.3 2.3 4.7-4.7"
                          stroke="#1c6fd6"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <div className="number">1000+</div>
                      <div className="label">Happy Clients</div>
                    </div>
                  </div>

                  <div className="stat">
                    <span className="icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M7 9a3 3 0 100 6 3 3 0 003-3c0-1.5.9-4 4-4a3 3 0 110 6 3 3 0 00-3 3 3 3 0 11-4-2.8"
                          stroke="#1c6fd6"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <div className="number">Unlimited</div>
                      <div className="label">Revisions</div>
                    </div>
                  </div>

                  <div className="stat">
                    <span className="icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path d="M12 3l1.4 4.2L18 9l-4.6 1.8L12 15l-1.4-4.2L6 9l4.6-1.8L12 3z" fill="#1c6fd6" />
                        <path d="M18.5 14l.7 2.1L21 17l-1.8.9-.7 2.1-.7-2.1L16 17l1.8-.9.7-2.1z" fill="#1c6fd6" />
                      </svg>
                    </span>
                    <div>
                      <div className="number">Premium</div>
                      <div className="label">Quality</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
