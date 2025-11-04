import { type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import * as Icons from "lucide-react";

interface Feature {
  icon: string;
  title: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}

export const FeaturesSection = ({ features }: FeaturesSectionProps) => {
  return (
    <section className="relative px-4 py-16">
      <div className="max-w-7xl mx-auto space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          All Plans Include
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const IconComponent = Icons[feature.icon as keyof typeof Icons] as LucideIcon;
            
            return (
              <Card 
                key={index}
                className="border-none bg-background/10 shadow-none  hover:border-background/30 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <div className="p-5 rounded-full border-4 border-white bg-gradient-to-bl via-transparent  via-90% from-background  text-primary">
                    {IconComponent && <IconComponent className="w-6 h-6 " />}
                  </div>
                  <p className="text-xl font-medium text-foreground">{feature.title}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
