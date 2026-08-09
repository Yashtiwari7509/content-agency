import InfiniteSlider from "@/components/InfiniteSlider";
import SectionHeader from "@/components/SectionHeader";
import { reviews1, reviews2, reviews3 } from "@/constant/client_reviews";

export default function MarqueeReviews() {
  return (
    <div id="Marqee-Tag">
      <SectionHeader
        label="Reviews"
        title="Trusted by — Who Value"
        gradientWord="Quality"
        description="We don't just make videos — we create results. See how our clients turned creative ideas into measurable success."
      />

      <div id="Marqee-slider" className="max-w-7xl mx-auto pb-20 relative flex items-center overflow-hidden">
        <div>
          <InfiniteSlider reviews={reviews1} direction="left" />
          <InfiniteSlider reviews={reviews2} direction="right" />
          <InfiniteSlider reviews={reviews3} direction="left" />
        </div>
      </div>
    </div>
  );
}
