// import image5 from "../../public/shorts.svg?url";
import { cn } from "@/lib/utils";
import image6 from "../../public/reel.svg?url";
// import profile from "../../public/profile.webp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type CardBottom = {
  label: string;
  value: string;
};

export type CardStatsItem = {
  top: string[]; // image URLs / imported urls
  bottom: CardBottom[];
  heroCard: boolean;
  animation: boolean;
  alignmentCss: string;
};

const HeroCard = ({ card }: { card: CardStatsItem }) => {
  useGSAP(() => {
    // gsap.to(".inner1", {
    //   clipPath: "inset(0 100% 0 0)",
    //   duration: 2,
    //   repeat: -1,
    //   yoyo: true,
    //   ease: "none",
    // });

    // gsap.to(".handle", {
    //   left: 0,
    //   duration: 2,
    //   repeat: -1,
    //   yoyo: true,
    //   ease: "none",
    // });

    gsap.fromTo(
      ".inner2 div > h2",
      {
        textContent: 1, // Start counting from 0
      },
      {
        textContent: 100, // Start counting from 0
        duration: 2, // Animation duration in seconds
        snap: { textContent: 1 },
      }
    );
  });
  return (
    <div
      className={cn(
        "bg-white/10 w-fit h-fit t-center border-2 backdrop-blur-md rounded-2xl overflow-hidden border-white absolute"
      )}
      style={{ inset: card.alignmentCss }}
    >
      {/* <div className="absolute w-1 z-10 blur-[2px] h-40 bg-background top-0 right-0 handle"></div> */}

      <div className="inner1 flex w-full h-[50%]  justify-around p-2 items-center gap-2 relative">
        {card.top.map((img, i) => (
          <div key={i} className="size-15 shrink-0 rounded-xl overflow-hidden p-2 bg-gray-50/50">
            <img
              src={img}
              // style={{ scale: i === 1 ? 1.3 : 1 }}
              className="object-cover overflow-hidden rounded-lg w-full h-full"
              alt=""
            />
          </div>
        ))}
      </div>
      <div className="flex inner2 w-full h-[30%] bg-gray-50 justify-around p-2 items-center gap-2 relative">
        {card.bottom.map((txt, i) => (
          <div key={i} className="size-10 shrink-0  flex flex-col justify-center items-center p-2 bg-gray-50">
            <h2 className="font-bold">{txt.value}</h2>
            <p className="font-extralight text-xs leading-none tracking-tighter">{txt.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroCard;
