import * as THREE from "three";
import { useEffect, useMemo, useRef, useState, useCallback, useImperativeHandle, forwardRef } from "react";
import type { JSX } from "react";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { invalidate } from "@react-three/fiber";

gsap.registerPlugin(ScrollTrigger);
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
    Plastic_Body_Antena: THREE.MeshStandardMaterial;
    Metal: THREE.MeshStandardMaterial;
    Metal_Body: THREE.MeshStandardMaterial;
    Glass_Camera_Control: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

// ─── Section A: videos shown in the hero / first section ──────────────────────
// Arrow buttons navigate within this array while activeSectionRef === 0.
const SECTION_A_VIDEOS = [
  "./video.mp4",
  "https://res.cloudinary.com/decqmmcxq/video/upload/v1792171929/Reels_bdatr4.mp4",
  "./video2.mp4",
];

// ─── Section B: videos shown in tabbedPage / PhoneStats section ───────────────
// When the scroll enters tabbedPage this resets to index 0 every time.
// Arrow buttons navigate within this array while activeSectionRef === 1.
const SECTION_B_VIDEOS = [
  "https://res.cloudinary.com/decqmmcxq/video/upload/v1792171918/shorts_uxlnkc.mp4",
  "https://res.cloudinary.com/decqmmcxq/video/upload/v1792171929/Reels_bdatr4.mp4",
];

// ─── Navigation handle exposed to parent ───────────────────────────────────────
export interface ModelNavHandle {
  goNext: () => void;
  goPrev: () => void;
  /** Current active index within the active section (0-based) */
  getIndex: () => number;
  /** Total videos in the currently active section */
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

export const IphoneS = forwardRef<ModelNavHandle, JSX.IntrinsicElements["group"]>(function IphoneS(props, ref) {
  const { nodes, materials } = useGLTF("/IphoneS.glb") as unknown as GLTFResult;
  const modelRef = useRef<THREE.Group>(null);
  const tl1Ref = useRef<GSAPTimeline>(null);
  const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const planeRef = useRef<THREE.PlaneGeometry>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mountedRef = useRef(true);

  // ── Dual-section video pools (lazy-loaded) ───────────────────────────────
  // Pool key = (section << 16) | index — keeps a single flat Map for both sections.
  const videoElementsRef = useRef<Map<number, HTMLVideoElement>>(new Map());
  const videoTexturesRef = useRef<Map<number, THREE.VideoTexture>>(new Map());

  /**
   * 0 = Section A (hero / first section)
   * 1 = Section B (tabbedPage / PhoneStats section)
   */
  const activeSectionRef = useRef<0 | 1>(0);

  /**
   * Active video index within the current section (0-based).
   * Resets to 0 whenever the section changes.
   */
  const activeIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);

  /** Encode a (section, index) pair into a single pool key */
  const poolKey = (section: 0 | 1, index: number) => (section << 16) | index;

  /** Return the URL array for a given section */
  const urlsForSection = (section: 0 | 1) =>
    section === 0 ? SECTION_A_VIDEOS : SECTION_B_VIDEOS;

  /** Get or create a video texture for a given section + index */
  const getVideoTextureSectioned = useCallback(
    (section: 0 | 1, index: number): THREE.VideoTexture | null => {
      const urls = urlsForSection(section);
      if (index < 0 || index >= urls.length) return null;

      const key = poolKey(section, index);
      if (!videoTexturesRef.current.has(key)) {
        const vid = createVideoElement(urls[index]);
        const tex = createVideoTexture(vid);
        videoElementsRef.current.set(key, vid);
        videoTexturesRef.current.set(key, tex);
      }
      return videoTexturesRef.current.get(key)!;
    },
    [],
  );

  // Pre-load first two videos of Section A eagerly
  const initialTex0 = useMemo(
    () => getVideoTextureSectioned(0, 0),
    [getVideoTextureSectioned],
  );
  const initialTex1 = useMemo(
    () => getVideoTextureSectioned(0, 1),
    [getVideoTextureSectioned],
  );

  // Shader mapping: uProgress=0 → shows uTexture2, uProgress=1 → shows uTexture
  // Initial state: show Section A video 0 via uTexture2 (uProgress starts at 0)
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
    const activeKey = poolKey(activeSectionRef.current, activeIndexRef.current);
    const vid = videoElementsRef.current.get(activeKey);
    if (!vid) return;

    // Pause all others
    videoElementsRef.current.forEach((v, key) => {
      if (key !== activeKey && v && !v.paused) {
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
  }, []);

  // ── Immediately snap the shader to display a given texture (no wipe) ──────
  const snapToTexture = useCallback((tex: THREE.VideoTexture) => {
    const mat = shaderMaterialRef.current;
    if (!mat) return;
    // Normalised form: uTexture2 = tex, uProgress = 0
    mat.uniforms.uTexture.value = tex;
    mat.uniforms.uTexture2.value = tex;
    mat.uniforms.uProgress.value = 0;
    mat.uniformsNeedUpdate = true;
    invalidate();
  }, []);

  // ── Switch to a new section, always restarting from index 0 ───────────────
  const switchToSection = useCallback(
    (section: 0 | 1) => {
      // Kill any in-progress transition so snapToTexture is clean
      if (isTransitioningRef.current) {
        const uProgress = shaderMaterialRef.current?.uniforms.uProgress;
        if (uProgress) gsap.killTweensOf(uProgress);
        isTransitioningRef.current = false;
      }

      activeSectionRef.current = section;
      activeIndexRef.current = 0;
      stopAllVideos();

      const firstTex = getVideoTextureSectioned(section, 0);
      if (firstTex) {
        snapToTexture(firstTex);
      }

      // Pre-load the second video of the new section
      getVideoTextureSectioned(section, 1);
    },
    [getVideoTextureSectioned, snapToTexture, stopAllVideos],
  );

  // ── Navigation: next / prev (scoped to the active section) ────────────────
  const goNext = useCallback(() => {
    if (isTransitioningRef.current) return;
    const section = activeSectionRef.current;
    const currentIdx = activeIndexRef.current;
    const nextIdx = currentIdx + 1;
    if (nextIdx >= urlsForSection(section).length) return; // already at end

    isTransitioningRef.current = true;
    stopAllVideos();

    const mat = shaderMaterialRef.current;
    if (!mat) {
      isTransitioningRef.current = false;
      return;
    }

    // Shader: uProgress=0 shows uTexture2, uProgress=1 shows uTexture
    // Strategy: keep uTexture2 = current (no visual change at uProgress=0),
    //           put next into uTexture, then animate 0 → 1 to wipe into it.
    const currentTex = getVideoTextureSectioned(section, currentIdx);
    const nextTex = getVideoTextureSectioned(section, nextIdx);
    if (!currentTex || !nextTex) {
      isTransitioningRef.current = false;
      return;
    }

    mat.uniforms.uTexture.value = nextTex; // destination (revealed at uProgress=1)
    mat.uniforms.uTexture2.value = currentTex; // source (visible now at uProgress=0)
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

        // Pre-load adjacent video in the same section
        getVideoTextureSectioned(section, nextIdx + 1);
      },
    });
  }, [stopAllVideos, getVideoTextureSectioned]);

  const goPrev = useCallback(() => {
    if (isTransitioningRef.current) return;
    const section = activeSectionRef.current;
    const currentIdx = activeIndexRef.current;
    const prevIdx = currentIdx - 1;
    if (prevIdx < 0) return; // already at start

    isTransitioningRef.current = true;
    stopAllVideos();

    const mat = shaderMaterialRef.current;
    if (!mat) {
      isTransitioningRef.current = false;
      return;
    }

    // Shader: uProgress=0 shows uTexture2, uProgress=1 shows uTexture
    // After normalize, state is: uTexture2=current, uProgress=0 (showing current)
    // Strategy: put current into uTexture, set uProgress=1 (still shows current,
    //           no visual change), put prev into uTexture2, then animate 1 → 0
    //           to wipe into prevTex.
    const currentTex = getVideoTextureSectioned(section, currentIdx);
    const prevTex = getVideoTextureSectioned(section, prevIdx);
    if (!currentTex || !prevTex) {
      isTransitioningRef.current = false;
      return;
    }

    mat.uniforms.uTexture.value = currentTex; // visible at uProgress=1 (no flash)
    mat.uniforms.uTexture2.value = prevTex; // destination (revealed at uProgress=0)
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

        // Pre-load adjacent video in the same section
        getVideoTextureSectioned(section, prevIdx - 1);
      },
    });
  }, [stopAllVideos, getVideoTextureSectioned]);

  // ── Expose nav handle to parent ────────────────────────────────────────
  useImperativeHandle(
    ref,
    () => ({
      goNext,
      goPrev,
      getIndex: () => activeIndexRef.current,
      getTotal: () => urlsForSection(activeSectionRef.current).length,
    }),
    [goNext, goPrev],
  );

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
                onEnter: () => {
                  gsap.to("#phone-nav-btns", {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out",
                    pointerEvents: "auto",
                  });
                },
                onLeave: () => {
                  gsap.to("#phone-nav-btns", {
                    opacity: 0,
                    y: 10,
                    duration: 0.3,
                    ease: "power2.in",
                    pointerEvents: "none",
                  });
                },
                onLeaveBack: () => {
                  gsap.to("#phone-nav-btns", {
                    opacity: 0,
                    y: 10,
                    duration: 0.3,
                    ease: "power2.in",
                    pointerEvents: "none",
                  });
                },
                onEnterBack: () => {
                  gsap.to("#phone-nav-btns", {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out",
                    pointerEvents: "auto",
                  });
                },
              },
            })
            .to(model.position, {
              x: isMobileGSAP ? 0 : 0.75,
              y: -0.1,
              duration: 1,
            })
            .from(model.rotation, { y: "+=" + 2 * Math.PI, duration: 1, ease: "none" }, 0)
            .from("ho", { duration: 0.35 })
            .to(model.position, {
              x: isMobileGSAP ? 0 : -0.75,
              y: -0.1,
              duration: 2,
            })
            .to(model.rotation, { y: "-=" + Math.PI * 2, duration: 2, ease: "none" }, "<")
            .to(model.rotation, { duration: 0.5, ease: "none" });

          // ── tabbedPage ScrollTrigger ────────────────────────────────────────
          // Entering tabbedPage → switch to Section B (resets to index 0).
          // Leaving back above tabbedPage → switch back to Section A (resets to index 0).
          const tabbedPageST = ScrollTrigger.create({
            trigger: ".tabbedPage",
            start: "-20% top",
            end: "-10% top",
            scrub: false,
            onEnter: () => {
              if (!mountedRef.current) return;

              // Switch to Section B — always restarts from index 0
              switchToSection(1);

              const progress = shaderMaterialRef.current?.uniforms.uProgress;
              if (!progress) return;
              gsap.to(progress, {
                value: 1,
                duration: 0.5,
                ease: "power2.inOut",
                onUpdate: invalidate,
              });

              setIsPlaying(false);
            },
            onLeave: () => {
              if (!mountedRef.current) return;
              stopAllVideos();
              setIsPlaying(false);
            },
            onEnterBack: () => {
              if (!mountedRef.current) return;

              // Re-entering tabbedPage from below — restart Section B from index 0
              switchToSection(1);

              const progress = shaderMaterialRef.current?.uniforms.uProgress;
              if (!progress) return;
              gsap.to(progress, {
                value: 1,
                duration: 0.5,
                ease: "power2.inOut",
                onUpdate: invalidate,
              });

              setIsPlaying(false);
            },
            onLeaveBack: () => {
              if (!mountedRef.current) return;

              // Scrolled back above tabbedPage — restore Section A from index 0
              switchToSection(0);

              const progress = shaderMaterialRef.current?.uniforms.uProgress;
              if (!progress) return;
              gsap.to(progress, {
                value: 0,
                duration: 0.5,
                ease: "power2.inOut",
                onUpdate: invalidate,
              });

              setIsPlaying(false);
            },
          });

          return () => {
            stopAllVideos();
            tabbedPageST.kill(); // <-- critical
          };
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
      position={[2.3, -0.1, 0]}
      scale={0.65}
      {...props}
    >
      <group scale={[13.196, 12.335, 13.196]}>
        <mesh geometry={nodes.Object_5.geometry} material={materials.Metal_Camera_Frame} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.Plastic_Camera_Frame} />
        <mesh geometry={nodes.Object_7.geometry} material={materials.Glass_Tint} />
        <mesh geometry={nodes.Object_8.geometry} material={materials.Glass} />
        <mesh geometry={nodes.Object_9.geometry} material={materials.Metal_Lens_Frame} />
        <mesh geometry={nodes.Object_11.geometry} material={materials.Glass_Lens} />
        <mesh geometry={nodes.Object_13.geometry} material={materials.Metal_Camera_Frame} />
        <mesh geometry={nodes.Object_14.geometry} material={materials.Plastic_Camera_Frame} />
        <mesh geometry={nodes.Object_15.geometry} material={materials.Glass_Tint} />
        <mesh geometry={nodes.Object_16.geometry} material={materials.Glass} />
        <mesh geometry={nodes.Object_17.geometry} material={materials.Metal_Lens_Frame} />
        <mesh geometry={nodes.Object_19.geometry} material={materials.Glass_Lens} />
        <mesh geometry={nodes.Object_21.geometry} material={materials.Metal_Camera_Frame} />
        <mesh geometry={nodes.Object_22.geometry} material={materials.Plastic_Camera_Frame} />
        <mesh geometry={nodes.Object_23.geometry} material={materials.Glass_Tint} />
        <mesh geometry={nodes.Object_24.geometry} material={materials.Glass} />
        <mesh geometry={nodes.Object_25.geometry} material={materials.Metal_Lens_Frame} />
        <mesh geometry={nodes.Object_27.geometry} material={materials.Glass_Lens} />
        <mesh geometry={nodes.Object_29.geometry} material={materials.Plastic_Flash} />
        <mesh geometry={nodes.Object_30.geometry} material={materials.material} />
        <mesh geometry={nodes.Object_31.geometry} material={materials.Plastic_Flash_Tint} />
        <mesh geometry={nodes.Object_33.geometry} material={materials.Frosted_Glass} />
        <mesh geometry={nodes.Object_34.geometry} material={materials.Frosted_Glass_Tint} />
        <mesh geometry={nodes.Object_36.geometry} material={materials.Display} />
        <mesh geometry={nodes.Object_38.geometry} material={materials.Metal_Camera_Frame} />
        <mesh geometry={nodes.Object_39.geometry} material={materials.Plastic_Body_Antena} />
        <mesh geometry={nodes.Object_40.geometry} material={materials.Metal} />
        <mesh geometry={nodes.Object_42.geometry} material={materials.Metal_Body} />
        <mesh geometry={nodes.Object_44.geometry} material={materials.Metal_Body} />
        <mesh geometry={nodes.Object_46.geometry} material={materials.Metal_Body} />
        <mesh geometry={nodes.Object_48.geometry} material={materials.Metal_Body} />
        <mesh geometry={nodes.Object_50.geometry} material={materials.Metal} />
        <mesh geometry={nodes.Object_51.geometry} material={materials.Glass_Camera_Control} />
        <mesh geometry={nodes.Object_53.geometry} material={materials.Glass_Lens} />
        <mesh geometry={nodes.Object_54.geometry} material={materials.Plastic_Camera_Frame} />
        <mesh geometry={nodes.Object_56.geometry} material={materials.Metal_Lens_Frame} />
        <mesh geometry={nodes.Object_58.geometry} material={materials.Glass_Tint} />
        {/* <mesh geometry={nodes.Object_59.geometry} material={materials.Display} /> */}
        <mesh geometry={nodes.Object_62.geometry} material={materials.Metal} />
        {/* <mesh geometry={nodes.Object_64.geometry} material={materials.Display} /> */}
        <mesh geometry={nodes.Object_66.geometry} material={materials.Plastic_Camera_Frame} />
      </group>
      <mesh
        ref={planeRef}
        geometry={nodes.Plane.geometry}
        position={[0, 0, 0.023]}
        rotation={[-Math.PI / 2, Math.PI, 0]}
        scale={[-0.511, -0.694, -0.973]}
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
  );
});
useGLTF.preload("/IphoneS.glb");
