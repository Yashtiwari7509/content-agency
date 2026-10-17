import { members } from "@/constant/workflowSection";
import { cn } from "@/lib/utils";


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
