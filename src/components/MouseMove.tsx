import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

const MouseMove = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<"default" | "link" | "drag" | "product">("default");

  useGSAP((_, contextSafe) => {
    const cursor = cursorRef.current;
    if (!cursor || !contextSafe) return;

    const moveX = gsap.quickTo(cursor, "x", {
      duration: 0.25,
      ease: "power3.out",
    });

    const moveY = gsap.quickTo(cursor, "y", {
      duration: 0.25,
      ease: "power3.out",
    });

    const move = contextSafe((e: MouseEvent) => {
      moveX(e.clientX);
      moveY(e.clientY);
    });
    const enter = contextSafe((e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const type = target.closest("[data-cursor]")?.getAttribute("data-cursor");

      if (type) setVariant(type as any);
    });

    const leave = contextSafe(() => setVariant("default"));

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", enter);
    window.addEventListener("mouseout", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", enter);
      window.removeEventListener("mouseout", leave);
    };
  });

  return (
    <div
      ref={cursorRef}
      className={`fixed left-0 top-0 z-990 text-black pointer-events-none flex items-center justify-center rounded-full
    transition-all duration-300 ease-[cubic-bezier(.19,1,.22,1)]
    ${variant === "default" && "w-4 h-4 bg-white"}
    ${variant === "link" && "w-15 h-15 bg-white"}
    ${variant === "drag" && "w-20 h-20 border-dashed border backdrop-blur-xs border-white/40 "}
    ${variant === "product" && "w-28 h-28 border border-white "}
  `}
      style={{
        transform: "translate(-50%, -50%)",
        mixBlendMode: "difference",
      }}
    >
      {variant === "drag" && (
        <div className="flex items-center gap-2 text-white/80 text-xs tracking-widest uppercase">
          <ChevronLeft size={14} />
          Drag
          <ChevronRight size={14} />
        </div>
      )}
    </div>
  );
};

export default MouseMove;
