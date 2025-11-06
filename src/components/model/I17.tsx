import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import type { JSX } from "react";
import { useGLTF, useVideoTexture } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// import { useThree } from "@react-three/fiber";
// import { useThree } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Object_11: THREE.Mesh;
    Object_5: THREE.Mesh;
    Object_6: THREE.Mesh;
    Object_7: THREE.Mesh;
    Object_8: THREE.Mesh;
    Object_9: THREE.Mesh;
    Object_19: THREE.Mesh;
    Object_13: THREE.Mesh;
    Object_14: THREE.Mesh;
    Object_15: THREE.Mesh;
    Object_16: THREE.Mesh;
    Object_17: THREE.Mesh;
    Object_27: THREE.Mesh;
    Object_21: THREE.Mesh;
    Object_22: THREE.Mesh;
    Object_23: THREE.Mesh;
    Object_24: THREE.Mesh;
    Object_25: THREE.Mesh;
    Object_29: THREE.Mesh;
    Object_30: THREE.Mesh;
    Object_31: THREE.Mesh;
    Object_33: THREE.Mesh;
    Object_34: THREE.Mesh;
    Object_36: THREE.Mesh;
    Object_38: THREE.Mesh;
    Object_39: THREE.Mesh;
    Object_40: THREE.Mesh;
    Object_42: THREE.Mesh;
    Object_44: THREE.Mesh;
    Object_46: THREE.Mesh;
    Object_48: THREE.Mesh;
    Object_50: THREE.Mesh;
    Object_51: THREE.Mesh;
    Object_53: THREE.Mesh;
    Object_54: THREE.Mesh;
    Object_56: THREE.Mesh;
    Object_58: THREE.Mesh;
    Object_59: THREE.Mesh;
    Object_62: THREE.Mesh;
    Object_64: THREE.Mesh;
    Object_66: THREE.Mesh;
    Plane: THREE.Mesh;
  };
  materials: {
    Glass_Lens: THREE.MeshPhysicalMaterial;
    Metal_Camera_Frame: THREE.MeshPhysicalMaterial;
    Plastic_Camera_Frame: THREE.MeshStandardMaterial;
    Glass_Tint: THREE.MeshStandardMaterial;
    Glass: THREE.MeshPhysicalMaterial;
    Metal_Lens_Frame: THREE.MeshStandardMaterial;
    Plastic_Flash: THREE.MeshStandardMaterial;
    material: THREE.MeshStandardMaterial;
    Plastic_Flash_Tint: THREE.MeshStandardMaterial;
    Frosted_Glass: THREE.MeshPhysicalMaterial;
    Frosted_Glass_Tint: THREE.MeshStandardMaterial;
    Display: THREE.MeshStandardMaterial;
    Metal_Body: THREE.MeshStandardMaterial;
    Plastic_Body_Antena: THREE.MeshStandardMaterial;
    Metal: THREE.MeshStandardMaterial;
    Glass_Camera_Control: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};
// Video texture setup helper
const setupVideoTexture = (texture: THREE.VideoTexture) => {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
};
export function Model(props: JSX.IntrinsicElements["group"]) {
  const modelRef = useRef<THREE.Group>(null);
  const screenPositionFactor = Math.min(window.innerWidth / 1700, 0.7);
  const [targetPos] = useState({
    x: screenPositionFactor < 0.4 ? 0 : screenPositionFactor,
    y: screenPositionFactor > 0.4 ? -0.1 : -screenPositionFactor,
  });
  const { nodes, materials } = useGLTF("./iphone.glb") as unknown as GLTFResult;
  const [texIndex, setTexIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // let frameLoop = useThree((state) => state.setFrameloop);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useGSAP(() => {
    if (!modelRef.current) return;

    const initialRotationY = modelRef.current.rotation.y;
    const initialRotationZ = modelRef.current.rotation.z;
    gsap.fromTo(
      modelRef.current.rotation,
      {
        y: initialRotationY + Math.PI * 4,
        z: initialRotationZ - Math.PI * 0.2,
      },
      {
        y: initialRotationY,
        z: initialRotationZ,
        scrollTrigger: {
          trigger: "#video-page",
          start: "-20% top",
          end: "30% top",
          scrub: 1,
        },
        ease: "none",
        immediateRender: true,
      }
    );

    gsap.fromTo(
      modelRef.current.position,
      {
        x: targetPos.x + 2,
        y: targetPos.y + 2,
      },
      {
        x: targetPos.x,
        y: targetPos.y,
        scrollTrigger: {
          trigger: "#video-page",
          start: "-20% top",
          end: "30% top",
          scrub: 1,
        },
        ease: "none",
        immediateRender: false,

        // onStart: () => {
        //   frameLoop("always");
        // },
        // onLeaveBack: () => {
        // frameLoop("demand");
        // },
      }
    );

    gsap.fromTo(
      modelRef.current.rotation,
      {
        y: initialRotationY,
      },
      {
        y: -(initialRotationY + Math.PI * 2),
        scrollTrigger: {
          trigger: "#ndPage",
          start: "top top",
          end: "20% top",
          scrub: 1,
          onUpdate: (self) => {
            if (self.progress > 0.5) {
              setTexIndex(1);
            } else {
              setTexIndex(0);
            }
          },
        },
        ease: "none",
        immediateRender: false,
      }
    );

    gsap.fromTo(
      modelRef.current.position,
      {
        x: targetPos.x,
        y: targetPos.y,
      },
      {
        x: targetPos.x,
        y: targetPos.y - 2,
        scrollTrigger: {
          trigger: "#lastPage",
          start: "-20% top",
          end: "30% top",
          scrub: 1,
        },
        ease: "none",
        immediateRender: false,
      }
    );
  }, []);

  const videoTexture = useVideoTexture("./video.mp4", {
    muted: true,
    loop: false,
    start: false,
  });
  const videoTexture1 = useVideoTexture("./video2.mp4", {
    muted: true,
    loop: false,
    start: false,
  });

  useMemo(() => {
    setupVideoTexture(videoTexture);
    setupVideoTexture(videoTexture1);
  }, [videoTexture, videoTexture1]);

  const textures = [videoTexture, videoTexture1];
  const currentTexture = textures[texIndex];

  const handlePointerEnter = () => {
    if (isMobile) return; // Skip hover on mobile

    const currentVideo = currentTexture?.image as HTMLVideoElement;
    if (currentVideo && "play" in currentVideo) {
      // Stop all videos first
      [videoTexture, videoTexture1].forEach((tex) => {
        const vid = tex?.image as HTMLVideoElement;
        if (vid && "pause" in vid) {
          vid.pause();
          vid.muted = true;
        }
      });
      currentVideo.muted = false;
      currentVideo.volume = 0.5;
      currentVideo.play();
      setIsPlaying(true);
    }
  };

  const handlePointerLeave = () => {
    if (isMobile) return; // Skip hover on mobile

    [videoTexture, videoTexture1].forEach((tex) => {
      const vid = tex?.image as HTMLVideoElement;
      if (vid && "pause" in vid) {
        vid.pause();
        vid.muted = true;
      }
    });
    setIsPlaying(false);
  };

  const handleClick = () => {
    if (!isMobile) return; // Skip click on desktop

    const currentVideo = currentTexture?.image as HTMLVideoElement;
    if (!currentVideo || !("play" in currentVideo)) return;

    if (isPlaying) {
      [videoTexture, videoTexture1].forEach((tex) => {
        const vid = tex?.image as HTMLVideoElement;
        if (vid && "pause" in vid) {
          vid.pause();
          vid.muted = true;
        }
      });
      setIsPlaying(false);
    } else {
      [videoTexture, videoTexture1].forEach((tex) => {
        const vid = tex?.image as HTMLVideoElement;
        if (vid && "pause" in vid) {
          vid.pause();
          vid.muted = true;
        }
      });
      currentVideo.muted = false;
      currentVideo.volume = 0.5;
      currentVideo.play();
      setIsPlaying(true);
    }
  };

  // const enableSound = () => {
  //   const currentVideo = currentTexture?.image as HTMLVideoElement;
  //   if (currentVideo && "play" in currentVideo) {
  //     currentVideo.muted = false;
  //     currentVideo.volume = 0.5;
  //     currentVideo.play();
  //   }
  // };

  return (
    <group
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      ref={modelRef}
      {...props}
      dispose={null}
      position={[targetPos.x + 2, targetPos.y + 2, 0]}
      scale={Math.min(screenPositionFactor * 12, 3.2)}
    >
      <group scale={0.22} name="Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={10.929}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Phone_21">
                <group name="Back_Camera_module001_1">
                  <group name="Lens001_0">
                    <mesh name="Object_11" geometry={nodes.Object_11.geometry} material={materials.Glass_Lens} />
                  </group>

                  <mesh name="Object_5" geometry={nodes.Object_5.geometry} material={materials.Metal_Camera_Frame} />
                  <mesh name="Object_6" geometry={nodes.Object_6.geometry} material={materials.Plastic_Camera_Frame} />
                  <mesh name="Object_7" geometry={nodes.Object_7.geometry} material={materials.Glass_Tint} />
                  <mesh name="Object_8" geometry={nodes.Object_8.geometry} material={materials.Glass} />
                  <mesh name="Object_9" geometry={nodes.Object_9.geometry} material={materials.Metal_Lens_Frame} />
                </group>
                <group name="Back_Camera_module002_3">
                  <group name="Lens002_2">
                    <mesh name="Object_19" geometry={nodes.Object_19.geometry} material={materials.Glass_Lens} />
                  </group>
                  <mesh name="Object_13" geometry={nodes.Object_13.geometry} material={materials.Metal_Camera_Frame} />
                  <mesh
                    name="Object_14"
                    geometry={nodes.Object_14.geometry}
                    material={materials.Plastic_Camera_Frame}
                  />
                  <mesh name="Object_15" geometry={nodes.Object_15.geometry} material={materials.Glass_Tint} />
                  <mesh name="Object_16" geometry={nodes.Object_16.geometry} material={materials.Glass} />
                  <mesh name="Object_17" geometry={nodes.Object_17.geometry} material={materials.Metal_Lens_Frame} />
                </group>
                <group name="Back_Camera_module003_5">
                  <group name="Lens003_4">
                    <mesh name="Object_27" geometry={nodes.Object_27.geometry} material={materials.Glass_Lens} />
                  </group>
                  <mesh name="Object_21" geometry={nodes.Object_21.geometry} material={materials.Metal_Camera_Frame} />
                  <mesh
                    name="Object_22"
                    geometry={nodes.Object_22.geometry}
                    material={materials.Plastic_Camera_Frame}
                  />
                  <mesh name="Object_23" geometry={nodes.Object_23.geometry} material={materials.Glass_Tint} />
                  <mesh name="Object_24" geometry={nodes.Object_24.geometry} material={materials.Glass} />
                  <mesh name="Object_25" geometry={nodes.Object_25.geometry} material={materials.Metal_Lens_Frame} />
                </group>
                <group name="Back_Flash_6">
                  <mesh name="Object_29" geometry={nodes.Object_29.geometry} material={materials.Plastic_Flash} />
                  <mesh name="Object_30" geometry={nodes.Object_30.geometry} material={materials.material} />
                  <mesh name="Object_31" geometry={nodes.Object_31.geometry} material={materials.Plastic_Flash_Tint} />
                </group>
                <group name="Back_Glass_7">
                  <mesh name="Object_33" geometry={nodes.Object_33.geometry} material={materials.Frosted_Glass} />
                  <mesh name="Object_34" geometry={nodes.Object_34.geometry} material={materials.Frosted_Glass_Tint} />
                </group>
                <group name="Back_Mic_mesh_8">
                  <mesh name="Object_36" geometry={nodes.Object_36.geometry} material={materials.Display} />
                </group>
                <group name="Body_9">
                  <mesh name="Object_38" geometry={nodes.Object_38.geometry} material={materials.Metal_Body} />
                  <mesh name="Object_39" geometry={nodes.Object_39.geometry} material={materials.Plastic_Body_Antena} />
                  <mesh name="Object_40" geometry={nodes.Object_40.geometry} material={materials.Metal} />
                </group>
                <group name="Button_Action_10">
                  <mesh name="Object_42" geometry={nodes.Object_42.geometry} material={materials.Metal_Body} />
                </group>
                <group name="Button_Power_OnOff_11">
                  <mesh name="Object_44" geometry={nodes.Object_44.geometry} material={materials.Metal_Body} />
                </group>
                <group name="Button_Volume_Down_12">
                  <mesh name="Object_46" geometry={nodes.Object_46.geometry} material={materials.Metal_Body} />
                </group>
                <group name="Button_Volume_Up_13">
                  <mesh name="Object_48" geometry={nodes.Object_48.geometry} material={materials.Metal_Body} />
                </group>
                <group name="Camera_Control_14">
                  <mesh name="Object_50" geometry={nodes.Object_50.geometry} material={materials.Metal} />
                  <mesh
                    name="Object_51"
                    geometry={nodes.Object_51.geometry}
                    material={materials.Glass_Camera_Control}
                  />
                </group>
                <group name="Front_Camera_module_15">
                  <mesh name="Object_53" geometry={nodes.Object_53.geometry} material={materials.Glass_Lens} />
                  <mesh
                    name="Object_54"
                    geometry={nodes.Object_54.geometry}
                    material={materials.Plastic_Camera_Frame}
                  />
                </group>
                <group name="LIDAR_16">
                  <mesh name="Object_56" geometry={nodes.Object_56.geometry} material={materials.Metal_Lens_Frame} />
                </group>
                <group name="Screen_17">
                  <mesh
                    name="Object_58"
                    // position={[0, 0, 0.003]}
                    geometry={nodes.Object_58.geometry}
                    material={materials.Glass_Tint}
                  />
                  <mesh
                    name="Plane"
                    geometry={nodes.Plane.geometry}
                    position={[0, 0, 0.003]}
                    rotation={[Math.PI / 2, Math.PI, 0]}
                    scale={[0.511 * 0.071, 0, 1.118 * 0.071]}
                  >
                    <meshBasicMaterial map={currentTexture} toneMapped={true} />
                  </mesh>
                </group>

                <group name="Screw_18">
                  <mesh name="Object_62" geometry={nodes.Object_62.geometry} material={materials.Metal} />
                </group>
                <group name="Speaker_mesh_19">
                  <mesh name="Object_64" geometry={nodes.Object_64.geometry} material={materials.Display} />
                </group>
                <group name="USB_C_port_20">
                  <mesh
                    name="Object_66"
                    geometry={nodes.Object_66.geometry}
                    material={materials.Plastic_Camera_Frame}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./i17x.glb");
