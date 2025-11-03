import InfiniteSlider from "@/components/InfiniteSlider";
import SectionLabel from "@/components/SectionLabel";

export default function MarqueeReviews() {
  return (
    <>
      <SectionLabel text="Reviews" />
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our clients experience</h1>
        <p className="text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
         Why businesses trust us? Read genuine feedback from our satisfied clients who have experienced transformative results.
        </p>
      </div>
      <div id="Marqee-slider" className="w-screen py-20 relative flex items-center">
        <div>
          <InfiniteSlider direction="left" />
          <InfiniteSlider direction="right" />
          <InfiniteSlider direction="left" />
        </div>
      </div>
    </>
  );
}
