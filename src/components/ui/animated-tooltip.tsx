import { useState, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";

export const AnimatedTooltip = ({
  items,
  className,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const tooltipRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const isVisibleRef = useRef<Record<number, boolean>>({});

  const { contextSafe } = useGSAP(() => {
    if (!tooltipRefs.current) return;
    Object.values(tooltipRefs.current).forEach((el) => {
      if (el) {
        gsap.set(el, {
          autoAlpha: 0,
          scale: 0.6,
          y: 20,
          x: 0,
          rotation: 0,
          transformOrigin: "center bottom",
        });
      }
    });
  }, []);

  const handleMouseMove = contextSafe((event: React.MouseEvent<HTMLImageElement>, id: number) => {
    // Only animate if this tooltip is currently visible
    if (hoveredIndex !== id) return;

    const tooltip = tooltipRefs.current[id];
    if (!tooltip) return;

    const halfWidth = event.currentTarget.offsetWidth / 2;
    const offsetX = event.nativeEvent.offsetX - halfWidth;

    const rotate = gsap.utils.mapRange(-halfWidth, halfWidth, -45, 45, offsetX);
    const translateX = gsap.utils.mapRange(-halfWidth, halfWidth, -50, 50, offsetX);

    gsap.to(tooltip, {
      x: translateX,
      rotation: rotate,
      ease: "power2.out",
      duration: 0.15,
      overwrite: "auto",
    });
  });

  const handleMouseEnter = contextSafe((id: number) => {
    // Prevent re-entering if already visible
    if (isVisibleRef.current[id]) return;

    isVisibleRef.current[id] = true;
    setHoveredIndex(id);
    const tooltip = tooltipRefs.current[id];
    if (!tooltip) return;

    // Kill any existing animations before showing
    gsap.killTweensOf(tooltip);

    gsap.to(tooltip, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: "back.out(1.7)",
    });
  });

  const handleMouseLeave = contextSafe((id: number) => {
    // Prevent re-leaving if already hidden
    if (!isVisibleRef.current[id]) return;

    isVisibleRef.current[id] = false;
    const tooltip = tooltipRefs.current[id];
    if (!tooltip) return;

    // Kill any existing animations before hiding
    gsap.killTweensOf(tooltip);

    gsap.to(tooltip, {
      autoAlpha: 0,
      y: 20,
      scale: 0.6,
      x: 0,
      rotation: 0,
      duration: 0.3,
      ease: "power1.inOut",
      onComplete: () => {
        // Only clear hoveredIndex if this tooltip is still the hovered one
        if (hoveredIndex === id) {
          setHoveredIndex(null);
        }
      },
    });
  });

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {items.map((item) => (
        <div
          key={item.name}
          className="-mr-4 relative group border-3 border-b-background rounded-full"
          onMouseEnter={() => handleMouseEnter(item.id)}
          onMouseLeave={() => handleMouseLeave(item.id)}
        >
          <div
            ref={(el) => {
              tooltipRefs.current[item.id] = el;
            }}
            className="absolute w-48 -top-16 -left-1/2 translate-x-1/2 flex flex-col items-center justify-center rounded-md bg-gray-50 text-xs z-50 shadow-xl px-4 py-2 pointer-events-none"
          >
            <div className="font-bold text-foreground text-base">{item.name}</div>
            <div className="text-muted-foreground text-xs">{item.designation}</div>
          </div>

          <img
            src={item.image}
            alt={item.name}
            height={100}
            width={100}
            onMouseMove={(e) => handleMouseMove(e, item.id)}
            className="object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-none group-hover:scale-125 hover:border-2 group-hover:z-30 relative transition duration-500"
          />
        </div>
      ))}
    </div>
  );
};
