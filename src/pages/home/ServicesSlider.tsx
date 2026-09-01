import InfiniteSlider from "@/components/InfiniteSlider";
import ServiceCard from "@/components/serviceCard";
import SectionHeader from "@/components/SectionHeader";
import { services } from "@/constant/workflowSection";

// Each card is 288px wide (w-72) + 24px gap = 312px slot
const CARD_SLOT_WIDTH = 312;
const CARD_HEIGHT = 620;

export default function ServicesSlider() {
  return (
    <section className="relative w-full py-0  max-w-7xl mx-auto">
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
      <div className="mb-6 h-70 Service-slider-mask">
        <InfiniteSlider reviews={services} direction="left" boxWidth={CARD_SLOT_WIDTH} boxHeight={CARD_HEIGHT}>
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
