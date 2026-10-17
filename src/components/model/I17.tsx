import * as THREE from "three";
import { useEffect, useMemo, useRef, useState, useCallback, useImperativeHandle, forwardRef } from "react";
import type { JSX } from "react";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { invalidate } from "@react-three/fiber";
// @ts-ignore
import vertexShader from "@/components/glsl/vertexShader.glsl";
// @ts-ignore
import fragmentShader from "@/components/glsl/fragmentShader.glsl";

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

// ─── Video reel URLs ───────────────────────────────────────────────────────────
// Add as many as you like — they will be loaded on demand.
const VIDEO_URLS = [
  "./video.mp4",
  "https://res.cloudinary.com/decqmmcxq/video/upload/v1792171929/Reels_bdatr4.mp4",
  "./video2.mp4",
  "https://res.cloudinary.com/decqmmcxq/video/upload/v1792171918/shorts_uxlnkc.mp4",
  "./video.mp4",
];

// ─── Navigation handle exposed to parent ───────────────────────────────────────
export interface ModelNavHandle {
  goNext: () => void;
  goPrev: () => void;
  /** Current active index (0-based) */
  getIndex: () => number;
  /** Total videos available */
  getTotal: () => number;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
/** Create a <video> element configured for texture use */
function createVideoElement(src: string): HTMLVideoElement {
  const vid = document.createElement("video");
  vid.src = src;
  vid.crossOrigin = "anonymous";
  vid.playsInline = true;
  vid.muted = true;
  vid.loop = false;
  vid.preload = "auto";
  vid.setAttribute("playsinline", "");
  return vid;
}

/** Create a THREE.VideoTexture from a <video> element */
function createVideoTexture(vid: HTMLVideoElement): THREE.VideoTexture {
  const tex = new THREE.VideoTexture(vid);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  return tex;
}

// const setupVideoTexture = (texture: THREE.VideoTexture) => {
//     texture.colorSpace = THREE.SRGBColorSpace;
//     texture.minFilter = THREE.LinearFilter;
//     texture.magFilter = THREE.LinearFilter;
//     texture.generateMipmaps = false;
//     return texture;
// };

export const Model = forwardRef<ModelNavHandle, JSX.IntrinsicElements["group"]>(
  function Model(props, ref) {
    const modelRef = useRef<THREE.Group>(null);
    const tl1Ref = useRef<GSAPTimeline>(null);
    const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null);
    const planeRef = useRef<THREE.PlaneGeometry>(null);

    const { nodes, materials } = useGLTF("./iphone.glb") as unknown as GLTFResult;
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const mountedRef = useRef(true);

    // ── Video pool (lazy-loaded) ───────────────────────────────────────────
    const videoElementsRef = useRef<Map<number, HTMLVideoElement>>(new Map());
    const videoTexturesRef = useRef<Map<number, THREE.VideoTexture>>(new Map());
    const activeIndexRef = useRef(0);
    const isTransitioningRef = useRef(false);

    /** Get or create a video element + texture for a given index */
    const getVideoTexture = useCallback((index: number): THREE.VideoTexture | null => {
      if (index < 0 || index >= VIDEO_URLS.length) return null;

      if (!videoTexturesRef.current.has(index)) {
        const vid = createVideoElement(VIDEO_URLS[index]);
        const tex = createVideoTexture(vid);
        videoElementsRef.current.set(index, vid);
        videoTexturesRef.current.set(index, tex);
      }
      return videoTexturesRef.current.get(index)!;
    }, []);

    /** Get or create just the video element for a given index */
    const getVideoElement = useCallback((index: number): HTMLVideoElement | null => {
      if (index < 0 || index >= VIDEO_URLS.length) return null;
      // Ensure it's created
      getVideoTexture(index);
      return videoElementsRef.current.get(index) ?? null;
    }, [getVideoTexture]);

    // Pre-load the first two videos eagerly
    const initialTex0 = useMemo(() => getVideoTexture(0), [getVideoTexture]);
    const initialTex1 = useMemo(() => getVideoTexture(1), [getVideoTexture]);

    // Shader mapping: uProgress=0 → shows uTexture2, uProgress=1 → shows uTexture
    // Initial state: show video 0 via uTexture2 (since uProgress starts at 0)
    const uniforms = useMemo(
      () => ({
        uTexture: { value: initialTex1 },
        uTexture2: { value: initialTex0 },
        uProgress: { value: 0 },
        uShadeStrength: { value: 0.1 },
        uTexSize: { value: new THREE.Vector2(1, 1) },
        uPlaneSize: { value: new THREE.Vector2(1, 1) },
      }),
      [initialTex0, initialTex1],
    );

    const uniformsRef = useRef(uniforms);
    uniformsRef.current = uniforms;

    // ── Video controls ─────────────────────────────────────────────────────
    const stopAllVideos = useCallback(() => {
      videoElementsRef.current.forEach((vid) => {
        if (vid && "pause" in vid) {
          vid.pause();
          vid.muted = true;
        }
      });
    }, []);

    const playActiveVideo = useCallback(() => {
      const vid = getVideoElement(activeIndexRef.current);
      if (!vid) return;

      // Pause all others
      videoElementsRef.current.forEach((v, idx) => {
        if (idx !== activeIndexRef.current && v && !v.paused) {
          v.pause();
          v.muted = true;
        }
      });

      vid.muted = false;
      vid.volume = 0.5;
      if (vid.paused) {
        vid.currentTime = 0;
        vid.play().catch(() => { }); // swallow AbortError
      }
    }, [getVideoElement]);

    // ── Navigation: next / prev ────────────────────────────────────────────
    const goNext = useCallback(() => {
      if (isTransitioningRef.current) return;
      const currentIdx = activeIndexRef.current;
      const nextIdx = currentIdx + 1;
      if (nextIdx >= VIDEO_URLS.length) return; // already at end

      isTransitioningRef.current = true;
      stopAllVideos();

      const mat = shaderMaterialRef.current;
      if (!mat) { isTransitioningRef.current = false; return; }

      // Shader: uProgress=0 shows uTexture2, uProgress=1 shows uTexture
      // Strategy: keep uTexture2 = current (no visual change at uProgress=0),
      //           put next into uTexture, then animate 0 → 1 to wipe into it.
      const currentTex = getVideoTexture(currentIdx);
      const nextTex = getVideoTexture(nextIdx);
      if (!currentTex || !nextTex) { isTransitioningRef.current = false; return; }

      mat.uniforms.uTexture.value = nextTex;      // destination (revealed at uProgress=1)
      mat.uniforms.uTexture2.value = currentTex;  // source (visible now at uProgress=0)
      mat.uniforms.uProgress.value = 0;
      mat.uniformsNeedUpdate = true;

      gsap.to(mat.uniforms.uProgress, {
        value: 1,
        duration: 0.6,
        ease: "power2.inOut",
        onUpdate: invalidate,
        onComplete: () => {
          activeIndexRef.current = nextIdx;
          // Normalize: lock display to nextTex via uTexture2 at uProgress=0
          mat.uniforms.uTexture.value = nextTex;
          mat.uniforms.uTexture2.value = nextTex;
          mat.uniforms.uProgress.value = 0;
          mat.uniformsNeedUpdate = true;
          isTransitioningRef.current = false;
          invalidate();

          // Pre-load adjacent videos
          if (nextIdx + 1 < VIDEO_URLS.length) getVideoTexture(nextIdx + 1);
        },
      });
    }, [stopAllVideos, getVideoTexture]);

    const goPrev = useCallback(() => {
      if (isTransitioningRef.current) return;
      const currentIdx = activeIndexRef.current;
      const prevIdx = currentIdx - 1;
      if (prevIdx < 0) return; // already at start

      isTransitioningRef.current = true;
      stopAllVideos();

      const mat = shaderMaterialRef.current;
      if (!mat) { isTransitioningRef.current = false; return; }

      // Shader: uProgress=0 shows uTexture2, uProgress=1 shows uTexture
      // After normalize, state is: uTexture2=current, uProgress=0 (showing current)
      // Strategy: put current into uTexture, set uProgress=1 (still shows current,
      //           no visual change), put prev into uTexture2, then animate 1 → 0
      //           to wipe into prevTex.
      const currentTex = getVideoTexture(currentIdx);
      const prevTex = getVideoTexture(prevIdx);
      if (!currentTex || !prevTex) { isTransitioningRef.current = false; return; }

      mat.uniforms.uTexture.value = currentTex;   // visible at uProgress=1 (no flash)
      mat.uniforms.uTexture2.value = prevTex;      // destination (revealed at uProgress=0)
      mat.uniforms.uProgress.value = 1;
      mat.uniformsNeedUpdate = true;

      gsap.to(mat.uniforms.uProgress, {
        value: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onUpdate: invalidate,
        onComplete: () => {
          activeIndexRef.current = prevIdx;
          // Normalize: lock display to prevTex via uTexture2 at uProgress=0
          mat.uniforms.uTexture.value = prevTex;
          mat.uniforms.uTexture2.value = prevTex;
          mat.uniforms.uProgress.value = 0;
          mat.uniformsNeedUpdate = true;
          isTransitioningRef.current = false;
          invalidate();

          // Pre-load adjacent
          if (prevIdx - 1 >= 0) getVideoTexture(prevIdx - 1);
        },
      });
    }, [stopAllVideos, getVideoTexture]);

    // ── Expose nav handle to parent ────────────────────────────────────────
    useImperativeHandle(ref, () => ({
      goNext,
      goPrev,
      getIndex: () => activeIndexRef.current,
      getTotal: () => VIDEO_URLS.length,
    }), [goNext, goPrev]);

    // ── Hover / click to play active video ─────────────────────────────────
    const hoverTimeoutRef = useRef<number | null>(null);

    const handlePointerEnter = () => {
      if (isMobile) return;
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      if (isPlaying) return;
      playActiveVideo();
      setIsPlaying(true);
    };

    const handlePointerLeave = () => {
      if (isMobile) return;
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
        // Dispose all textures
        videoTexturesRef.current.forEach((tex) => tex.dispose());
        videoTexturesRef.current.clear();
        videoElementsRef.current.clear();
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
            isMobileGSAP: "(max-width: 699px)",
          },
          (context) => {
            const { isMobileGSAP } = context.conditions as { isMobileGSAP: boolean };

            tl1Ref.current = gsap
              .timeline({
                defaults: {
                  ease: "none",
                },
                scrollTrigger: {
                  trigger: ".PhoneStats",
                  start: "-500px top",
                  end: "50% top",
                  scrub: true,
                  onUpdate: () => {
                    invalidate();
                  },
                },
              })
              .to(model.position, {
                x: isMobileGSAP ? 0 : 0.7,
                y: -0.1,
                duration: 1,
              })
              .from(model.rotation, { y: "+=" + 2 * Math.PI, duration: 1, ease: "none" }, 0)
              .from("ho", { duration: 0.35 })
              .to(model.position, {
                x: isMobileGSAP ? 0 : -0.7,
                y: -0.1,
                duration: 2,
              })
              .to(model.rotation, { y: "-=" + Math.PI * 2, duration: 2, ease: "none" }, "<")
              .to(model.rotation, { duration: 0.5, ease: "none" })
          },
        );

        return () => {
          stopAllVideos();
          gsap.ticker.remove(tickerCallback);
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
        position={[2.3, -.1, 0]}
        scale={8.2}
      >
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
              rotation={[-Math.PI / 2, 0, 0]}
              scale={[0.511 * 0.071, 0, 1.118 * 0.071]}
            >
              <shaderMaterial
                ref={shaderMaterialRef}
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent={false}
                side={THREE.DoubleSide}
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
    );
  }
);

useGLTF.preload("./i17x.glb");
