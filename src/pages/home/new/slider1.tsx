import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";
import { useRef } from "react";

gsap.registerPlugin(Draggable, InertiaPlugin);
gsap.defaults({ ease: "none" });

const Slider1 = () => {
  const scopeRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const picker = pickerRef.current!;
      const cells = gsap.utils.toArray<HTMLElement>(".cell");
      const proxy = document.createElement("div");
      proxy.className = "prozy";

      const cellWidth = 475;
      const numCells = cells.length;
      const cellStep = 1 / numCells;
      const wrapWidth = cellWidth * numCells;
      const wrapProgress = gsap.utils.wrap(0, 1);

      gsap.set(picker, {
        width: wrapWidth - cellWidth,
      });

      const baseTl = gsap.timeline({ paused: true });

      function initCell(element: HTMLElement, index: number) {
        const q = gsap.utils.selector(element);

        const title = q(".cell-title");
        // const image = q(".cell-image");

        gsap.set(element, {
          width: cellWidth,
          scale: 0.6,
          x: -cellWidth,
          filter: "blur(10px)",
        });

        const tl = gsap.timeline({ repeat: 1 });

        tl.to(
          element,
          {
            x: `+=${wrapWidth}`,
            duration: 1,
            // skewX: 20,
          },
          0,
        );
        tl.to(
          title,
          {
            color: "white",
            repeat: 1,
            yoyo: true,
            duration: cellStep,
          },
          0.25 - cellStep,
        );

        tl.to(
          element,
          {
            y: -100,
            scale: 0.8,
            repeat: 1,
            yoyo: true,
            duration: cellStep,
            filter: "blur(0px)",
          },
          0.25 - cellStep,
        );

        baseTl.add(tl, index * -cellStep);
      }

      cells.forEach(initCell);

      const animation = gsap.timeline({ repeat: -1, paused: true }).add(baseTl.tweenFromTo(1, 2, { immediateRender: true }));

      function updateProgress(this: Draggable) {
        animation.progress(wrapProgress(this.x / wrapWidth));
      }
      function moveBy(delta: number) {
        gsap.set(proxy, { x: "-=" + delta });
        updateProgress.call({ x: gsap.getProperty(proxy, "x") } as Draggable);
      }

      Draggable.create(proxy, {
        type: "x",
        trigger: picker,
        inertia: true,
        snap: {
          x: (x) => Math.round(x / cellWidth) * cellWidth,
        },
        onDrag: function () {
          updateProgress.call(this as unknown as Draggable);
        },
        onThrowUpdate: updateProgress,
        onThrowComplete: () => {
          console.log("onThrowComplete");
        },
      });
      const fakeEvent = new Event("mousedown");
      const fakeEndEvent = new Event("mouseup");

      let wheelTimeout: number | null = null;
      let wheelDragging = false;

      function onWheel(e: WheelEvent) {
        e.preventDefault();

        const draggable = Draggable.get(proxy);
        if (!draggable) return;

        // 🔥 start a drag if not already dragging
        if (!wheelDragging) {
          wheelDragging = true;
          draggable.startDrag(fakeEvent);
        }

        moveBy(e.deltaX || e.deltaY);

        if (wheelTimeout) clearTimeout(wheelTimeout);

        wheelTimeout = window.setTimeout(() => {
          wheelDragging = false;
          draggable.endDrag(fakeEndEvent); // ✅ snap + inertia now fires
        }, 80);
      }

      picker.addEventListener("wheel", onWheel, { passive: false });

      return () => {
        picker.removeEventListener("wheel", onWheel);
      };
    },
    { scope: scopeRef },
  );

  return (
    <div ref={scopeRef} className="w-screen h-screen flex items-center justify-center relative">
      <div className="text-8xl absolute text-white -translate-x-1/2 left-1/2 bottom-0 z-99 mix-blend-difference">BRANDS</div>
      <div ref={pickerRef} className="picker flex items-center! cursor-grab active:cursor-grabbing">
        {images.map((src, i) => (
          <div key={i} className="cell rounded-4xl overflow-hidden border-2">
            <div className="cell-content relative w-full h-full">
              <div className="cell-title absolute text-2xl border py-3  px-12 backdrop-blur-xs rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                Product {i + 1}
              </div>
              <img
                src={`${src}?auto=format&fit=crop&w=900&q=80`}
                alt={`Unsplash ${i + 1}`}
                draggable={false}
                className="cell-image object-cover w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider1;
const images = [
  "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  "https://images.unsplash.com/photo-1766039132515-ea88dc3950bd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1670537994863-5ad53a3214e0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1549049950-48d5887197a0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
];
