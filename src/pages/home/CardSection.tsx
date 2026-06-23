import CardSlider from "@/components/CardSlider";
import SectionHeader from "@/components/SectionHeader";

const CardSection = () => {
    return (
        <div className="py-10 px-4">
            <SectionHeader
              label="Pricing"
              title="Flexible plans for every"
              gradientWord="creator"
              description="Simple, transparent pricing — pick the plan that matches your pace."
            />
            <CardSlider />
        </div>
    );
};

export default CardSection;
