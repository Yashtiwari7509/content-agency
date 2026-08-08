import { useRef, useLayoutEffect, type FC } from "react";
import { Camera, TrendingUp, ThumbsUp, Video, BarChart2, Star, type LucideIcon } from "lucide-react";
import { gsap } from "gsap";

interface Notification {
  icon: LucideIcon;
  text: string;
  bold: string;
}

const NOTIFICATIONS: Notification[] = [
  { icon: Camera, bold: "Performance-Focused", text: "Performance-Focused Content!" },
  { icon: TrendingUp, bold: "Storytelling", text: "Research-Backed Storytelling" },
  { icon: ThumbsUp, bold: "Project Manager", text: "Dedicated Project Manager." },
  { icon: Video, bold: "Real-time", text: "Real-time updates" },
  { icon: BarChart2, bold: "48-Hour", text: "Fast 48-Hour Turnaround" },
  { icon: Star, bold: "Motion", text: "Research-Driven Motion Design" },
];

const GAP = 10; // px — must match CSS gap
const SPEED = 40; // px per second
const SET_COUNT = 3; // copies rendered so there's always a full screen of buffer


const NotificationItem: FC<{ notification: Notification; index: number }> = ({ notification, index }) => {
  const { icon: Icon, text, bold } = notification;

  // index is normalized (0..NOTIFICATIONS.length-1) by the caller, so the
  // same logical item renders IDENTICALLY in every duplicated copy.
  const isSender = index % 2 !== 0;

  const parts = text.split(bold);
  const formatted =
    parts.length === 2 ? (
      <>
        {parts[0]}
        <strong className="font-semibold text-black">{bold}</strong>
        {parts[1]}
      </>
    ) : (
      text
    );

  return (
    <div className={`flex items-end gap-2 px-3 py-1.5 will-change-transform w-full ${isSender ? "flex-row-reverse" : "flex-row"}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isSender ? "bg-primary" : "bg-gray-100"}`}>
        <Icon className={`w-3.5 h-3.5 ${isSender ? "text-white" : "text-gray-600"}`} />
      </div>

      <div className={`flex flex-col gap-1 max-w-[75%] ${isSender ? "items-end" : "items-start"}`}>
        {/* <div className={`flex items-baseline gap-1.5 px-0.5 ${isSender ? "flex-row-reverse" : "flex-row"}`}>
          <p className="text-[11px] font-semibold text-gray-500">{sender}</p>
          <p className="text-[10px] text-gray-400">{time}</p>
        </div> */}

        <div
          className={`px-3.5 py-2 ${isSender ? "bg-background/20 rounded-[18px_18px_4px_18px]" : "bg-gray-50 rounded-[18px_18px_18px_4px]"}`}
        >
          <p className={`text-[13px] leading-snug m-0 text-black whitespace-nowrap`}>{formatted}</p>
        </div>
      </div>
    </div>
  );
};

const VerticalInfiniteScroll: FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const oneSetHRef = useRef(0);

  // N identical copies of the SAME normalized content
  const tripled = Array.from({ length: NOTIFICATIONS.length * SET_COUNT }, (_, i) => ({
    notification: NOTIFICATIONS[i % NOTIFICATIONS.length],
    index: i % NOTIFICATIONS.length,
  }));

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measureOneSet = () => {
      const items = track.querySelectorAll<HTMLElement>("[data-notif-item]");
      let h = 0;
      for (let i = 0; i < NOTIFICATIONS.length; i++) {
        h += items[i].offsetHeight + GAP;
      }
      return h;
    };

    // Builds (or rebuilds) the seamless loop tween for the CURRENT one-set height.
    // Uses gsap's modifiers plugin to wrap y with a simple modulo — this is what
    // makes the loop seamless regardless of how tall the content is.
    const buildLoop = () => {
      const h = measureOneSet();
      if (h <= 0) return;

      const prevH = oneSetHRef.current;
      const prevY = gsap.getProperty(track, "y") as number;

      // Preserve relative scroll position if height changed mid-scroll
      const startY = prevH > 0 ? (prevY / prevH) * h : 0;

      tweenRef.current?.kill();
      gsap.set(track, { y: startY });

      oneSetHRef.current = h;

      tweenRef.current = gsap.to(track, {
        y: `-=${h}`,
        duration: h / SPEED,
        ease: "none",
        repeat: -1,
        modifiers: {
          // Wrap the accumulated y value back into [-h, 0) every frame —
          // this is the part that makes it loop forever with zero seam.
          y: gsap.utils.unitize((y: number) => gsap.utils.wrap(-h, 0, y)),
        },
      });
    };

    buildLoop();

    // Rebuild (without a visible jump) whenever real rendered heights change —
    // font/image load, text reflow, container resize, etc.
    const ro = new ResizeObserver(() => buildLoop());
    track.querySelectorAll<HTMLElement>("[data-notif-item]").forEach((el) => ro.observe(el));

    return () => {
      tweenRef.current?.kill();
      ro.disconnect();
    };
  }, []);

  return (
    <div className="h-90 overflow-hidden relative w-full">
      <div ref={trackRef} className="flex flex-col will-change-transform" style={{ gap: GAP }}>
        {tripled.map(({ notification, index }, i) => (
          <div key={i} data-notif-item="">
            <NotificationItem notification={notification} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalInfiniteScroll;
