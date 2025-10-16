import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Check } from "lucide-react";
import { useRef } from "react";

const services = [
  {
    bgColor: "bg-gray-300",
    title: "Pre Production",
    description: "Striking imagery for brands, and publications, capturing style and personality.",
    src: "https://images.unsplash.com/photo-1758825175271-168064c2004c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
    setup: [
      "Concept development",
      "Creative brainstorming",
      "Scriptwriting",
      "Storyboarding",
      "Shot list creation",
      "Moodboard design",
      "Casting & talent selection",
      "Location scouting",
    ],
  },
  {
    bgColor: "bg-blue-300",
    title: "Production",
    description: "High-impact photography for businesses, campaigns, and products.",
    src: "https://plus.unsplash.com/premium_photo-1758698145702-7f08b2dae2b3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D",
    setup: [
      "Set design & preparation",
      "Lighting setup",
      "Camera setup & framing",
      "Sound setup & testing",
      "Directing talent & crew",
      "Wardrobe & makeup",
      "Scene blocking & rehearsals",
      "Filming / Principal photography",
      "Continuity management",
      "On-set monitoring & adjustments",
    ],
  },
  {
    bgColor: "bg-orange-400",
    title: "Post Production",
    description: "Professional headshots and portraits tailored to reflect your personality and vision.",
    src: "https://images.unsplash.com/photo-1758621518225-9248e65dbaee?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3N3x8fGVufDB8fHx8fA%3D%3D",
    setup: [
      "Footage ingest & backup",
      "Organizing media assets",
      "Rough cut editing",
      "Fine cut editing",
      "Visual effects (VFX)",
      "Motion graphics & animations",
      "Color correction & grading",
      "Sound design & audio mixing",
      "Voice-over recording",
      "Music composition & licensing",
      "Subtitles & captions",
      "Client review & feedback",
      "Final export & delivery",
      "Archiving project files",
    ],
  },
];

const ServiceCard = ({ bgColor, title, description, src, setup }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!cardRef.current || !imageRef.current) return;
    const card = cardRef.current;
    const image = imageRef.current;

    // Mouse enter animation
    const handleMouseEnter = () => {
      gsap.to(card, { height: "200px", border: "1px solid black" });
      gsap.to("#service-background", {
        backdropFilter: "blur(4px)",
        // backgroundColor: "rgba(0, 0, 0, 0.5)",
      });
      gsap.to(image, {
        left: "20%",
        duration: 0.5,
        filter: "blur(0px)",
        skewX: "0deg",
      });
    };

    // Mouse leave animation
    const handleMouseLeave = () => {
      gsap.to(card, { height: "106px", border: "0px solid white" });
      gsap.to("#service-background", {
        backdropFilter: "blur(0px)",
        // backgroundColor: "rgba(0, 0, 0, 0.0)",
      });
      gsap.to(image, {
        left: "-40%",
        duration: 0.5,
        filter: "blur(4px)",
        skewX: "10deg",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  });
  return (
    <>
      <img
        ref={imageRef}
        src={src}
        className="w-[20rem] hidden lg:block object-cover h-[30rem] z-20 absolute left-[-40%] rounded-lg"
        alt=""
      />
      <div
        ref={cardRef}
        className="relative bg-gray-50 w-full p-3 rounded-xl cursor-pointer lg:h-[106px] h-[250px]  overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row gap-6">
          <div className={`w-full h-30 sm:w-30 sm:h-20 ${bgColor} rounded-lg flex-shrink-0 overflow-hidden`}>
            <img src={src} className="w-full h-full object-cover"></img>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-normal text-gray-900 mb-1">{title}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
          </div>
        </div>

        <div className="w-6 h-24 absolute right-2 top-1 border  flex items-center justify-center rounded-full  cursor-pointer text-xs">
          <span className="text-gray-600" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
            read more
          </span>
        </div>

        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2  mt-4">
            {setup.map((item: string, index: number) => (
              <li key={index} className="text-xs text-gray-600 leading-relaxed flex items-start gap-2 mt-2">
                <span className="mt-1">
                  <Check size={10} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default function ServicesLayout() {
  return (
    <div className="relative min-h-screen flex justify-center items-center  p-4 md:p-16">
      <div id="service-background" className="w-screen h-screen absolute top-0 left-0 "></div>

      <div className="max-w-5xl mx-auto">
        {/* Services Label */}
        <div className="mb-5">
          <span className="text-xs font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-full inline-block">
            Services
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">How can I help?</h1>

            <p className="text-base text-gray-600 mb-10 leading-relaxed">
              From editorial shoots to personal portraits, I bring your vision to life with precision, creativity, and a
              deep understanding of light and composition.
            </p>

            <div className="mb-10">
              <h3 className="text-xs font-medium text-gray-700 mb-5">All services includes</h3>

              <div className="space-y-3">
                {[
                  { tick: true, text: "Professional Editing" },
                  { tick: true, text: "Edited & Unedited (RAW) Images" },
                  { tick: true, text: "Personal and Commercial Licensing" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-start gap-3">
                    <div className="bg-gray-100 p-1 rounded-full">
                      <Check className="w-4 h-4 text-gray-900 mt-0.5 flex-shrink-0" />
                    </div>
                    <span className="text-sm text-gray-900">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button variant={"default"} className="rounded-full px-8 py-6 font-normal">
              Explore Services
            </Button>
          </div>

          {/* Right Column - Service Cards */}
          <div className="flex flex-col gap-1 justify-center items-cente">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                bgColor={service.bgColor}
                title={service.title}
                description={service.description}
                src={service.src}
                setup={service.setup}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
