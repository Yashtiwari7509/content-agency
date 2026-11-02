import { IphoneS, type ModelNavHandle } from "@/components/model/Iphone";
import { Canvas } from "@react-three/fiber";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useRef } from "react";

const PhoneVideo = () => {
  const modelRef = useRef<ModelNavHandle>(null);

  const handlePrev = () => {
    modelRef.current?.goPrev();
  };

  const handleNext = () => {
    modelRef.current?.goNext();
  };

  return (
    <>
      <div className="w-screen h-screen absolute top-0 canvas-wrapper">
        <Canvas
          id="canvas"
          className="w-full absolute top-0 h-full pointer-events-auto! bg-transparent z-10"
          dpr={[1, 1.2]}
          camera={{ position: [0, 0, 10], fov: 10 }}
          shadows={false}
          frameloop="demand"
        >
          <IphoneS ref={modelRef} />
          <pointLight />
          <pointLight intensity={50} position={[-1, 2, 3]} />
        </Canvas>
        <div
          id="phone-nav-btns-1"
          style={{ opacity: 0, transform: "translateX(80px)" }}
          className="absolute right-38 top-1/3 w-fit h-20 flex flex-col justify-between gap-2 z-[9999] bg-white/10 backdrop p-1.5 px-2.5 rounded-full border"
        >
          <button
            className="p-0.5 border rounded-full size-7 flex justify-center items-center bg-white pointer-events-auto cursor-pointer"
            onClick={handlePrev}
            aria-label="Previous video"
          >
            <ArrowUp className="size-3.5" />
          </button>

          <button
            className="p-0.5 rounded-full border size-7 flex justify-center items-center bg-white pointer-events-auto cursor-pointer"
            onClick={handleNext}
            aria-label="Next video"
          >
            <ArrowDown className="size-3.5" />
          </button>
        </div>
        <div
          id="phone-nav-btns-2"
          style={{ opacity: 0, transform: "translateX(-80px)" }}
          className="absolute left-38 top-1/3 w-fit h-20 flex flex-col justify-between gap-2 z-[9999] bg-white/10 backdrop p-1.5 px-2.5 rounded-full border"
        >
          <button
            className="p-0.5 border rounded-full size-7 flex justify-center items-center bg-white pointer-events-auto cursor-pointer"
            onClick={handlePrev}
            aria-label="Previous video"
          >
            <ArrowUp className="size-3.5" />
          </button>

          <button
            className="p-0.5 rounded-full border size-7 flex justify-center items-center bg-white pointer-events-auto cursor-pointer"
            onClick={handleNext}
            aria-label="Next video"
          >
            <ArrowDown className="size-3.5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default PhoneVideo;
