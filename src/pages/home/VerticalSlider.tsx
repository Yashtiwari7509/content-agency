"use client";

import { useRef, useEffect, useState, type FC } from "react";
import { Camera, TrendingUp, Calendar, ThumbsUp, Video, BarChart2, Star, type LucideIcon } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Notification {
  icon: LucideIcon;
  text: string;
  bold: string; // portion of text to bold
}

interface Slide {
  label: string;
  bg: string;
  content: React.ReactNode;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const NOTIFICATIONS: Notification[] = [
  { icon: Camera, bold: "Your latest video project", text: "Your latest video project just went live!" },
  { icon: TrendingUp, bold: "Client reel hit 50K views", text: "Client reel hit 50K views in just 24 hours." },
  { icon: Calendar, bold: "content shoot", text: "A new content shoot has been scheduled." },
  { icon: ThumbsUp, bold: "campaign", text: "Your recent campaign is gaining massive engagement." },
  { icon: Video, bold: "project brief", text: "A new project brief just landed in your inbox." },
  { icon: BarChart2, bold: "up 3.2×", text: "Monthly impressions up 3.2× from last quarter." },
  { icon: Star, bold: "final cut", text: "Client approved the final cut ahead of schedule." },
];

const GAP = 10; // px — must match CSS gap
const SPEED = 0.5; // px per animation frame

// ─── Sub-components ──────────────────────────────────────────────────────────

const NotificationItem: FC<{ notification: Notification }> = ({ notification }) => {
  const { icon: Icon, text, bold } = notification;

  const parts = text.split(bold);
  const formatted =
    parts.length === 2 ? (
      <>
        {parts[0]}
        <strong className="font-medium text-gray-900">{bold}</strong>
        {parts[1]}
      </>
    ) : (
      text
    );

  return (
    <div className="flex items-center gap-3 shrink-0  border border-gray-100 rounded-xl px-3.5 py-3">
      <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-gray-700" />
      </div>
      <p className="text-[13px] text-gray-500 leading-snug">{formatted}</p>
    </div>
  );
};

// ─── Infinite Vertical Slider ─────────────────────────────────────────────────

const VerticalInfiniteScroll: FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const oneSetHRef = useRef(0);

  // Three copies for seamless looping
  const tripled = [...NOTIFICATIONS, ...NOTIFICATIONS, ...NOTIFICATIONS];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Wait one frame so DOM has rendered and we can measure
    const init = () => {
      const items = track.querySelectorAll<HTMLElement>("[data-notif-item]");
      let h = 0;
      for (let i = 0; i < NOTIFICATIONS.length; i++) {
        h += items[i].offsetHeight + GAP;
      }
      oneSetHRef.current = h;

      // Start at the middle copy so there's content above and below
      offsetRef.current = h;
      track.style.transform = `translateY(-${h}px)`;

      const step = () => {
        offsetRef.current += SPEED;
        // Snap back by exactly one set when we've consumed two sets
        if (offsetRef.current >= oneSetHRef.current * 2) {
          offsetRef.current -= oneSetHRef.current;
        }
        track.style.transform = `translateY(-${offsetRef.current}px)`;
        rafRef.current = requestAnimationFrame(step);
      };

      rafRef.current = requestAnimationFrame(step);
    };

    const raf = requestAnimationFrame(init);

    return () => {
      cancelAnimationFrame(raf);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="h-64  overflow-hidden relative">
      <div ref={trackRef} className="flex flex-col will-change-transform" style={{ gap: GAP }}>
        {tripled.map((n, i) => (
          <div key={i} data-notif-item="">
            <NotificationItem notification={n} />
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Image Carousel ───────────────────────────────────────────────────────────

const SLIDES: Slide[] = [
  {
    label: "Brand campaign",
    bg: "#F1EFE8",
    content: (
      <svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="480" height="320" fill="#F1EFE8" />
        <rect x="60" y="40" width="360" height="200" rx="8" fill="#D3D1C7" />
        <rect x="80" y="60" width="200" height="12" rx="4" fill="#B4B2A9" />
        <rect x="80" y="82" width="140" height="8" rx="3" fill="#B4B2A9" />
        <rect x="80" y="110" width="320" height="100" rx="6" fill="#B4B2A9" />
        <circle cx="400" cy="140" r="30" fill="#888780" opacity="0.5" />
        <polygon points="393,128 393,152 412,140" fill="#F1EFE8" />
        <rect x="80" y="228" width="80" height="28" rx="4" fill="#5F5E5A" />
        <rect x="80" y="268" width="280" height="8" rx="3" fill="#D3D1C7" />
        <rect x="80" y="282" width="200" height="8" rx="3" fill="#D3D1C7" />
      </svg>
    ),
  },
  {
    label: "Client reel",
    bg: "#E1F5EE",
    content: (
      <svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="480" height="320" fill="#E1F5EE" />
        <rect x="40" y="30" width="180" height="260" rx="8" fill="#9FE1CB" />
        <rect x="60" y="50" width="140" height="90" rx="5" fill="#5DCAA5" />
        <rect x="60" y="155" width="100" height="10" rx="3" fill="#1D9E75" />
        <rect x="60" y="172" width="75" height="8" rx="3" fill="#5DCAA5" />
        <rect x="240" y="30" width="200" height="120" rx="8" fill="#9FE1CB" />
        <rect x="260" y="50" width="160" height="70" rx="5" fill="#5DCAA5" />
        <circle cx="340" cy="85" r="20" fill="#1D9E75" opacity="0.6" />
        <polygon points="334,76 334,94 348,85" fill="#E1F5EE" />
        <rect x="240" y="165" width="200" height="125" rx="8" fill="#9FE1CB" />
        <rect x="260" y="180" width="160" height="80" rx="5" fill="#5DCAA5" />
        <rect x="260" y="273" width="100" height="8" rx="3" fill="#1D9E75" />
      </svg>
    ),
  },
  {
    label: "Social content",
    bg: "#EEEDFE",
    content: (
      <svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="480" height="320" fill="#EEEDFE" />
        <circle cx="240" cy="140" r="90" fill="#CECBF6" />
        <circle cx="240" cy="140" r="60" fill="#AFA9EC" />
        <circle cx="240" cy="140" r="35" fill="#7F77DD" />
        <polygon points="233,128 233,152 252,140" fill="#EEEDFE" />
        <rect x="60" y="256" width="360" height="2" rx="1" fill="#CECBF6" />
        <rect x="100" y="272" width="60" height="10" rx="3" fill="#AFA9EC" />
        <rect x="210" y="272" width="60" height="10" rx="3" fill="#AFA9EC" />
        <rect x="320" y="272" width="60" height="10" rx="3" fill="#AFA9EC" />
        <rect x="60" y="30" width="140" height="8" rx="3" fill="#CECBF6" />
        <rect x="60" y="46" width="90" height="6" rx="3" fill="#CECBF6" />
      </svg>
    ),
  },
  {
    label: "Product showcase",
    bg: "#FAECE7",
    content: (
      <svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="480" height="320" fill="#FAECE7" />
        <rect x="40" y="40" width="400" height="240" rx="8" fill="#F5C4B3" />
        <rect x="60" y="60" width="160" height="200" rx="6" fill="#F0997B" />
        <rect x="240" y="60" width="180" height="90" rx="6" fill="#F0997B" />
        <rect x="240" y="166" width="180" height="94" rx="6" fill="#D85A30" opacity="0.5" />
        <rect x="80" y="180" width="120" height="12" rx="3" fill="#FAECE7" />
        <rect x="80" y="200" width="80" height="8" rx="3" fill="#FAECE7" opacity="0.7" />
        <rect x="80" y="230" width="60" height="22" rx="4" fill="#FAECE7" />
        <rect x="256" y="76" width="140" height="60" rx="4" fill="#FAECE7" opacity="0.4" />
        <circle cx="270" cy="195" r="14" fill="#FAECE7" opacity="0.6" />
        <circle cx="300" cy="195" r="14" fill="#FAECE7" opacity="0.4" />
        <circle cx="330" cy="195" r="14" fill="#FAECE7" opacity="0.4" />
      </svg>
    ),
  },
];

const ImageCarousel: FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative rounded-xl overflow-hidden h-80 border border-gray-200 bg-gray-50">
        {SLIDES.map((slide, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === current ? 1 : 0 }}>
            {slide.content}
            <span className="absolute bottom-4 left-4 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500">
              {slide.label}
            </span>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex gap-1.5 justify-center">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all border bg-zinc-300 duration-500 ${i === current ? "w-6" : "w-2"}`}
            style={{
              background: i === current ? "black" : "",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Main Export ──────────────────────────────────────────────────────────────

const VerticalSlider: FC = () => {
  return (
    <section className="bg-white px-8 pb-40 mx-auto">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left — copy + notification feed */}
        <div className="flex flex-col gap-6">
          <SectionHeader
            label="Our Impact"
            title="Videos that drive"
            gradientWord="results"
            description="From strategy to final edit, our content is built to amplify your reach and deliver measurable impact."
            align="left"
          />

          <VerticalInfiniteScroll />
        </div>

        {/* Right — image carousel */}
        <div className="flex flex-col gap-3 mt-10">
          <ImageCarousel />
        </div>
      </div>
    </section>
  );
};

export default VerticalSlider;
