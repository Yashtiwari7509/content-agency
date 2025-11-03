import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

interface PricingTier {
  name: string;
  price: number;
  period: string;
  description: string;
  discount?: string;
}

interface PricingCardProps {
  title: string;
  description: string;
  tiers: PricingTier[];
  quote: string;
}

export const PricingCard = ({  tiers, quote }: PricingCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );
    }

    const cards = containerRef.current?.querySelectorAll(".pricing-tier-card");
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: -50, scale: 0.6, filter: "blur(10px)", rotateZ: 4 },
        {
          rotateZ: 0,
          filter: "blur(0px)",
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    }
  }, [tiers]);

  return (
    <div className="space-y-12" ref={containerRef}>
      {/* Animated Quote */}
      <div className="text-center max-w-3xl mx-auto h-20">
        <h2 ref={quoteRef} className="text-3xl md:text-4xl font-black text-zinc-500">
          {quote}
        </h2>
      </div>

      {/* Tier Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tiers.map((tier, index) => (
          <Card
            key={index}
            className={cn(
              "pricing-tier-card relative  overflow-hidden backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl",
              index === 1
                ? "bg-gradient-to-br from-background/40 via-white to-background/10 border-background md:scale-110"
                : "bg-white hover:border-white"
            )}
          >
            {index === 1 && (
              <>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black text-white text-xs font-bold">
                  POPULAR
                </div>
              </>
            )}

            {tier.discount && index !== 1 && (
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full  border  text-xs font-bold">
                {tier.discount}
              </div>
            )}

            <CardHeader className="relative pb-8">
              <CardTitle className="text-xl font-bold text-foreground mb-2">{tier.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{tier.description}</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center py-4">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold">
                    <sup className="text-md">$</sup>{tier.price}
                  </span>
                  <span className="text-lg text-muted-foreground">/{tier.period}</span>
                </div>
              </div>

              <Button
                className={cn(
                  "w-full font-semibold border rounded-full transition-all duration-300",
                  index === 1
                    ? "bg-hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] hover:scale-105"
                    : "bg-primary/90 hover:bg-primary hover:shadow-lg"
                )}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
