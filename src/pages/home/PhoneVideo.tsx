import { useRef } from "react";
import { Canvas, invalidate } from "@react-three/fiber";
import { Model } from "@/components/model/I17";
import { Environment } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import SectionLabel from "@/components/SectionLabel";
import * as THREE from "three";

const PhoneVideo = () => {
  const fixedVideoRef = useRef(null);
  useGSAP(() => {
    // gsap.registerPlugin(ScrollTrigger);
    const tickerCallback = () => invalidate();
    gsap.ticker.add(tickerCallback);

    // DRY: Animation configuration
    const animations = [
      {
        textId: "#text1 p",
        paraId: "#para p",
        trigger: "#canvas",
      },
      {
        textId: "#text3 p",
        paraId: "#para1 p",
        trigger: "#ndPage",
      },
    ];

    // Create timelines dynamically
    animations.forEach(({ textId, paraId, trigger }) => {
      const tl = gsap
        .timeline({
          paused: true,
          defaults: { ease: "power1.out", duration: 0.3 },
        })
        .from(textId, { yPercent: 100 })
        .from(paraId, { yPercent: -200 }, "<");

      ScrollTrigger.create({
        trigger,
        start: "10% top",
        end: "bottom top",
        onEnter: () => tl.play(),
        onEnterBack: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
        onLeave: () => tl.reverse(),
      });
    });

    // Pin ScrollTrigger
    ScrollTrigger.create({
      trigger: fixedVideoRef.current,
      start: "top top",
      end: () => "+=" + window.innerHeight * 2,
      scrub: true,
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
      onUpdate: () => {
        invalidate();
      },
      // markers: true,
    });
    return () => {
      gsap.ticker.remove(tickerCallback);
    };
  });

  return (
    <>
      <div ref={fixedVideoRef} id="video-page" className="w-screen  bg-white h-screen relative overflow-hidden">
        <div className="text-center  absolute mx-auto left-[50%] -translate-x-1/2 -translate-y-1/2  top-44">
          <SectionLabel text="Top Works" />
          <h1 className="text-3xl md:text-3xl font-bold whitespace-nowrap text-gray-900 relative">
            Trending one's
            <div className=" w-fit h-fit border">
              <video
                className="w-[60rem] h-[30rem] audio-mask -z-10 object-cover rotate-90 -top-20 md:rotate-0  absolute  md:-top-[13.8rem] md:-right-[14rem]"
                muted
                autoPlay
                loop
                playsInline
                src="./wave.mp4"
              />
            </div>
          </h1>
        </div>
        {/* Fixed text container */}
        <div className="max-w-5xl t-center mx-auto  h-screen hidden lg:block absolute">
          <div className="absolute pl-[2vw] t-center top-60  rounded-2xl  backdrop-blur-x  pr-[22vw]  h-[50%] flex justify-start md:justify-center  items-start flex-col">
            <h3 id="text1" className="text-4xl  overflow-hidden md:text-6xl  whitespace-nowrap font-bold text-center">
              <p>Words that work</p>
            </h3>
            <h3 id="para" className="overflow-hidden">
              <p className="mt-5">
                We craft copy that connects, content that converts, and ideas that inspire. Bold, clear, and made for
                impact.
              </p>
            </h3>
          </div>
          <div className="absolute pl-[2vw] t-center rounded-2xl bg-transparent   pr-[22vw]  h-[50%] flex justify-start md:justify-center  items-start flex-col">
            <h3
              id="text3"
              className="text-4xl leading-20 overflow-hidden md:text-6xl  whitespace-nowrap font-bold text-center"
            >
              <p>Create. Engage.</p>
            </h3>
            <h3 id="para1" className="overflow-hidden">
              <p className="mt-5">
                From brand voice to campaigns, we turn ideas into influence. Sharp strategy, smart storytelling, and
                results that last.
              </p>
            </h3>
          </div>
        </div>
        <Canvas
          id="canvas"
          className="w-screen absolute top-0 h-screen !pointer-events-auto  z-[999]"
          dpr={[1,1.5]}
          camera={{ position: [0, 0, 10], fov: 10 }}
          shadows={false}
          gl={{
            // antialias: false,
            toneMapping: THREE.NoToneMapping,
            // outputColorSpace: THREE.LinearSRGBColorSpace,
          }}
          frameloop="demand"
        >
          <Model />
          <Environment preset="dawn" resolution={126} />;
        </Canvas>
      </div>

      <div id="ndPage" className="w-screen h-screen relative pointer-events-none"></div>

      {/* <div className="w-screen h-screen relative pointer-events-none"></div>
      <div className="w-screen h-screen relative pointer-events-none"></div> */}
      <div id="lastPage" className="w-screen h-screen relative pointer-events-none"></div>
    </>
  );
};

export default PhoneVideo;
