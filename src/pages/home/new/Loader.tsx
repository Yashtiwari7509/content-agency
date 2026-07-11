import { Andrew1, Chris1, Nick1, Rahul1, Thomas1 } from "@/assets/ClientImage";
import { cn } from "@/lib/utils";

const members = [
  {
    src: Andrew1,
    alt: "Andrew",
    className: "left-[2%] bottom-2 h-[580px] hidden lg:block z-10 w-110 translate-y-10 scale-x-[-1]",
  },
  {
    src: Thomas1,
    alt: "Thomas",
    className: "lg:left-[20%] -left-20 bottom-0 w-72 lg:h-[580px] lg:w-120 z-20 translate-y-2",
  },
  {
    src: Rahul1,
    alt: "Rahul",
    className: "left-1/2 -translate-x-1/2 bottom-0 w-80 lg:w-120 lg:h-[620px] z-30",
  },
  {
    src: Nick1,
    alt: "Nick",
    className: "lg:right-[20%] -right-20 bottom-0  lg:h-[570px] z-20 w-70 lg:w-120 translate-y-2 scale-x-[-1]",
  },
  {
    src: Chris1,
    alt: "Chris",
    className: "right-[10%] bottom-0 h-[580px] hidden lg:block z-10 w-120 translate-y-12 scale-x-[-1]",
  },
];

const TeamLineup = () => {
  return (
    <section style={{ willChange: "transform,auto" }} className="top-0 h-screen w-screen inset-0 z-2000 fixed bg-white loader-screen overflow-hidden">
      {/* Team images */}
      <div className="relative lg:max-w-[90rem] max-w-xl bg-green-300 h-full mx-auto loader-images">
        <div className="w-full h-full absolute">

          {members.map((member, index) => (
            <img
              key={index}
              src={member.src}
              alt={member.alt}
              className={cn(`absolute object-contain w-auto object-center img-side`, member.className)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Blur */}
      <div className="absolute bottom-0 left-0 z-60 w-screen h-[20vh] prBlur" />
      {/* Top Fade */}
      {/* <div className="absolute bottom-0 left-0 z-60 w-screen h-[40vh] rotate-180 translate-y-[39vh] prBlur" /> */}
    </section>
  );
};

export default TeamLineup;
