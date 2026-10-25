import { IphoneS, type ModelNavHandle } from "@/components/model/Iphone";
import { Canvas } from "@react-three/fiber";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";

const PhoneVideo = () => {
  const modelRef = useRef<ModelNavHandle>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [total, setTotal] = useState(0);

  // Sync index from the model after each nav
  const syncIndex = useCallback(() => {
    if (!modelRef.current) return;
    // Small delay so the transition completes before we read
    requestAnimationFrame(() => {
      setCurrentIndex(modelRef.current?.getIndex() ?? 0);
    });
  }, []);

  useEffect(() => {
    // Once the model mounts, grab the total
    const timer = setTimeout(() => {
      if (modelRef.current) {
        setTotal(modelRef.current.getTotal());
        setCurrentIndex(modelRef.current.getIndex());
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handlePrev = () => {
    modelRef.current?.goPrev();
    // Wait for transition animation to finish before syncing
    setTimeout(syncIndex, 700);
  };

  const handleNext = () => {
    modelRef.current?.goNext();
    setTimeout(syncIndex, 700);
  };

  const isFirst = currentIndex === 0;
  const isLast = total > 0 && currentIndex === total - 1;

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
          {/* <Model ref={modelRef} /> */}
          <IphoneS ref={modelRef} />
          <pointLight />
          <pointLight intensity={50} position={[-1, 2, 3]} />
        </Canvas>
      </div>

      {/* ── Reel Navigation Overlay — outside canvas stacking context ── */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-20 h-10 flex justify-between z-[999] pointer-events-auto">
        <button
          className={`p-1 border rounded-full size-8 flex justify-center items-center pointer-events-auto ${isFirst ? "pointer-events-none opacity-10" : "cursor-pointer"}`}
          onClick={handlePrev}
          disabled={isFirst}
          aria-label="Previous video"
        >
          <ArrowUp />
        </button>

        <button
          className={`p-1 rounded-full border size-8 flex justify-center items-center pointer-events-auto ${isLast ? "pointer-events-none opacity-10" : "cursor-pointer"}`}
          onClick={handleNext}
          disabled={isLast}
          aria-label="Next video"
        >
          <ArrowDown />
        </button>
      </div>
    </>
  );
};

export default PhoneVideo;
