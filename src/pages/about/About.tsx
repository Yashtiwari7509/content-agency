import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import { useLenis } from "lenis/react";
// import { SplitText } from "gsap/SplitText";
import { useEffect, useRef } from "react";
// import { useRef } from "react";
gsap.registerPlugin(DrawSVGPlugin);

const About = () => {
  const heroTlRef = useRef<GSAPTimeline>(null);
  const lenis = useLenis();
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [lenis]);
  useGSAP(() => {
    // const textLine = SplitText.create(".hero-h1");
    // const { words } = textLine.split({ type: "words" });

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
    })
      .from(
        "#about-text",
        {
          duration: 3,

          filter: "blur(30px)",
          ease: "power4.out",
        },
        "<"
      )
      .from(
        ".center",
        {
          opacity: 0,
          scale: 0,
          duration: 3,
        },
        "-=3"
      );
  }, []);

  useGSAP(() => {
    const tl1 = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
      scrollTrigger: { trigger: "#next", start: "-100% top", end: "top top", scrub: 1 },
    });
    tl1
      .from("#maskone", {
        drawSVG: "0%",
        duration: 2,
      })
      .from(".text", { yPercent: 100, duration: 3 })
      .from("#masktwo", {
        drawSVG: "100% 100%",
        duration: 2,
      })
      .from(".text3", { yPercent: 100, duration: 3 })
      .from("#maskthree", {
        drawSVG: "0%",
        duration: 2,
      })
      .from(".text2", { yPercent: 100, duration: 3 });
  }, []);
  return (
    <div className="relative w-screen h-[200vh]">
      <section className="absolute w-full top-0 z-0 h-[70vh] bg-background hero-bg-mask ">
        <div className="absolute clouds top-50 left-1/3 z-0">
          <img src="./img.png" width={300} height={200} alt="" />
        </div>
        <div className="absolute clouds top-30 left-2/4 z-0">
          <img src="./img.png" width={300} height={200} alt="" />
        </div>
      </section>
      <div className="w-screen h-screen sticky top-0 ">
        <div className="w-full h-full relative  ">
          <div
            id="about-text"
            className="px-20 py-10 md:py-15 t-center border-white overflow-hidden  border backdrop-blur-sm rounded-full relative flex justify-center items-center"
          >
            <h1 className="text-4xl md:text-7xl text-zinc-800  whitespace-nowrap font-black ">
              The Xpro
              <img
                id="ball"
                src="./b.png"
                className="size-36 scale-[4] brightness-125 animate-spin animation-duration-[20s] blur-[2px] opacity-70 rotate-45 aspect-square absolute right-36 top-20 z-[-1]"
                alt=""
              />
            </h1>
            <h1 className="px-10 md:px-20 py-2  bottom-0 text-white  z-10 text-xs md:text-lg  bg-black absolute ">
              Agency
            </h1>
          </div>
          <SvgText
            id="masktwo"
            className="top-[25%] left-[10%] lg:left-[21%]"
            textClass="rotate-75  h-fit w-fit left-15 lg:top-[150%] "
          >
            <h1 className="text-4xl text-center overflow-hidden">
              <span className="text2 block">40+</span>
            </h1>
            <h1 className="overflow-hidden">
              <span className="text2 block">Channel Handling</span>
            </h1>
          </SvgText>
          <SvgText id="maskone" className="top-[20%] right-[10%] lg:right-[19%]" textClass="right-15">
            <h1 className="text-4xl  text-center overflow-hidden">
              <span className="text block">200</span>
            </h1>
            <h1 className="overflow-hidden">
              <span className="text block">Project Completed</span>
            </h1>
          </SvgText>
          <SvgText id="maskthree" className="bottom-[20%] right-[10%] lg:right-[19%]" textClass="right-15 -rotate-110 -top-[200%]">
            <h1 className="text-4xl  text-center overflow-hidden">
              <span className="text3 block">4+</span>
            </h1>
            <h1 className="overflow-hidden">
              <span className="text3 block">Rated</span>
            </h1>
          </SvgText>
        </div>
      </div>
      <div id="next" className="w-screen h-screen relative"></div>
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
      <div className="w-fit ">
        {children} {/* 👈 Render whatever is passed */}
      </div>
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
          <mask
            id={`mask${id}`}
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="739"
            height="508"
          >
            <path
              d="M460.903 291.416C478.574 281.327 483.008 261.525 502.505 247.066C522.012 232.344 529.347 234.832 548.632 214.405C567.895 193.858 590.474 176.505 596.81 165.442C603.121 154.386 610.352 158.884 620.615 144.23C630.738 129.6 638.543 121.794 650.286 111.383C662.317 101.026 692.903 63.3741 699.632 47.0209C706.764 30.641 722.192 17.1762 729.716 7.52905C732.053 4.54658 734.097 2.30757 735.799 0.666507C736.52 -0.0286333 737.212 -0.13447 737.668 0.13989C737.668 0.140068 737.668 0.140247 737.669 0.140425C738.235 0.482417 738.433 1.41433 737.859 2.52444C735.07 7.91394 731.274 16.1538 727.611 26.3695C720.759 45.2589 715.298 44.7663 702.078 67.8952C688.46 91.1805 682.515 107.004 660.437 129.882C638.121 152.431 642.98 166.448 607.378 194.592C571.356 222.031 577.383 234.335 545.236 266.122C513.034 297.761 463.622 326.613 441.877 342.433C420.288 358.482 390.807 379.821 356.782 397.505C322.927 415.241 282.897 440.597 242.676 454.582C202.754 468.973 145.269 484.646 118.137 489.324C91.1202 494.157 84.5698 495.195 59.1544 502.236C44.7205 506.166 23.6402 508.921 5.79423 507.431C-2.94816 506.626 -1.25905 504.134 7.25511 502.084C19.958 498.995 30.6258 498.352 36.4388 494.385C48.6053 486.285 53.2702 483.115 70.1943 482.841C87.3711 482.395 92.6919 472.918 102.439 471.214C111.691 469.359 113.299 474.731 158.928 455.781C204.416 436.182 228.29 424.146 244.887 415.847C261.595 407.482 298.155 394.05 323.945 377.889C349.946 362.314 402.699 330.261 421.343 313.665C440.261 297.242 443.034 301.458 460.903 291.416Z"
              fill="white" // 👈 important!
            />
          </mask>
          <g mask={`url(#mask${id})`}>
            <path
              id={`${id}`}
              d="M0.0847168 506.09C152.918 491.59 514.385 370.09 737.585 0.0898361"
              stroke="black"
              strokeWidth="49"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

// export { SvgText };

{
  /* <div className="top-[25%] right-[20%] absolute">
            <div className="w-fit h-fit">
              <h1 className="text-4xl text-center overflow-hidden">
                <span className="text block">200</span>
              </h1>
              <h1 className="overflow-hidden">
                <span className="text block">Project Completed</span>
              </h1>
            </div>
            <div className="absolute -left-20">
              <svg
                width="739"
                height="508"
                viewBox="0 0 739 508"
                className="w-40 h-auto"
                preserveAspectRatio="xMidYMid meet"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask1"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="739"
                  height="508"
                >
                  <path
                    d="M460.903 291.416C478.574 281.327 483.008 261.525 502.505 247.066C522.012 232.344 529.347 234.832 548.632 214.405C567.895 193.858 590.474 176.505 596.81 165.442C603.121 154.386 610.352 158.884 620.615 144.23C630.738 129.6 638.543 121.794 650.286 111.383C662.317 101.026 692.903 63.3741 699.632 47.0209C706.764 30.641 722.192 17.1762 729.716 7.52905C732.053 4.54658 734.097 2.30757 735.799 0.666507C736.52 -0.0286333 737.212 -0.13447 737.668 0.13989C737.668 0.140068 737.668 0.140247 737.669 0.140425C738.235 0.482417 738.433 1.41433 737.859 2.52444C735.07 7.91394 731.274 16.1538 727.611 26.3695C720.759 45.2589 715.298 44.7663 702.078 67.8952C688.46 91.1805 682.515 107.004 660.437 129.882C638.121 152.431 642.98 166.448 607.378 194.592C571.356 222.031 577.383 234.335 545.236 266.122C513.034 297.761 463.622 326.613 441.877 342.433C420.288 358.482 390.807 379.821 356.782 397.505C322.927 415.241 282.897 440.597 242.676 454.582C202.754 468.973 145.269 484.646 118.137 489.324C91.1202 494.157 84.5698 495.195 59.1544 502.236C44.7205 506.166 23.6402 508.921 5.79423 507.431C-2.94816 506.626 -1.25905 504.134 7.25511 502.084C19.958 498.995 30.6258 498.352 36.4388 494.385C48.6053 486.285 53.2702 483.115 70.1943 482.841C87.3711 482.395 92.6919 472.918 102.439 471.214C111.691 469.359 113.299 474.731 158.928 455.781C204.416 436.182 228.29 424.146 244.887 415.847C261.595 407.482 298.155 394.05 323.945 377.889C349.946 362.314 402.699 330.261 421.343 313.665C440.261 297.242 443.034 301.458 460.903 291.416Z"
                    fill="white" // 👈 important!
                  />
                </mask>
                <g mask="url(#mask1)">
                  <path
                    id="masked-line"
                    d="M0.0847168 506.09C152.918 491.59 514.385 370.09 737.585 0.0898361"
                    stroke="black"
                    strokeWidth="49"
                  />
                </g>
              </svg>
            </div>
          </div> */
}
{
  /* <div className="top-[25%] left-[20%] absolute">
            <div className="w-fit h-fit">
              <h1 className="text-4xl text-center overflow-hidden">
                <span className="text block">200</span>
              </h1>
              <h1 className="overflow-hidden">
                <span className="text block">Project Completed</span>
              </h1>
            </div>
            <div className="absolute -left-20">
              <svg
                width="739"
                height="508"
                viewBox="0 0 739 508"
                className="w-40 h-auto rotate-90"
                preserveAspectRatio="xMidYMid meet"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask1"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="739"
                  height="508"
                >
                  <path
                    d="M460.903 291.416C478.574 281.327 483.008 261.525 502.505 247.066C522.012 232.344 529.347 234.832 548.632 214.405C567.895 193.858 590.474 176.505 596.81 165.442C603.121 154.386 610.352 158.884 620.615 144.23C630.738 129.6 638.543 121.794 650.286 111.383C662.317 101.026 692.903 63.3741 699.632 47.0209C706.764 30.641 722.192 17.1762 729.716 7.52905C732.053 4.54658 734.097 2.30757 735.799 0.666507C736.52 -0.0286333 737.212 -0.13447 737.668 0.13989C737.668 0.140068 737.668 0.140247 737.669 0.140425C738.235 0.482417 738.433 1.41433 737.859 2.52444C735.07 7.91394 731.274 16.1538 727.611 26.3695C720.759 45.2589 715.298 44.7663 702.078 67.8952C688.46 91.1805 682.515 107.004 660.437 129.882C638.121 152.431 642.98 166.448 607.378 194.592C571.356 222.031 577.383 234.335 545.236 266.122C513.034 297.761 463.622 326.613 441.877 342.433C420.288 358.482 390.807 379.821 356.782 397.505C322.927 415.241 282.897 440.597 242.676 454.582C202.754 468.973 145.269 484.646 118.137 489.324C91.1202 494.157 84.5698 495.195 59.1544 502.236C44.7205 506.166 23.6402 508.921 5.79423 507.431C-2.94816 506.626 -1.25905 504.134 7.25511 502.084C19.958 498.995 30.6258 498.352 36.4388 494.385C48.6053 486.285 53.2702 483.115 70.1943 482.841C87.3711 482.395 92.6919 472.918 102.439 471.214C111.691 469.359 113.299 474.731 158.928 455.781C204.416 436.182 228.29 424.146 244.887 415.847C261.595 407.482 298.155 394.05 323.945 377.889C349.946 362.314 402.699 330.261 421.343 313.665C440.261 297.242 443.034 301.458 460.903 291.416Z"
                    fill="white" // 👈 important!
                  />
                </mask>
                <g mask="url(#mask1)">
                  <path
                    id="masked-line"
                    d="M0.0847168 506.09C152.918 491.59 514.385 370.09 737.585 0.0898361"
                    stroke="black"
                    strokeWidth="49"
                  />
                </g>
              </svg>
            </div>
          </div> */
}
