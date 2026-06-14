import { Andrew, Chris, Nick, Rahul, Thomas } from "@/assets/ClientImage";

const members = [
  { id: 1, src: Andrew, alt: "Member 1" },
  { id: 2, src: Nick, alt: "Member 2" },
  { id: 3, src: Rahul, alt: "Hero Member" }, // center
  { id: 4, src: Thomas, alt: "Member 4" },
  { id: 5, src: Chris, alt: "Member 5" },
];

export default function TeamLineup() {
  return (
    <section style={{ willChange: "auto" }} className="absolute top-0 w-screen  flex items-end z-999 h-screen bg-white p-0 loader-screen">
      <div className="w-screen h-screen absolute bg-background bottom-0 loader-bg-mask"></div>
      <div className="mx-auto max-w-7xl px-6 overflow-hidden translate-y-10">
        <div className="flex items-end overflow-hidden justify-center loader-images">
          <img
            src={members[0].src}
            alt={members[0].alt}
            className="relative  z-10 h-[580px] w-200 object-contain translate-y-10 img-side"
            style={{ transform: "scaleX(-1)" }}
          />
          <img
            src={members[3].src}
            alt={members[3].alt}
            className="relative -ml-50 z-20 h-[580px] w-200 object-contain translate-y-2 img-side"
          />
          {/* Center Hero */}
          <img
            src={members[2].src}
            alt={members[2].alt}
            className="relative -ml-50 z-50 h-[620px] w-200 object-contain drop-shadow-xl img-side"
          />

          {/* Member 4 */}
          <img
            src={members[1].src}
            alt={members[1].alt}
            className="relative -ml-55 z-20 h-[570px] w-200 object-contain translate-y-2 img-side"
            style={{ transform: "scaleX(-1)" }}
          />
          <img
            src={members[4].src}
            alt={members[4].alt}
            className="relative -ml-50 z-10 h-[580px] translate-y-12 w-200 object-contain img-side"
            style={{ transform: "scaleX(-1)" }}
          />

          {/* Member 5 */}
        </div>
      </div>
    </section>
  );
}
