import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Balloons() {
  const balloons = [
    { top: "10%", left: "20%" },
    { top: "25%", left: "40%" },
    { top: "40%", left: "80%" },
    { top: "50%", left: "10%" },
  ];
  const ref = useRef<HTMLSpanElement[]>([]);

  useGSAP(() => {
    if (ref.current) {
      gsap.from(ref.current, {
        opacity: 0,
        y: "random(100, 300)",
        ease: "power4.out",
        stagger: 0.5,
        duration: 4,
        delay: .2,
      });
    }
  });
  return (
    <>
      {balloons.map((balloon, i) => {
        const topValue = parseInt(balloon.top);

        // Base size grows as balloons go down
        const baseSize = 20 + Math.floor(topValue / 10) * 12;

        // Make upper balloons more "droplet-like" by adjusting width/height ratio

        const width = topValue < 30 ? baseSize * 0.6 : baseSize; // narrower at top

        return (
          <span
            key={i}
            ref={(el) => {
              if (el) ref.current[i] = el;
            }}
            className={cn("absolute rounded-full ellipse  bg-black z-0")}
            style={{
              top: balloon.top,
              left: balloon.left,
              width: `${width}px`,
              height: `${width}px`,
              transform: `rotate(${width * -2}deg)`,
            }}
          ></span>
        );
      })}
    </>
  );
}
