import InfiniteSlider from "@/components/InfiniteSlider";
import ServiceCard from "@/components/serviceCard";
import { Video, Sparkles, Music, Palette, Film, Layers, Mic, Zap } from "lucide-react";

// Each card is 288px wide (w-72) + 24px gap = 312px slot
const CARD_SLOT_WIDTH = 312;
const CARD_HEIGHT = 620;

const services = [
  {
    title: "VFX Studio",
    subtitle: "Advanced visual effects",
    appLabel: "Effects",
    Icon: Sparkles,
  },
  {
    title: "Motion Graphics",
    subtitle: "Brand animation",
    appLabel: "Motion",
    Icon: Film,
  },
  {
    title: "Color Grading",
    subtitle: "Scene polish & tone",
    appLabel: "Color",
    Icon: Palette,
  },
  {
    title: "Sound Design",
    subtitle: "Music + SFX layers",
    appLabel: "Audio",
    Icon: Music,
  },
  {
    title: "Video Editing",
    subtitle: "Cut, trim & transitions",
    appLabel: "Edit",
    Icon: Video,
  },
  {
    title: "Multi-Layer",
    subtitle: "Compositing & overlay",
    appLabel: "Layers",
    Icon: Layers,
  },
  {
    title: "Voiceover",
    subtitle: "Studio-quality narration",
    appLabel: "Voice",
    Icon: Mic,
  },
  {
    title: "Fast Delivery",
    subtitle: "48 h turnaround",
    appLabel: "Speed",
    Icon: Zap,
  },
];

export default function ServicesSlider() {
  return (
    <section className="relative w-full py-20 overflow-hidden Service-slider-mask max-w-7xl mx-auto">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40 mb-3">What We Offer</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black leading-tight">
          Services built for <span className="text-black/50">creators</span>
        </h2>
        <p className="mt-4 text-[15px] text-black/40 max-w-xl mx-auto">
          Every production need covered — from a raw cut to a fully polished campaign-ready video.
        </p>
      </div>

      {/* Row 1 — left */}
      <div className="mb-6 h-90">
        <InfiniteSlider direction="left" boxWidth={CARD_SLOT_WIDTH} boxHeight={CARD_HEIGHT}>
          {services.map((s, i) => (
            <div key={s.title} className="px-3">
              <ServiceCard title={s.title} subtitle={s.subtitle} appLabel={s.appLabel} docs={i} DesignLabel={s.Icon} />
            </div>
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
