import { useRef } from "react";
import { Canvas, invalidate } from "@react-three/fiber";
import { Model } from "@/components/model/I17";
import { Environment } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import SectionLabel from "@/components/SectionLabel";
import { RocketIcon } from "lucide-react";

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
    window.innerWidth > 768 &&
      animations.forEach(({ textId, paraId, trigger }, i) => {
        const tl = gsap
          .timeline({
            paused: true,
            defaults: { ease: "power1.out", duration: 0.3 },
          })
          .from(textId, { yPercent: 100 })
          .from(paraId, { yPercent: -200 }, "<")
          .from(`#block${i + 1}stats`, { filter: "blur(10px)", opacity: 0 }, "<");

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
                src="./wave1.mp4"
              />
            </div>
          </h1>
        </div>
        {/* Fixed text container */}
        <InfoBlock
          id="block1"
          textId="text1"
          paraId="para"
          containerClass="top-60 backdrop-blur-x"
          title="Content that captivates"
          paragraph="We create scroll-stopping videos that build awareness, spark engagement, and turn audiences into loyal fans."
          stats={[
            { label: "Views", value: "12M+" },
            { label: "Engagement", value: "450K+" },
            { label: "Clients", value: "80+" },
          ]}
        />

        <InfoBlock
          id="block2"
          textId="text3"
          paraId="para1"
          containerClass=""
          title="Create. Connect. Convert."
          paragraph="From strategy to final edit, we craft videos that drive conversations, build communities, and deliver measurable results."
          stats={[
            { label: "Campaigns", value: "300+" },
            { label: "Brands", value: "100+" },
            { label: "Satisfaction", value: "99%" },
          ]}
        />

        <Canvas
          id="canvas"
          className="w-screen absolute top-0 h-screen !pointer-events-auto  z-[999]"
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 10], fov: 10 }}
          shadows={false}
          frameloop="demand"
        >
          <Model />
          <Environment preset="dawn" resolution={64} />;
        </Canvas>
      </div>
    </>
  );
};

export default PhoneVideo;

type Stat = { label: string; value: string };

const Stats = ({ id, className = "", data = [] }: { id?: string; className?: string; data?: Stat[] }) => {
  return (
    <div id={id} className={`flex gap-6 flex-nowrap text-center  ${className}`}>
      {data.map((item, i) => (
        <>
          <div key={i} className="flex flex-col items-center">
            <span className="text-xl md:text-3xl font-bold">{item.value}</span>
            <span className="text-gray-500 text-sm md:text-base">{item.label}</span>
          </div>
          <RocketIcon className="mt-4 text-background" />
        </>
      ))}
    </div>
  );
};
const InfoBlock = ({
  id,
  title,
  paragraph,
  stats = [],
  containerClass = "",
  textId,
  paraId,
}: {
  id?: string;
  title?: string;
  paragraph?: string;
  stats?: Stat[];
  containerClass?: string;
  textId?: string;
  paraId?: string;
}) => {
  return (
    <div
      id={id}
      className={`absolute hidden md:flex w-[70vw] pl-[2vw] t-center pr-[26vw] h-[50%] justify-start md:justify-center items-start flex-col ${containerClass}`}
    >
      <h3
        id={textId}
        className="text-4xl leading-16 overflow-hidden md:text-5xl whitespace-nowrap font-bold text-center"
      >
        <p>{title}</p>
      </h3>

      <h3 id={paraId} className="overflow-hidden">
        <p className="text-zinc-500 mt-5">{paragraph}</p>
      </h3>

      <div className="w-full justify-start">
        {stats.length > 0 && <Stats key={`${id}stats`} id={`${id}stats`} data={stats} className="mt-8" />}
      </div>
    </div>
  );
};
