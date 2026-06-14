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

export const PricingCard = ({ tiers, quote }: PricingCardProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const quoteRef = useRef<HTMLHeadingElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0},
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
        }
      );
    }

    if (cardRefs.current.length > 0) {
    gsap.fromTo(
      cardRefs.current,
      { opacity: 0, y: -50, scale: 0.6 },
      {
        opacity: 1,
        y: 0,
        scale: (i) => (i === 2 ? 1.1 : 1), // highlight middle card
        duration: 0.6,
        stagger: { each: 0.15, from: "center" },
        ease: "power3.out",
      }
    );

    }
  }, [tiers]);

  return (
    <div className="space-y-12" ref={containerRef}>
      {/* Animated Quote */}
      <div className="text-center max-w-3xl mx-auto h-20">
        <h2 ref={quoteRef} className="text-3xl md:text-4xl font-black text-zinc-700">
          {quote}
        </h2>
      </div>

      {/* Tier Cards Grid */}
      <div className="flex justify-center gap-8 w-full flex-wrap">
        {tiers.map((tier, index) => (
          <Card
            ref={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
            key={index}
            data-card-index={index}
            className={cn(
              "pricing-tier-card relative w-80  overflow-hidden backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl",
              index === 2 || tier.name === "Brand Builder"
                ? "bg-linear-to-br from-background/40 via-white to-background/10 border-background "
                : "bg-white hover:border-white"
            )}
          >
            {index === 2 && (
              <>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black text-white text-xs font-bold">
                  POPULAR
                </div>
              </>
            )}

            {tier.discount && index !== 2 && (
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
                    <sup className="text-md">$</sup>
                    {tier.price}
                  </span>
                  <span className="text-lg text-muted-foreground">/{tier.period}</span>
                </div>
              </div>

              <Button
                className={cn(
                  "w-full font-semibold bg-transparent hover:bg-background text-black  hover:text-white border rounded-full transition-all duration-300"
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
