import { cloud, gradient } from "@/assets/Image";
import { cn } from "@/lib/utils";
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
    // gsap.to(".rotate-image2", {
    //   rotateX: 180,
    //   transformOrigin: "top top",
    //   scrollTrigger: {
    //     trigger: ".pin-about",
    //     start: "center top",
    //     end: "+=1000",
    //     scrub: 0.3,
    //     // markers: true,
    //   },
    // });
    // gsap.from(".rotate-image", {
    //   rotateX: -180,
    //   transformOrigin: "bottom bottom",
    //   scrollTrigger: {
    //     trigger: ".pin-about",
    //     start: "center top",
    //     end: "+=1000",
    //     scrub: 0.3,
    //   },
    // });
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
      <div className="w-screen h-screen absolute top-0 -z-10">
        <img src={gradient} className="w-full h-full rotate-image2 rotate-180" alt="" />
      </div>
      <section className="absolute w-full top-0 z-0 h-[70vh]">
        <div className="absolute clouds top-50 left-1/3 z-0">
          <img src={cloud} width={300} height={200} alt="" />
        </div>
        <div className="absolute clouds top-30 left-2/4 z-0">
          <img src={cloud} width={300} height={200} alt="" />
        </div>
      </section>

      <div className="h-screen w-screen top-0 pin-about flex">
        {/* <div className="w-screen h-screen fixed">
          <img src={gradient} className="w-full h-full rotate-image" alt="" />
        </div> */}
        <div className="w-4xl mx-auto h-full relative">
          <div className="hero-wrap">
            <div className="glass-card">
              <div className="glare-mask">
                <div className="glare"></div>
              </div>
              <div className="content">
                <span className="badge">
                  <span className="icon-circle">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L4 5v6c0 5.25 3.4 9.74 8 11 4.6-1.26 8-5.75 8-11V5l-8-3z" fill="white" />
                      <path d="M12 8v8M8 12h8" stroke="#2f8ff0" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                  Healthcare Content Agency
                </span>

                <div className="title flex justify-center items-center">
                  <p className="the">The&nbsp;</p>
                  <p className="xpro">XPro</p>
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

                  <div className="divider"></div>

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

                  <div className="divider"></div>

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
                  <div className="divider"></div>

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

          <SvgText id="maskone" className="top-[20%] right-[10%] lg:-right-5 pointer-events-none z-20" textClass="right-15">
            <h1 className="text-4xl text-center overflow-hidden">
              <span className="text block">200</span>
            </h1>
            <h1 className="overflow-hidden">
              <span className="text block">Project Completed</span>
            </h1>
          </SvgText>

          <SvgText id="masktwo" className="top-[20%] left-[10%] lg:-left-5 z-20" textClass="rotate-75 h-fit w-fit left-15 lg:top-[150%]">
            <h1 className="text-4xl text-center overflow-hidden">
              <span className="text2 block">40+</span>
            </h1>
            <h1 className="overflow-hidden">
              <span className="text2 block">Channel Handling</span>
            </h1>
          </SvgText>

          <SvgText id="maskthree" className="bottom-[10%] right-[10%] lg:-right-5 z-20" textClass="right-15 -rotate-110 -top-[200%]">
            <h1 className="text-4xl text-center overflow-hidden">
              <span className="text3 block">4+</span>
            </h1>
            <h1 className="overflow-hidden">
              <span className="text3 block">Rated</span>
            </h1>
          </SvgText>
        </div>
      </div>
    </div>
  );
};

export default About;

const SvgText = ({
  className,
  id,
  textClass,
  children,
}: {
  className?: string;
  id: string;
  textClass?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn("absolute", className)}>
      <div className="w-fit">{children}</div>
      <div className={cn("absolute", textClass)}>
        <svg
          width="739"
          height="508"
          viewBox="0 0 739 508"
          className={cn("w-28 h-40 hidden lg:w-40 lg:block")}
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`grad${id}`} x1="0" y1="508" x2="739" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#24f4ffff" />
              <stop offset="40%" stopColor="#1a5fce" />
              <stop offset="75%" stopColor="#7df0ffff" />
              <stop offset="100%" stopColor="#0ffff3ff" />
            </linearGradient>
          </defs>
          <mask id={`mask${id}`} style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="739" height="508">
            <path
              d="M460.903 291.416C478.574 281.327 483.008 261.525 502.505 247.066C522.012 232.344 529.347 234.832 548.632 214.405C567.895 193.858 590.474 176.505 596.81 165.442C603.121 154.386 610.352 158.884 620.615 144.23C630.738 129.6 638.543 121.794 650.286 111.383C662.317 101.026 692.903 63.3741 699.632 47.0209C706.764 30.641 722.192 17.1762 729.716 7.52905C732.053 4.54658 734.097 2.30757 735.799 0.666507C736.52 -0.0286333 737.212 -0.13447 737.668 0.13989C737.668 0.140068 737.668 0.140247 737.669 0.140425C738.235 0.482417 738.433 1.41433 737.859 2.52444C735.07 7.91394 731.274 16.1538 727.611 26.3695C720.759 45.2589 715.298 44.7663 702.078 67.8952C688.46 91.1805 682.515 107.004 660.437 129.882C638.121 152.431 642.98 166.448 607.378 194.592C571.356 222.031 577.383 234.335 545.236 266.122C513.034 297.761 463.622 326.613 441.877 342.433C420.288 358.482 390.807 379.821 356.782 397.505C322.927 415.241 282.897 440.597 242.676 454.582C202.754 468.973 145.269 484.646 118.137 489.324C91.1202 494.157 84.5698 495.195 59.1544 502.236C44.7205 506.166 23.6402 508.921 5.79423 507.431C-2.94816 506.626 -1.25905 504.134 7.25511 502.084C19.958 498.995 30.6258 498.352 36.4388 494.385C48.6053 486.285 53.2702 483.115 70.1943 482.841C87.3711 482.395 92.6919 472.918 102.439 471.214C111.691 469.359 113.299 474.731 158.928 455.781C204.416 436.182 228.29 424.146 244.887 415.847C261.595 407.482 298.155 394.05 323.945 377.889C349.946 362.314 402.699 330.261 421.343 313.665C440.261 297.242 443.034 301.458 460.903 291.416Z"
              fill="white"
            />
          </mask>
          <g mask={`url(#mask${id})`}>
            <path
              id={`${id}`}
              d="M0.0847168 506.09C152.918 491.59 514.385 370.09 737.585 0.0898361"
              stroke={`url(#grad${id})`}
              strokeWidth="49"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};
