import { Model } from "@/components/model/I17";
import { Canvas } from "@react-three/fiber";

const PhoneVideo = () => {
  return (
    <div className="w-screen h-screen fixed">
      <Canvas
        id="canvas"
        className="w-full absolute top-0 h-full pointer-events-auto!  z-10"
        dpr={[1, 1.2]}
        camera={{ position: [0, 0, 10], fov: 10 }}
        shadows={false}
        frameloop="demand"
      >
        <Model />
        <pointLight />
        <pointLight intensity={50} position={[-1, 2, 3]} />
      </Canvas>
    </div>
  );
};

export default PhoneVideo;
