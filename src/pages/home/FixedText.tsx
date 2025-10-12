import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import brush from "../../../public/brush.svg";

const FixedText = () => {
  const fixedTextRef = useRef(null);
  const tlRef = useRef<GSAPTimeline>(null);

  const tl = tlRef.current;
  if (!fixedTextRef.current || tl) {
  }
  useGSAP(() => {
    const items = gsap.utils.toArray(".text-items span");

    // Set initial positions - all items except first should be below
    gsap.set(items.slice(1), { yPercent: 100 });

    // Create timeline that loops
    const tl = gsap.timeline({
      repeat: -1,
      onRepeat: () => {
        // Reset all items when loop repeats
        gsap.set(items.slice(1, -1), { yPercent: 100 });
      },
    });

    items.forEach((item, i) => {
      if (i < items.length - 1) {
        // Animate current item out and next item in
        tl.to(
          item as HTMLElement,
          {
            yPercent: -100,
            duration: 0.5,
            ease: "power2.inOut",
          },
          i * 2
        ).to(
          items[i + 1] as HTMLElement,
          {
            yPercent: 0,
            duration: 0.5,
            ease: "power2.inOut",
          },
          i * 2
        );

        // Add pause between transitions
        tl.to({}, { duration: 1 });
      }
    });
  }, []);

  return (
    <div ref={fixedTextRef} className="relative w-screen h-screen flex justify-center items-center select-none">
      <div className="text-container text-2xl flex h-8 md:text-4xl md:h-10 font-medium">
        <div className="text-nowrap w-fit">We'll edit your</div>
        <div className="flex w-34 md:w-48 h-full flex-col ml-2 text-white   relative text-items">
          <img src={brush} className="absolute -bottom-10 -left-4" alt="" />

          <span className="absolute bg-red-   px-2">Shorts</span>
          <span className="absolute bg-pink-   px-2">Reels</span>
          <span className="absolute bg-blue-  px-2">Podcasts</span>
          <span className="absolute bg-red-  px-2">Shorts</span>
        </div>
      </div>
    </div>
  );
};

export default FixedText;
