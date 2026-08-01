import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import type { JSX } from "react";
import { useGLTF, useVideoTexture } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { invalidate } from "@react-three/fiber";
// @ts-ignore
import vertexShader from "@/components/glsl/vertexShader.glsl";
// @ts-ignore
import fragmentShader from "@/components/glsl/fragmentShader.glsl";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

// const setupVideoTexture = (texture: THREE.VideoTexture) => {
//     texture.colorSpace = THREE.SRGBColorSpace;
//     texture.minFilter = THREE.LinearFilter;
//     texture.magFilter = THREE.LinearFilter;
//     texture.generateMipmaps = false;
//     return texture;
// };
export function Model(props: JSX.IntrinsicElements["group"]) {
  const modelRef = useRef<THREE.Group>(null);
  const tl1Ref = useRef<GSAPTimeline>(null);
  const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const planeRef = useRef<THREE.PlaneGeometry>(null);

  const { nodes, materials } = useGLTF("./iphone.glb") as unknown as GLTFResult;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const activeIndexRef = useRef(0);
  const mountedRef = useRef(true);

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

  const uniforms = useMemo(
    () => ({
      uTexture: { value: videoTexture1 },
      uTexture2: { value: videoTexture },
      uProgress: { value: -0.2 },
      uShadeStrength: { value: 0.1 },
      uTexSize: { value: new THREE.Vector2(1, 1) },
      uPlaneSize: { value: new THREE.Vector2(1, 1) },
    }),
    [videoTexture, videoTexture1],
  );
  // Keep a stable ref to the uniforms so GSAP callbacks always write to the
  // same object that the ShaderMaterial holds (avoids stale-closure issues).
  const uniformsRef = useRef(uniforms);
  uniformsRef.current = uniforms;
  const videos = [videoTexture?.image as HTMLVideoElement, videoTexture1?.image as HTMLVideoElement];

  const stopAllVideos = () => {
    videos.forEach((vid) => {
      if (vid && "pause" in vid) {
        vid.pause();
        vid.muted = true;
      }
    });
  };

  const playActiveVideo = () => {
    const vid = videos[activeIndexRef.current];
    if (!vid) return;

    const otherVid = videos[activeIndexRef.current === 0 ? 1 : 0];
    if (otherVid && !otherVid.paused) {
      otherVid.pause();
      otherVid.muted = true;
    }

    vid.muted = false;
    vid.volume = 0.5;
    if (vid.paused) {
      vid.currentTime = 0; // only reset when actually starting fresh
      vid.play().catch(() => { }); // swallow AbortError from rapid play/pause races
    }
  };

  const hoverTimeoutRef = useRef<number | null>(null);

  const handlePointerEnter = () => {
    if (isMobile) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (isPlaying) return; // already playing — don't restart
    playActiveVideo();
    setIsPlaying(true);
  };

  const handlePointerLeave = () => {
    if (isMobile) return;
    // Debounce: only actually stop if the pointer hasn't re-entered
    // within this window (filters out raycast seam flicker).
    hoverTimeoutRef.current = window.setTimeout(() => {
      stopAllVideos();
      setIsPlaying(false);
      hoverTimeoutRef.current = null;
    }, 120);
  };

  const handleClick = () => {
    if (!isMobile) return;

    if (isPlaying) {
      stopAllVideos();
      setIsPlaying(false);
    } else {
      playActiveVideo();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1000 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  // Stop all videos and mark as unmounted when navigating away
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      stopAllVideos();
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  useGSAP(
    () => {
      const tickerCallback = () => invalidate();
      gsap.ticker.add(tickerCallback);
      const model = modelRef.current;
      if (!model) return;
      if (!shaderMaterialRef.current) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 700px)",
          isMobile: "(max-width: 699px)",
        },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };

          tl1Ref.current = gsap
            .timeline({
              defaults: {
                ease: "none",
              },
              scrollTrigger: {
                trigger: ".PhoneStats",
                start: "-700px top",
                end: "bottom top",
                scrub: 0.5,
                // markers: true,
                onUpdate: () => {
                  invalidate();
                },
              },
            })
            .from(model.position, {
              x: isMobile ? 0 : 2,
              y: 4,
              duration: 1,
            })
            .from(model.rotation, { y: Math.PI, duration: 1, ease: "none" }, 0)
            .from("ho", { duration: 1 })
            .to(model.position, {
              x: isMobile ? 0 : -0.7,
              y: 0,
              duration: 1,
            })
            .to(model.rotation, { y: -Math.PI * 2, duration: 1, ease: "none" }, "-=.7")
            .to(model.rotation, { duration: 1, ease: "none" })
            .to(model.rotation, {
              y: -1 * Math.PI,
              duration: 1,
            })
            .to(model.position, { x: isMobile ? 0 : -4, y: -1, duration: 1, ease: "none" }, "<");
        },
      );
      const tabbedPageST = ScrollTrigger.create({
        trigger: ".tabbedPage",
        start: "-20% top",
        end: "-10% top",
        scrub: false,
        // --------------------------------
        // Entering tabbedPage
        // uProgress: current → 1
        // --------------------------------
        onEnter: () => {
          if (!mountedRef.current) return;
          const progress = shaderMaterialRef.current?.uniforms.uProgress;

          if (!progress) return;
          gsap.to(progress, {
            value: 1,
            duration: 0.5,
            ease: "power2.inOut",
            onUpdate: invalidate,
          });

          activeIndexRef.current = 1;

          stopAllVideos();
        },

        // --------------------------------
        // Leaving tabbedPage from bottom
        // --------------------------------
        onLeave: () => {
          if (!mountedRef.current) return;

          stopAllVideos();
          setIsPlaying(false);
        },

        // --------------------------------
        // Coming back into tabbedPage
        // uProgress: current → 1
        // --------------------------------
        onEnterBack: () => {
          if (!mountedRef.current) return;

          const progress = shaderMaterialRef.current?.uniforms.uProgress;

          if (!progress) return;
          gsap.to(progress, {
            value: 1,
            duration: 0.5,
            ease: "power2.inOut",
            onUpdate: invalidate,
          });

          activeIndexRef.current = 1;

          stopAllVideos();
        },

        // --------------------------------
        // Scrolling back above tabbedPage
        // uProgress: current → 0
        // --------------------------------
        onLeaveBack: () => {
          if (!mountedRef.current) return;

          const progress = shaderMaterialRef.current?.uniforms.uProgress;

          if (!progress) return;
          gsap.to(progress, {
            value: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onUpdate: invalidate,
          });

          activeIndexRef.current = 0;

          stopAllVideos();
        },
      });

      return () => {
        stopAllVideos();
        gsap.ticker.remove(tickerCallback);
        tabbedPageST.kill(); // <-- critical
        mm.revert();
      };
    },
    { dependencies: [] },
  );

  return (
    <group
      onPointerOver={handlePointerEnter}
      onPointerOut={handlePointerLeave}
      onClick={handleClick}
      ref={modelRef}
      {...props}
      dispose={null}
      position={[0.7, 0, 0]}
      scale={3.5}
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
                  <mesh name="Object_14" geometry={nodes.Object_14.geometry} material={materials.Plastic_Camera_Frame} />
                  <mesh name="Object_15" geometry={nodes.Object_15.geometry} material={materials.Glass_Tint} />
                  <mesh name="Object_16" geometry={nodes.Object_16.geometry} material={materials.Glass} />
                  <mesh name="Object_17" geometry={nodes.Object_17.geometry} material={materials.Metal_Lens_Frame} />
                </group>
                <group name="Back_Camera_module003_5">
                  <group name="Lens003_4">
                    <mesh name="Object_27" geometry={nodes.Object_27.geometry} material={materials.Glass_Lens} />
                  </group>
                  <mesh name="Object_21" geometry={nodes.Object_21.geometry} material={materials.Metal_Camera_Frame} />
                  <mesh name="Object_22" geometry={nodes.Object_22.geometry} material={materials.Plastic_Camera_Frame} />
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
                  <mesh name="Object_51" geometry={nodes.Object_51.geometry} material={materials.Glass_Camera_Control} />
                </group>
                <group name="Front_Camera_module_15">
                  <mesh name="Object_53" geometry={nodes.Object_53.geometry} material={materials.Glass_Lens} />
                  <mesh name="Object_54" geometry={nodes.Object_54.geometry} material={materials.Plastic_Camera_Frame} />
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
                    ref={planeRef}
                    geometry={nodes.Plane.geometry}
                    position={[0, 0, 0.003]}
                    rotation={[Math.PI / 2, Math.PI, 0]}
                    scale={[0.511 * 0.071, 0, 1.118 * 0.071]}
                  >
                    <shaderMaterial
                      ref={shaderMaterialRef}
                      // Pass the object directly — NOT spread — so GSAP callbacks
                      // mutate the exact same uniform objects the GPU holds.
                      uniforms={uniforms}
                      vertexShader={vertexShader}
                      fragmentShader={fragmentShader}
                      transparent={false}
                    />
                  </mesh>
                </group>

                <group name="Screw_18">
                  <mesh name="Object_62" geometry={nodes.Object_62.geometry} material={materials.Metal} />
                </group>
                <group name="Speaker_mesh_19">
                  <mesh name="Object_64" geometry={nodes.Object_64.geometry} material={materials.Display} />
                </group>
                <group name="USB_C_port_20">
                  <mesh name="Object_66" geometry={nodes.Object_66.geometry} material={materials.Plastic_Camera_Frame} />
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
