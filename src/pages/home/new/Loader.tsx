import { Andrew1, Chris1, Nick1, Rahul1, Thomas1 } from "@/assets/ClientImage";
import { cn } from "@/lib/utils";

export const members = [
  {
    src: Andrew1,
    alt: "Andrew",
    className: "left-[13%] bottom-2 h-[580px] w-[300px]! hidden lg:block z-10 w-110 translate-y-10",
  },
  {
    src: Thomas1,
    alt: "Thomas",
    className: "lg:left-[22%] -left-20 bottom-0 w-[350px]! w-72 lg:h-[580px] lg:w-120 z-20 translate-y-10",
  },
  {
    src: Rahul1,
    alt: "Rahul",
    className: "left-1/2 -translate-x-1/2  w-[400px]! bottom-0 w-80 lg:w-120 lg:h-[620px] z-30 translate-y-10",
  },
  {
    src: Nick1,
    alt: "Nick",
    className: "lg:right-[22%] -right-20 w-[350px]! bottom-0 lg:h-[570px] z-20 w-70 lg:w-120 translate-y-5",
  },
  {
    src: Chris1,
    alt: "Chris",
    className: "right-[12%] bottom-0 h-[580px] w-[300px]! hidden lg:block z-10 w-120 translate-y-14",
  },
];

const TeamLineup = () => {
  return (
    <section style={{ willChange: "transform,auto" }} className="top-0 h-screen w-screen inset-0 z-2000 fixed bg-white loader-screen">
      <div className="w-screen h-screen  overflow-hidden">
        {/* Team images */}
        <div className="relative lg:max-w-360 max-w-xl h-full mx-auto loader-images">
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
      </div>
      <div className="absolute bottom-0 left-0 z-60 w-screen h-[20vh] prBlur" />
      <div className="bg-linear-to-b from-white to-transparent h-[20vh] w-screen absolute translate-y-0"></div>
      <div className="bg-linear-to-b from-white to-transparent h-[20vh] w-screen absolute translate-y-0"></div>
      <div className="bg-linear-to-b from-white to-transparent h-[20vh] w-screen absolute translate-y-0"></div>
    </section>
  );
};

export default TeamLineup;
