import { type LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import TaskelloCard from "@/components/serviceCard";

interface Feature {
    icon: string;
    title: string;
}

interface FeaturesSectionProps {
    features: Feature[];
}

const featureCardData: Record<Feature["title"], { title: string; subtitle: string }> = {
    "Advanced VFX & Transitions": { title: "VFX Studio", subtitle: "Smooth edits" },
    "Motion Graphics": { title: "Motion", subtitle: "Brand animation" },
    "Unlimited Stock Footage": { title: "Stock", subtitle: "Unlimited clips" },
    "Music & Sound Effects": { title: "Audio Mix", subtitle: "Music + SFX" },
    "Color Correction": { title: "Color Grade", subtitle: "Scene polish" },
    "Audio Correction": { title: "Audio Fix", subtitle: "Clean sound" },
    "Dedicated Editor": { title: "Editor Team", subtitle: "Priority edit" },
    "Fast Turnaround": { title: "Quick Turn", subtitle: "Speed delivery" },
};

export const FeaturesSection = ({ features }: FeaturesSectionProps) => {
    return (
        <section className="relative px-4 py-16">
            <div className="max-w-7xl mx-auto space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center">All Plans Include</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {features.map((feature, index) => {
                        const IconComponent = Icons[feature.icon as keyof typeof Icons] as LucideIcon;
                        const cardData = featureCardData[feature.title] ?? {
                            title: feature.title,
                            subtitle: "Agency feature",
                        };

                        return (
                            <TaskelloCard
                                appLabel={feature.title}
                                title={cardData.title}
                                subtitle={cardData.subtitle}
                                docs={index}
                                DesignLabel={IconComponent}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
