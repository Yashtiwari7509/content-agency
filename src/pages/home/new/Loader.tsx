import { Andrew, Chris, Nick, Rahul, Thomas } from "@/assets/ClientImage";

const members = [
  {
    src: Andrew,
    alt: "Andrew",
    className: "left-[10%] bottom-2 h-[580px] z-10 translate-y-10 scale-x-[-1]",
  },
  {
    src: Thomas,
    alt: "Thomas",
    className: "left-[20%] bottom-0 h-[580px] z-20 translate-y-2",
  },
  {
    src: Rahul,
    alt: "Rahul",
    className: "left-1/2 -translate-x-1/2 bottom-0 h-[620px] z-30",
  },
  {
    src: Nick,
    alt: "Nick",
    className: "right-[20%] bottom-0 h-[570px] z-20 translate-y-2 scale-x-[-1]",
  },
  {
    src: Chris,
    alt: "Chris",
    className: "right-[10%] bottom-0 h-[580px] z-10 translate-y-12 scale-x-[-1]",
  },
];

export default function TeamLineup() {
  return (
    <section style={{ willChange: "auto" }} className="absolute inset-0 z-999 flex items-end  bg-white loader-screen">
      <div className="relative w-full h-full max-w-[1700px] mx-auto loader-images">
        {members.map((member, index) => (
          <img
            key={index}
            src={member.src}
            alt={member.alt}
            className={`
              absolute
              object-contain
              w-auto
              img-side
              ${member.className}
            `}
          />
        ))}
      </div>

      {/* Bottom Blur */}
      <div className="absolute bottom-0 left-0 z-60 w-full h-[20vh] prBlur" />

      {/* Top Fade */}
      <div className="absolute bottom-0 left-0 z-60 w-full h-[20vh] rotate-180 translate-y-full prBlur" />
    </section>
  );
}
