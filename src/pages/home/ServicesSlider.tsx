import InfiniteSlider from "@/components/InfiniteSlider";
import ServiceCard from "@/components/serviceCard";
import SectionHeader from "@/components/SectionHeader";
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
    <section className="relative w-full py-0 lg:py-20 overflow-hidden  max-w-7xl mx-auto">
      <div className="pointer-events-none absolute top-1/3 right-1/2 w-[200px] h-[200px] rounded-full opacity-25 blur-3xl bg-background" />{" "}
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="What We Offer"
          title="Services built for"
          gradientWord="creators"
          description="Every production need covered — from a raw cut to a fully polished campaign-ready video."
        />
      </div>
      {/* Row 1 — left */}
      <div className="mb-6 h-60 Service-slider-mask">
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
