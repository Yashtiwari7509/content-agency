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
    const items = gsap.utils.toArray(".text-itemss span");

    // Set initial positions - all items except first should be below
    gsap.set(items.slice(1), { yPercent: 110 });

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
            yPercent: -110,
            duration: 0.2,
            ease: "power4.out",
          },
          i * 2
        ).to(
          items[i + 1] as HTMLElement,
          {
            yPercent: 0,
            duration: 0.2,
            ease: "power4.out",
          },
          i * 2
        );

        // Add pause between transitions
        tl.to({}, { duration: 1.6 , ease : 'none'});
      }
    });
  }, []);

  return (
    <div ref={fixedTextRef} className="relative w-screen h-screen flex justify-center items-center select-none">
      <div className="text-container md:w-[30rem] w-[19.5rem] text-2xl flex h-8 md:text-4xl md:h-10 font-medium relative">
        <div className="text-nowrap w-fit">We'll handle Your</div>
        <img src={brush} style={{ color: "black !important" }} className="absolute h-24 -bottom-8 -z-30 -right-0 " alt="" />
        <div
          className="flex w-34 md:w-50 h-full z-10 -right-8 flex-col ml-2 overflow-hidden  text- absolute text-itemss"
        >
          <span className="absolute bg-red- mix-blend-difference px-2">Shorts</span>
          <span className="absolute bg-blue- mix-blend-difference px-2">Reels</span>
          <span className="absolute bg-pink- mix-blend-difference  px-2">Podcasts</span>
          <span className="absolute bg-red- mix-blend-difference px-2">Shorts</span>
        </div>
      </div>
    </div>
  );
};

export default FixedText;
