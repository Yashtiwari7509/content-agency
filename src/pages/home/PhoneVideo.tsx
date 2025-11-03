import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "@/components/model/I17";
import { Environment } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import SectionLabel from "@/components/SectionLabel";

const PhoneVideo = () => {
  const fixedVideoRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

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
        start: "center top",
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
      end: () => "+=" + window.innerHeight * 4,
      scrub: true,
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
      // markers: true,
    });
  });

  return (
    <>
      <div ref={fixedVideoRef} id="video-page" className="w-screen  bg-white h-screen relative overflow-x-hidden">
        <div className="text-center  absolute mx-auto left-[50%] -translate-x-1/2 -translate-y-1/2  top-50">
          <SectionLabel text="Top Works" />
          <h1 className="text-3xl md:text-3xl font-bold text-gray-900 relative">Trending one's
            <video className="w-[60rem] h-[30rem] -z-10 object-cover bg-amber-200 absolute  -top-[13.8rem] -right-[14rem]" muted autoPlay loop playsInline src="./wave.mp4"></video>
          </h1>
          {/* <p className="text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
            Why businesses trust us? Read genuine feedback from our satisfied clients who have experienced
            transformative results.
          </p> */}
        </div>
        {/* Fixed text container */}
        <div className="max-w-5xl t-center mx-auto h-screen top-0 absolute flex justify-start items-start">
          <div className="absolute pl-[2vw] t-center rounded-2xl bg-transparent backdrop-blur-x  pr-[22vw]  h-[50%] flex justify-start md:justify-center  items-start flex-col">
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
          dpr={1}
          camera={{ position: [0, 0, 10], fov: 10 }}
          shadows={false}
          frameloop="always"
        >
          <Model />
          <Environment preset="dawn" />
          {/* <OrbitControls /> */}
        </Canvas>
      </div>

      <div id="ndPage" className="w-screen h-screen relative pointer-events-none"></div>

      <div className="w-screen h-screen relative pointer-events-none"></div>
      <div className="w-screen h-screen relative pointer-events-none"></div>
      <div id="lastPage" className="w-screen h-screen relative pointer-events-none"></div>
    </>
  );
};

export default PhoneVideo;
