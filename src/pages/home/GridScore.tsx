import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import VerticalInfiniteScroll from "@/components/VerticalInfiniteScroll";
import SectionHeader from "@/components/SectionHeader";
import ReviewSlider from "./ReviewSlider";
import { facebook, insta, linkedIn, mac, rays, reel, short, starSvg, youtube } from "@/assets/Image";
// Thomas Delauer - 1.2M peak views/month
// +18% - Watchtime

// Nick Norwitz - 420k peak views/mo
//  350k new subscribers

// Andrew Koutnik - +2x - Click-Through Rate
// +3x - Watchtime

const clientsStatsData = [
  {
    id: "TD",
    name: "Thomas DeLauer",
    niche: "1.2M peak views/month",
    colorClass: "bg-slate-100 text-slate-800",
    peakViews: "1.2M",
    newFollowers: "40k",
    barData: [
      { mo: "Jan", k: 170 },
      { mo: "Feb", k: 210 },
      { mo: "Mar", k: 280 },
      { mo: "Apr", k: 390 },
      { mo: "May", k: 510 },
      { mo: "Jun", k: 700 },
    ],
    maxK: 300,
  },
  {
    id: "NN",
    name: "Nick Norwitz",
    niche: "420k peak views/month",
    colorClass: "bg-sky-100 text-sky-800",
    peakViews: "420k",
    newFollowers: "25k",
    barData: [
      { mo: "Jan", k: 120 },
      { mo: "Feb", k: 180 },
      { mo: "Mar", k: 240 },
      { mo: "Apr", k: 310 },
      { mo: "May", k: 380 },
      { mo: "Jun", k: 420 },
    ],
    maxK: 300,
  },
  {
    id: "AK",
    name: "Andrew Koutnick",
    niche: "+2x - Click-Through Rate",
    colorClass: "bg-blue-100 text-blue-800",
    peakViews: "280k",
    newFollowers: "18k",
    barData: [
      { mo: "Jan", k: 80 },
      { mo: "Feb", k: 110 },
      { mo: "Mar", k: 160 },
      { mo: "Apr", k: 190 },
      { mo: "May", k: 230 },
      { mo: "Jun", k: 280 },
    ],
    maxK: 300,
  },
];

const GridScore = () => {
  const [selectedClientIndex, setSelectedClientIndex] = useState(0);
  const selectedClient = clientsStatsData[selectedClientIndex];

  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const tooltipRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isVisibleRef = useRef<Record<string, boolean>>({});

  const { contextSafe } = useGSAP(() => {
    if (!tooltipRefs.current) return;
    Object.values(tooltipRefs.current).forEach((el) => {
      if (el) {
        gsap.set(el, {
          autoAlpha: 0,
          scale: 0.6,
          y: 20,
          x: 0,
          rotation: 0,
          transformOrigin: "center bottom",
        });
      }
    });
  }, []);

  const handleMouseMove = contextSafe((event: React.MouseEvent<HTMLDivElement>, id: string) => {
    if (hoveredIndex !== id) return;
    const tooltip = tooltipRefs.current[id];
    if (!tooltip) return;
    const halfWidth = event.currentTarget.offsetWidth / 2;
    const offsetX = event.nativeEvent.offsetX - halfWidth;
    const rotate = gsap.utils.mapRange(-halfWidth, halfWidth, -45, 45, offsetX);
    const translateX = gsap.utils.mapRange(-halfWidth, halfWidth, -50, 50, offsetX);
    gsap.to(tooltip, { x: translateX, rotation: rotate, ease: "power2.out", duration: 0.15, overwrite: "auto" });
  });

  const handleMouseEnter = contextSafe((id: string) => {
    if (isVisibleRef.current[id]) return;
    isVisibleRef.current[id] = true;
    setHoveredIndex(id);
    const tooltip = tooltipRefs.current[id];
    if (!tooltip) return;
    gsap.killTweensOf(tooltip);
    gsap.to(tooltip, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" });
  });

  const handleMouseLeave = contextSafe((id: string) => {
    if (!isVisibleRef.current[id]) return;
    isVisibleRef.current[id] = false;
    const tooltip = tooltipRefs.current[id];
    if (!tooltip) return;
    gsap.killTweensOf(tooltip);
    gsap.to(tooltip, {
      autoAlpha: 0,
      y: 20,
      scale: 0.6,
      x: 0,
      rotation: 0,
      duration: 0.3,
      ease: "power1.inOut",
      onComplete: () => {
        if (hoveredIndex === id) setHoveredIndex(null);
      },
    });
  });

  useGSAP(() => {
    gsap.from("#grid-num", {
      textContent: 10,
      duration: 2,
      snap: { textContent: 1 },
      scrollTrigger: {
        trigger: ".container",
        start: `-50% top`,
        end: "top top",
      },
    });
    gsap.to(".grid-circle", {
      rotate: 360,
      repeat: -1,
      duration: 20,
      delay: 3,
      ease: 'none'
    });
  });
  return (
    <section id="score" className="w-screen  p-2 overflow-x-hidden relative py-20">
      <SectionHeader
        label="Stats"
        title="Our Success"
        gradientWord="Score"
        description="We edit for doctors, dietitians, and researchers who need their science communicated clearly and their channels growing."
      />

      <div className="container max-w-5xl min-h-screen lg:h-240  mx-auto">
        <div className="top-left relative overflow-hidden">
          <div className="relative z-10 inner-grid w-full h-full flex flex-col justify-center items-center">
            <img src={starSvg} className="size-30 absolute brightness-110 top-0 right-0 lg:top-10  lg:right-12 rotate-0" alt="" />
            <h1
              id="grid-num"
              style={{ filter: "drop-shadow(1px -1px 10px skyblue)" }}
              className="c-text text-9xl font-black w-fit h-fit leading-none"
            >
              40
            </h1>
            <h4 className="text-3xl tracking-tight font-semibold reveal-text">Channels Managed</h4>
          </div>
          <div className="absolute z-0 bottom-0 left-0 size-full">
            <img src={rays} className="size-full" alt="" />
          </div>
        </div>

        <div className="top-right overflow-hidden">
          <div className="inner-grid w-full h-full relative ">
            <img
              src={mac}
              style={{ filter: "drop-shadow(0px -1px 20px black)" }}
              className="size-full absolute top-6 -right-42  object-contain rotate-0"
              alt=""
            />
            <div className="pt-5">
              <h2 style={{ WebkitTextStroke: "1px black" }} className="text-8xl ml-16 font-bold text-transparent">
                2500+
              </h2>
              <h4 className="text-6xl ml-16 font-bold">
                Raw <br />
                Video <br />
                Edited
              </h4>
            </div>
          </div>
        </div>

        <div className="bottom-left overflow-hidden">
          <div className="inner-grid w-full h-full">
            
            <div className="grid-bg-mask">
              <div className="relative grid-circle w-full h-120 mx-auto top-70 absolute -translate-x-1/2 left-1/2">
                {[youtube, insta, facebook, short, reel, linkedIn, youtube, insta, facebook, short, reel, linkedIn].map((link, index, arr) => {
                  const total = arr.length;
                  const radius = 180; // distance from center to each icon
                  const angle = (360 / total) * index - 90; // start from top, go clockwise
                  const rad = (angle * Math.PI) / 180;
                  const x = radius * Math.cos(rad);
                  const y = radius * Math.sin(rad);
                  // rotate icon so its "up" points away from center (tangent to circle)
                  const rotation = angle + 90;
                  return (
                    <img
                      key={index}
                      src={link}
                      className="absolute h-18 w-18 icon_png object-cover"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotation}deg)`,
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <div id="Marqee-slider-vertical" className="absolute px-3 -top-6 left-0 w-full flex justify-center">
              <VerticalInfiniteScroll />
            </div>
            <h4 className="absolute z-10 px-4 text-left bottom-10 font-semibold text-3xl w-full">Platform handled by our Agency</h4>
            <div className="radial-blur-v size-50 absolute bottom-0  -right-20 z-0 blur-xl "></div>
          </div>
        </div>
        <div className="middle">
          <div className="inner-grid w-full h-full relative overflow-hidden">
            <ReviewSlider />
          </div>
        </div>
        <div className="bottom-right relative">
          <div className="inner-grid w-full h-full relative p-6 lg:p-8 flex flex-col justify-between z-10">
            <div className="z-10 relative flex-1 flex flex-col">
              <div className="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full font-semibold mb-4 bg-white text-slate-700 w-fit">
                Fixed: growth chart, no duplicates
              </div>

              <div className="flex gap-6 items-end shrink-0">
                <div>
                  <div className="font-bold text-3xl font-sans tracking-tight text-gray-900 transition-all duration-300">
                    {selectedClient.peakViews}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 font-medium">peak views/mo</div>
                </div>
                <div>
                  <div className="font-bold text-3xl font-sans tracking-tight text-gray-900 transition-all duration-300">
                    {selectedClient.newFollowers}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 font-medium">new followers</div>
                </div>
              </div>

              <div className="flex items-end gap-2 flex-1 min-h-[140px] mt-6 w-full max-w-sm">
                {selectedClient.barData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <div
                      className="w-full rounded-t-lg bg-background/80 group-hover:bg-background cursor-pointer relative transition-colors duration-200"
                      style={{ height: `${Math.round((d.k / selectedClient.maxK) * 100)}%` }}
                    >
                      <h2 className="absolute -top-6 left-1/2 -translate-x-1/2 text-[11px] font-bold text-sky-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        {d.k}k
                      </h2>
                    </div>
                    <h2 className="text-[11px] text-gray-500 font-medium">{d.mo}</h2>
                  </div>
                ))}
              </div>
            </div>

            <div className="z-10 relative mt-6 shrink-0">
              <div className="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full font-semibold mb-3 bg-white text-slate-700 w-fit">
                Fixed: real client names on hover
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {clientsStatsData.map((client, idx) => (
                  <div
                    key={client.id}
                    onClick={() => setSelectedClientIndex(idx)}
                    onMouseEnter={() => handleMouseEnter(client.id)}
                    onMouseLeave={() => handleMouseLeave(client.id)}
                    onMouseMove={(e) => handleMouseMove(e, client.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer border-2 border-white relative transition-transform hover:z-30 group shadow-sm ${selectedClientIndex === idx ? "ring-2 ring-offset-2 ring-background" : ""}`}
                  >
                    {client.id}
                    <div
                      ref={(el) => {
                        tooltipRefs.current[client.id] = el;
                      }}
                      className="absolute bottom-[130%] left-1/2 -translate-x-1/2 whitespace-nowrap p-3 backdrop-blur-xs border border-white rounded-2xl"
                    >
                      <p className="text-gray-900 text-sm mb-0.5">{client.name}</p>
                    </div>
                  </div>
                ))}
                <span className="text-xs font-medium text-black ml-2">+ 36 more</span>
              </div>

              <h1 className="text-3xl text-gray-900 leading-tight mt-5 tracking-tighter">
                Our clients
                <br />
                speak for us.
              </h1>
            </div>

            <div className="radial-blur-v size-50 absolute bottom-0 right-0 z-0 blur-xl opacity-80 pointer-events-none"></div>
            <div className="radial-blur-b size-80 absolute top-0 -left-20 z-0 blur-xl opacity-40 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GridScore;
