import InfiniteSlider from "@/components/InfiniteSlider";
import SectionHeader from "@/components/SectionHeader";

export default function MarqueeReviews() {
  return (
    <>
      <SectionHeader
        label="Reviews"
        title="Trusted by - Who Value Quality"
        description="We don't just make videos — we create results. See how our clients turned creative ideas into measurable success."
      />

      <div id="Marqee-slider" className="max-w-7xl mx-auto pb-20 relative flex items-center overflow-hidden">
        <div>
          <InfiniteSlider direction="left" />
          <InfiniteSlider direction="right" />
          <InfiniteSlider direction="left" />
        </div>
      </div>
    </>
  );
}
