import { Model, type ModelNavHandle } from "@/components/model/I17";
import { Canvas } from "@react-three/fiber";
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
    <div className="w-screen h-screen absolute top-0 canvas-wrapper">
      <Canvas
        id="canvas"
        className="w-full absolute top-0 h-full pointer-events-auto! bg-transparent z-10"
        dpr={[1, 1.2]}
        camera={{ position: [0, 0, 10], fov: 10 }}
        shadows={false}
        frameloop="demand"
      >
        <Model ref={modelRef} />
        <pointLight />
        <pointLight intensity={50} position={[-1, 2, 3]} />
      </Canvas>

      {/* ── Reel Navigation Overlay ── */}
      <div className="reel-nav-overlay">
        <button
          className={`reel-nav-btn reel-nav-up ${isFirst ? "reel-nav-disabled" : ""}`}
          onClick={handlePrev}
          disabled={isFirst}
          aria-label="Previous video"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 4L3 12h14L10 4z"
              fill="currentColor"
            />
          </svg>
        </button>

        <div className="reel-nav-indicator">
          <span className="reel-nav-current">{currentIndex + 1}</span>
          <span className="reel-nav-separator">/</span>
          <span className="reel-nav-total">{total}</span>
        </div>

        <button
          className={`reel-nav-btn reel-nav-down ${isLast ? "reel-nav-disabled" : ""}`}
          onClick={handleNext}
          disabled={isLast}
          aria-label="Next video"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 16L3 8h14L10 16z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PhoneVideo;
