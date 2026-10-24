"use client";

import { useRef, useEffect, useState, type FC } from "react";
import { Camera, TrendingUp, Calendar, ThumbsUp, Video, BarChart2, Star, type LucideIcon } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import LazyVideo from "@/components/LazyVideo";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Notification {
  icon: LucideIcon;
  text: string;
  bold: string; // portion of text to bold
}

interface Slide {
  label: string;
  bg: string;
  videoSrc: string;
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
    label: "Views & growth",
    bg: "#EEEDFE",
    videoSrc: "https://res.cloudinary.com/decqmmcxq/video/upload/v1792169759/views_fqoyc6.mp4",
  },
  {
    label: "Social media",
    bg: "#FAECE7",
    videoSrc: "https://res.cloudinary.com/decqmmcxq/video/upload/v1792169747/social-media_smmbpy.mp4",
  },
  {
    label: "Short-form content",
    bg: "#E1F5EE",
    videoSrc: "https://res.cloudinary.com/decqmmcxq/video/upload/v1792169768/short-form_conzil.mp4",
  },
  {
    label: "Long-form editing",
    bg: "#F1EFE8",
    videoSrc: "https://res.cloudinary.com/decqmmcxq/video/upload/v1792169769/long-form_exvxb3.mp4",
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
      <div className="relative rounded-xl overflow-hidden border aspect-video border-gray-200 bg-gray-50">
        {SLIDES.map((slide, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-700 aspect-video" style={{ opacity: i === current ? 1 : 0 }}>
            <LazyVideo
              src={slide.videoSrc}
              autoPlay={i === current}
              isActive={i === current}
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-lg aspect-video!"
            />
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
