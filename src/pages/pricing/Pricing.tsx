import { PricingCard } from "./PricingCard";
import { FeaturesSection } from "./FeaturesSection";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLenis } from "lenis/react";

const Pricing = () => {
  const [selectedService, setSelectedService] = useState(0);
   const lenis = useLenis();
   useEffect(() => {
     lenis?.scrollTo(0, { immediate: true });
   }, [lenis]);

  const pricingData = [
    {
      title: "Horizontal Video Editing",
      description: "Professional long-form video editing for YouTube, courses, and business content",
      quote: "Transform Your Content Into Cinematic Masterpieces",
      tiers: [
        { name: "Starter", price: 150, period: "video", description: "Perfect for testing the waters with 1 video" },
        {
          name: "Growth",
          price: 135,
          period: "video",
          description: "10 videos to scale your content",
          discount: "10% OFF",
        },
        {
          name: "Scale",
          price: 120,
          period: "video",
          description: "25 videos for serious creators",
          discount: "20% OFF",
        },
      ],
    },
    {
      title: "Vertical Video Editing",
      description: "Attention-grabbing shorts for TikTok, Instagram Reels, and YouTube Shorts",
      quote: "Go Viral With Every Frame",
      tiers: [
        { name: "Explore", price: 75, period: "video", description: "Start your viral journey with 1 video" },
        {
          name: "Trending",
          price: 69,
          period: "video",
          description: "15 videos to dominate the algorithm",
          discount: "8% OFF",
        },
        { name: "Viral", price: 63, period: "video", description: "30 videos for maximum reach", discount: "16% OFF" },
      ],
    },
    {
      title: "Channel Management",
      description: "Full YouTube channel management to grow your audience and maximize views",
      quote: "Let Us Grow Your Channel While You Create",
      tiers: [
        { name: "Quarterly", price: 970, period: "month", description: "3-month commitment to kickstart growth" },
        {
          name: "Semi-Annual",
          price: 870,
          period: "month",
          description: "6 months of strategic growth",
          discount: "10% OFF",
        },
        {
          name: "Annual",
          price: 770,
          period: "month",
          description: "1 year of explosive channel expansion",
          discount: "20% OFF",
        },
      ],
    },
    {
      title: "Social Media Management",
      description: "Complete social media strategy and content management across all platforms",
      quote: "Build Your Empire Across All Platforms",
      tiers: [
        { name: "Essential", price: 750, period: "month", description: "2 platforms : 15 posts/month foundation" },
        {
          name: "Professional",
          price: 1250,
          period: "month",
          description: "4 platforms : 30 posts/month dominance",
          discount: "17% OFF",
        },
        {
          name: "Enterprise",
          price: 2000,
          period: "month",
          description: "All platforms : 60 posts/month supremacy",
          discount: "33% OFF",
        },
      ],
    },
  ];

  const allFeatures = [
    { icon: "Sparkles", title: "Advanced VFX & Transitions" },
    { icon: "Zap", title: "Motion Graphics" },
    { icon: "Video", title: "Unlimited Stock Footage" },
    { icon: "Music", title: "Music & Sound Effects" },
    { icon: "Palette", title: "Color Correction" },
    { icon: "Headphones", title: "Audio Correction" },
    { icon: "User", title: "Dedicated Editor" },
    { icon: "Clock", title: "Fast Turnaround" },
  ];
  const heroTlRef = useRef<GSAPTimeline>(null);

  useGSAP(() => {
    const textLine = SplitText.create("#pricing");
    const { words } = textLine.split({ type: "words" });
    gsap.to(".center", {
      rotationZ: 360,
      duration: 50,
      repeat: -1,
      ease: "none",
    });
    heroTlRef.current = gsap.timeline({
      defaults: { ease: "power4.out" },
    });
    const tl = heroTlRef.current;
    tl.from(".clouds", {
      filter: "blur(30px)",
      y: 500,
      ease: "power4.out",
      duration: 3,
      stagger: 0.2,
    })

      .from(
        words,
        {
          filter: "blur(20px)",
          yPercent: 100,
          ease: "power4.out",
          opacity: 0,
          stagger: 0.1,
        },
        "-=1"
      )
      .from(".climax", {
        opacity: 0,
      })
      .from(
        "#heroCard",
        {
          y: 500,
          ease: "power4.out",
          duration: 3,
          stagger: 0.2,
        },
        "-=3"
      );
  }, []);
  return (
    <div className="min-h-screen  ">
      <div className="absolute clouds top-10 left-1/3 z-10">
        <img src="./img.png" width={300} height={200} alt="" />
      </div>
      <div className="absolute clouds top-40 left-2/4 z-10">
        <img src="./img.png" width={300} height={200} alt="" />
      </div>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-50 pb-20 px-4 bg-background hero-bg-mask ">
        <div className="relative max-w-7xl mx-auto text-center space-y-6">
          <h1 id="pricing" className="text-5xl md:text-7xl h-20 font-bold">Pricing</h1>
          <p className="text-xl md:text-2xl text-black max-w-3xl mx-auto">
            Choose the perfect plan to elevate your content and grow your audience
          </p>
        </div>
      </section>

      {/* Service Selector */}
      <section className="relative px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {pricingData.map((plan, index) => (
              <Button
                key={index}
                onClick={() => setSelectedService(index)}
                variant={selectedService === index ? "default" : "outline"}
                className={
                  selectedService === index ? " text-white rounded-full" : "hover:border-primary/50 font-thin text-xs"
                }
              >
                {plan.title}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative px-4 pb-20">
        <PricingCard
          title={pricingData[selectedService].title}
          description={pricingData[selectedService].description}
          tiers={pricingData[selectedService].tiers}
          quote={pricingData[selectedService].quote}
        />
      </section>

      {/* Features Section */}
      <FeaturesSection features={allFeatures} />
    </div>
  );
};

export default Pricing;
