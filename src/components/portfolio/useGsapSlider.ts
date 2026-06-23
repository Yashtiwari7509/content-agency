import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";

/**
 * Shared GSAP drag-slider logic.
 * - Reads live x from GSAP at pointer-down (no stale state)
 * - Attaches pointerup on window so it's never missed
 * - Sets grab cursor during drag
 * - Rubber-bands at boundaries
 * - Exposes wasDragged so children can suppress click-after-drag
 */
export function useGsapSlider(total: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  // Store mutable drag state outside React to avoid stale closures
  const ds = useRef({ startX: 0, startOffset: 0, active: false, moved: false, idx: 0 });
  // True for one tick after a real drag ends — lets children swallow the trailing click
  const wasDragged = useRef(false);

  const getOffset = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return 0;
    return -index * track.offsetWidth;
  }, []);

  const goTo = useCallback(
    (index: number, animate = true) => {
      const clamped = Math.max(0, Math.min(total - 1, index));
      ds.current.idx = clamped;
      setCurrent(clamped);
      gsap.to(trackRef.current, {
        x: -clamped * (trackRef.current?.offsetWidth ?? 0),
        duration: animate ? 0.42 : 0,
        ease: "power3.out",
      });
    },
    [total]
  );

  // Re-snap on resize
  useEffect(() => {
    const onResize = () => {
      gsap.set(trackRef.current, { x: getOffset(ds.current.idx) });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [getOffset]);

  /* ── Pointer handlers ── */
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    // Read live x from GSAP — never stale
    const liveX = gsap.getProperty(track, "x") as number;
    ds.current = { startX: e.clientX, startOffset: liveX, active: true, moved: false, idx: ds.current.idx };
    track.setPointerCapture(e.pointerId);
    track.style.cursor = "grabbing";
    track.style.userSelect = "none";
    gsap.killTweensOf(track); // stop any in-flight tween on drag start
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!ds.current.active) return;
    const dx = e.clientX - ds.current.startX;
    if (Math.abs(dx) > 5) ds.current.moved = true;
    const track = trackRef.current;
    if (!track) return;
    const slideW = track.offsetWidth;
    const maxScroll = (total - 1) * slideW;
    const raw = ds.current.startOffset + dx;
    // Rubber-band past edges
    const rubber = (v: number, limit: number) => limit + (v - limit) * 0.25;
    const bounded =
      raw > 0 ? rubber(raw, 0) : raw < -maxScroll ? rubber(raw, -maxScroll) : raw;
    gsap.set(track, { x: bounded });
  }, [total]);

  // Attach pointerup on window so it fires even if cursor leaves the element
  useEffect(() => {
    const onUp = (e: PointerEvent) => {
      if (!ds.current.active) return;
      ds.current.active = false;
      const track = trackRef.current;
      if (track) {
        track.style.cursor = "";
        track.style.userSelect = "";
      }
      const dx = e.clientX - ds.current.startX;
      const didMove = ds.current.moved;

      // Mark as dragged so children can suppress the trailing click
      if (didMove) {
        wasDragged.current = true;
        setTimeout(() => { wasDragged.current = false; }, 0);
      }

      if (Math.abs(dx) > 45) {
        const next = dx < 0 ? ds.current.idx + 1 : ds.current.idx - 1;
        const clamped = Math.max(0, Math.min(total - 1, next));
        ds.current.idx = clamped;
        setCurrent(clamped);
        gsap.to(track, {
          x: -(clamped * (track?.offsetWidth ?? 0)),
          duration: 0.42,
          ease: "power3.out",
        });
      } else {
        // snap back
        gsap.to(track, {
          x: -(ds.current.idx * (track?.offsetWidth ?? 0)),
          duration: 0.35,
          ease: "power3.out",
        });
      }
    };
    window.addEventListener("pointerup", onUp);
    return () => window.removeEventListener("pointerup", onUp);
  }, [total]);

  return { trackRef, current, goTo, onPointerDown, onPointerMove, wasDragged };
}
