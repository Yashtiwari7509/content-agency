import InfiniteSlider from "@/components/InfiniteSlider";
import SectionLabel from "@/components/SectionLabel";

export default function MarqueeReviews() {
  return (
    <>
      <SectionLabel text="Reviews" />
      <div id="Marqee-slider" className="w-screen h-screen relative flex items-center">
        <div>
          <InfiniteSlider direction="left" />
          <InfiniteSlider direction="right" />
          <InfiniteSlider direction="left" />
        </div>
      </div>
    </>
  );
}
