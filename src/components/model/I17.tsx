import * as THREE from "three";
import { useMemo, useRef, useState } from "react";
import type { JSX } from "react";
import { useGLTF, useVideoTexture } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useThree } from "@react-three/fiber";

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
  const { nodes, materials } = useGLTF("../../../public/i17x.glb") as unknown as GLTFResult;
  const [texIndex, setTexIndex] = useState(0);

  const viewport = useThree((state) => state.viewport);

  const screenPositionFactor = Math.min(window.innerWidth / 1700, 0.7);
  console.log(screenPositionFactor, "screen");

  useGSAP(() => {
    if (!modelRef.current) return;

    const initialRotationY = modelRef.current.rotation.y;
    const initialRotationZ = modelRef.current.rotation.z;
    // Initial animation - entrance (using fromTo for better control)
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
          invalidateOnRefresh: true,
        },
        ease: "none",
      }
    );
    console.log(viewport.width);

    gsap.from(modelRef.current.position, {
      y: 2,
      x: 2,
      scrollTrigger: {
        trigger: "#video-page",
        start: "-20% top",
        end: "30% top",
        scrub: 1,
        invalidateOnRefresh: true,
      },
      ease: "none",
    });
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
          invalidateOnRefresh: true,
          // Change texture at 50% progress (middle of rotation)
          onUpdate: (self) => {
            // Change to texture 1 when scrolling forward past 50%
            // Change back to texture 0 when scrolling back below 50%
            if (self.progress > 0.5) {
              setTexIndex(1);
            } else {
              setTexIndex(0);
            }
          },
          // markers: true,
        },
        ease: "none",
      }
    )

    gsap.to(modelRef.current.position, {
      y: 2,
      x: 0,
      scrollTrigger: {
        trigger: "#lastPage",
        start: "-20% top",
        end: "30% top",
        scrub: 1,
        invalidateOnRefresh: true,
      },
      ease: "none",
    });
    ScrollTrigger.refresh();
  }, []);

  const videoTexture = useVideoTexture("../../../public/video.mp4", {
    muted: true,
    loop: false,
    start: false,
  });
  const videoTexture1 = useVideoTexture("../../../public/video2.mp4", {
    muted: true,
    loop: false,
    start: false,
  });

  // Setup textures
  useMemo(() => {
    setupVideoTexture(videoTexture);
    setupVideoTexture(videoTexture1);
  }, [videoTexture, videoTexture1]);

  const textures = [videoTexture, videoTexture1];
  const currentTexture = textures[texIndex];
  const handlePointerEnter = () => {
    if (videoTexture?.image && "play" in videoTexture.image) {
      const videoEl = videoTexture.image as HTMLVideoElement;
      videoEl.muted = false; // enable sound
      videoEl.volume = 0.5; // set volume to 50%
      videoEl.play();
    }

    if (videoTexture1?.image && "play" in videoTexture1.image) {
      const videoEl1 = videoTexture1.image as HTMLVideoElement;
      videoEl1.muted = false;
      videoEl1.volume = 0.5;
      videoEl1.play();
    }
  };

  const handlePointerLeave = () => {
    if (videoTexture?.image && "pause" in videoTexture.image) {
      (videoTexture.image as HTMLVideoElement).pause();
    }
    if (videoTexture1?.image && "pause" in videoTexture1.image) {
      (videoTexture1.image as HTMLVideoElement).pause();
    }
  };
  // To ensure the video is stopped, you can also pause it explicitly:
  // if (videoTexture?.image && "pause" in videoTexture.image) {
  //   (videoTexture.image as HTMLVideoElement).pause();
  // }

  const enableSound = () => {
    [videoTexture, videoTexture1].forEach((tex) => {
      const vid = tex.image as HTMLVideoElement;
      vid.muted = false;
      vid.play();
    });
  };

  return (
    <group
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={enableSound}
      ref={modelRef}
      {...props}
      dispose={null}
      position={[
        screenPositionFactor < 0.4 ? 0 : screenPositionFactor,
        screenPositionFactor > 0.4 ? 0 : -screenPositionFactor,
        0,
      ]}
      scale={Math.min(screenPositionFactor * 10, 3)}
    >
      <group scale={0.22} name="Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={10.929}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Phone_21">
                <group name="Back_Camera_module001_1">
                  <group name="Lens001_0">
                    <mesh
                      name="Object_11"
                      castShadow
                      receiveShadow
                      geometry={nodes.Object_11.geometry}
                      material={materials.Glass_Lens}
                    />
                  </group>
                  <mesh
                    name="Object_5"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_5.geometry}
                    material={materials.Metal_Camera_Frame}
                  />
                  <mesh
                    name="Object_6"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_6.geometry}
                    material={materials.Plastic_Camera_Frame}
                  />
                  <mesh
                    name="Object_7"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_7.geometry}
                    material={materials.Glass_Tint}
                  />
                  <mesh
                    name="Object_8"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_8.geometry}
                    material={materials.Glass}
                  />
                  <mesh
                    name="Object_9"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_9.geometry}
                    material={materials.Metal_Lens_Frame}
                  />
                </group>
                <group name="Back_Camera_module002_3">
                  <group name="Lens002_2">
                    <mesh
                      name="Object_19"
                      castShadow
                      receiveShadow
                      geometry={nodes.Object_19.geometry}
                      material={materials.Glass_Lens}
                    />
                  </group>
                  <mesh
                    name="Object_13"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_13.geometry}
                    material={materials.Metal_Camera_Frame}
                  />
                  <mesh
                    name="Object_14"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_14.geometry}
                    material={materials.Plastic_Camera_Frame}
                  />
                  <mesh
                    name="Object_15"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_15.geometry}
                    material={materials.Glass_Tint}
                  />
                  <mesh
                    name="Object_16"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_16.geometry}
                    material={materials.Glass}
                  />
                  <mesh
                    name="Object_17"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_17.geometry}
                    material={materials.Metal_Lens_Frame}
                  />
                </group>
                <group name="Back_Camera_module003_5">
                  <group name="Lens003_4">
                    <mesh
                      name="Object_27"
                      castShadow
                      receiveShadow
                      geometry={nodes.Object_27.geometry}
                      material={materials.Glass_Lens}
                    />
                  </group>
                  <mesh
                    name="Object_21"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_21.geometry}
                    material={materials.Metal_Camera_Frame}
                  />
                  <mesh
                    name="Object_22"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_22.geometry}
                    material={materials.Plastic_Camera_Frame}
                  />
                  <mesh
                    name="Object_23"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_23.geometry}
                    material={materials.Glass_Tint}
                  />
                  <mesh
                    name="Object_24"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_24.geometry}
                    material={materials.Glass}
                  />
                  <mesh
                    name="Object_25"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_25.geometry}
                    material={materials.Metal_Lens_Frame}
                  />
                </group>
                <group name="Back_Flash_6">
                  <mesh
                    name="Object_29"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_29.geometry}
                    material={materials.Plastic_Flash}
                  />
                  <mesh
                    name="Object_30"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_30.geometry}
                    material={materials.material}
                  />
                  <mesh
                    name="Object_31"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_31.geometry}
                    material={materials.Plastic_Flash_Tint}
                  />
                </group>
                <group name="Back_Glass_7">
                  <mesh
                    name="Object_33"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_33.geometry}
                    material={materials.Frosted_Glass}
                  />
                  <mesh
                    name="Object_34"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_34.geometry}
                    material={materials.Frosted_Glass_Tint}
                  />
                </group>
                <group name="Back_Mic_mesh_8">
                  <mesh
                    name="Object_36"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_36.geometry}
                    material={materials.Display}
                  />
                </group>
                <group name="Body_9">
                  <mesh
                    name="Object_38"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_38.geometry}
                    material={materials.Metal_Body}
                  />
                  <mesh
                    name="Object_39"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_39.geometry}
                    material={materials.Plastic_Body_Antena}
                  />
                  <mesh
                    name="Object_40"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_40.geometry}
                    material={materials.Metal}
                  />
                </group>
                <group name="Button_Action_10">
                  <mesh
                    name="Object_42"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_42.geometry}
                    material={materials.Metal_Body}
                  />
                </group>
                <group name="Button_Power_OnOff_11">
                  <mesh
                    name="Object_44"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_44.geometry}
                    material={materials.Metal_Body}
                  />
                </group>
                <group name="Button_Volume_Down_12">
                  <mesh
                    name="Object_46"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_46.geometry}
                    material={materials.Metal_Body}
                  />
                </group>
                <group name="Button_Volume_Up_13">
                  <mesh
                    name="Object_48"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_48.geometry}
                    material={materials.Metal_Body}
                  />
                </group>
                <group name="Camera_Control_14">
                  <mesh
                    name="Object_50"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_50.geometry}
                    material={materials.Metal}
                  />
                  <mesh
                    name="Object_51"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_51.geometry}
                    material={materials.Glass_Camera_Control}
                  />
                </group>
                <group name="Front_Camera_module_15">
                  <mesh
                    name="Object_53"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_53.geometry}
                    material={materials.Glass_Lens}
                  />
                  <mesh
                    name="Object_54"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_54.geometry}
                    material={materials.Plastic_Camera_Frame}
                  />
                </group>
                <group name="LIDAR_16">
                  <mesh
                    name="Object_56"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_56.geometry}
                    material={materials.Metal_Lens_Frame}
                  />
                </group>
                <group name="Screen_17">
                  <mesh
                    name="Object_58"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_58.geometry}
                    material={materials.Glass_Tint}
                  />
                  {/* <mesh
                    name="Object_59"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_59.geometry}
                    material={materials.Display}
                  /> */}
                  <mesh
                    name="Plane"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane.geometry}
                    position={[0, 0, 0.003]}
                    rotation={[Math.PI / 2, 0, Math.PI]}
                    scale={[-0.511 * 0.071, -0.694 * 0.071, -1.118 * 0.071]}
                  >
                    <meshBasicMaterial map={currentTexture} side={THREE.DoubleSide} toneMapped={false} />
                  </mesh>
                </group>
                <group name="Screw_18">
                  <mesh
                    name="Object_62"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_62.geometry}
                    material={materials.Metal}
                  />
                </group>
                <group name="Speaker_mesh_19">
                  <mesh
                    name="Object_64"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_64.geometry}
                    material={materials.Display}
                  />
                </group>
                <group name="USB_C_port_20">
                  <mesh
                    name="Object_66"
                    castShadow
                    receiveShadow
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

useGLTF.preload("../../../public/i17x.glb");
