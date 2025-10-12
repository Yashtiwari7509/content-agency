import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "@/components/model/I17";
import { Environment, OrbitControls } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { Bubbles } from "lucide-react";
import Balloons from "@/components/Balloons";

const PhoneVideo = () => {
  const tlRef = useRef<GSAPTimeline>(null);
  const fixedVideoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap
      .timeline({
        paused: true,
        defaults: { ease: "power1.out", duration: 0.3 },
      })
      .from("#text1 p", { yPercent: 100 })
      .from("#text2 p", { yPercent: 100 })
      .from("#para", {
        opacity: 0,
      });

    const tl1 = gsap
      .timeline({
        paused: true,
        defaults: { ease: "power1.out", duration: 0.3 },
      })
      .from("#text3 p", { yPercent: 100 })
      .from("#text4 p", { yPercent: 100 })
      .from("#para1", {
        opacity: 0,
      });

    tlRef.current = tl;
    tlRef.current = tl1;

    ScrollTrigger.create({
      trigger: fixedVideoRef.current,
      start: "top top",
      end: () => "+=" + window.innerHeight * 4,
      scrub: 2,
      pin: true,
      // markers: true,
      pinSpacing: false,
      anticipatePin: 1,
      // snap: 1 / 5,
    });

    ScrollTrigger.create({
      trigger: "#canvas",
      start: "center top",
      end: "bottom top",
      onEnter: () => tl.play(),
      onEnterBack: () => tl.play(),
      onLeaveBack: () => tl.reverse(),
      onLeave: () => tl.reverse(),
      // markers: true,
    });

    ScrollTrigger.create({
      trigger: "#ndPage",
      start: "center top",
      end: "bottom top",
      onEnterBack: () => tl1.play(),
      onLeaveBack: () => tl1.reverse(),
      onEnter: () => tl1.play(),
      onLeave: () => tl1.reverse(),
    });
  });

  return (
    <>
      <div ref={fixedVideoRef} id="video-page" className="w-screen h-screen relative overflow-hidden">
        {/* Fixed text container */}
        <div className="min-w-5xl t-center mx-auto h-screen top-0 absolute flex justify-start items-start ">
          {/* <Balloons/> */}
          <div className="absolute pl-[2vw] t-center rounded-2xl border bg-transparent backdrop-blur-xs inset-shadow-sm  pr-[22vw]  h-[50%] flex justify-center items-start flex-col">
            <h3 id="text1" className="text-4xl overflow-hidden md:text-6xl  whitespace-nowrap font-bold text-center">
              <p>Words that work</p>
            </h3>
            {/* <h3
              id="text2"
              className="text-4xl md:text-6xl overflow-hidden  whitespace-nowrap font-bold left-0 right-0 text-center"
            >
              <p>Stories that sell</p>
            </h3> */}
            <p id="para" className="mt-5">
              We craft copy that connects, content that converts, and ideas that inspire. Bold, clear, and made for
              impact.
            </p>
          </div>
          <div className="absolute px-[8vw] pr-[22vw] h-screen flex justify-center items-start flex-col">
            <h3
              id="text3"
              className="text-4xl leading-20 overflow-hidden md:text-6xl  whitespace-nowrap font-bold text-center"
            >
              <p>Create. Engage.</p>
            </h3>
            {/* <h3
              id="text4"
              className="text-4xl md:text-6xl overflow-hidden leading-none whitespace-nowrap font-bold left-0 right-0 text-center"
            >
              <p>Grow with content</p>
            </h3> */}
            <p id="para1" className="mt-5">
              From brand voice to campaigns, we turn ideas into influence. Sharp strategy, smart storytelling, and
              results that last.
            </p>
          </div>
        </div>
        <Canvas
          id="canvas"
          className="w-screen absolute top-0 h-screen !pointer-events-auto  z-[999]"
          dpr={1}
          camera={{ position: [0, 0, 10], fov: 10 }}
        >
          <Model scale={3} />
          <Environment preset="city" />
        </Canvas>
      </div>

      <div id="ndPage" className="w-screen h-screen relative pointer-events-none"></div>

      <div className="w-screen h-screen relative pointer-events-none"></div>
      <div className="w-screen h-screen relative pointer-events-none"></div>
      <div className="w-screen h-screen relative pointer-events-none"></div>
    </>
  );
};

export default PhoneVideo;
