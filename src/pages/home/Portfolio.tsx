import SectionLabel from "@/components/SectionLabel";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Heart, MessageCircle, ArrowUpRight, PlayIcon } from "lucide-react";
import { useRef } from "react";

const PortfolioCard = ({ bgColor, imageUrl, author, likes, comments }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const linkBtnRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    if (!cardRef.current || !imageRef.current || !overlayRef.current || !playBtnRef.current || !linkBtnRef.current)
      return;
    const card = cardRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    const playBtn = playBtnRef.current;
    const linkBtn = linkBtnRef.current;

    // Set initial states
    gsap.set(overlay, { opacity: 0 });
    gsap.set([playBtn, linkBtn], { scale: 0, opacity: 0 });

    // Mouse enter animation
    const handleMouseEnter = () => {
      gsap.to(image, {
        scale: 1.15,
        // skewX: 10,
        duration: 1.2,
        ease: "power2.out",
      });

      gsap.to(overlay, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });

      gsap.to(playBtn, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 0.1,
      });

      gsap.to(linkBtn, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 0.2,
      });
    };

    // Mouse leave animation
    const handleMouseLeave = () => {
      gsap.to(image, {
        scale: 1,
        // skewX: 0,

        duration: 0.8,
        ease: "power2.out",
      });

      gsap.to(overlay, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });

      gsap.to([playBtn, linkBtn], {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  });

  return (
    <div
      ref={cardRef}
      className="flex flex-col sticky bg-gray-50 pb-6 rounded-2xl border-gray-50 border-10 overflow-hidden"
      style={{ top: "20vh" }}
    >
      <div
        className={`${bgColor} overflow-hidden aspect-[4/3] flex items-center justify-center relative cursor-pointer`}
      >
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Portfolio"
          className="w-full h-full object-cover"
          style={{ transformOrigin: "center center" }}
        />

        {/* Overlay with icons */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center gap-4"
        >
          <button
            ref={playBtnRef}
            className="w-16 h-16 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-100"
          >
            <PlayIcon className="w-7 h-7 text-white ml-1" />
          </button>
          <button
            ref={linkBtnRef}
            className="w-16 h-16 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-100 "
          >
            <ArrowUpRight className="w-7 h-7 text-white" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 px-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden !relative">
            <img src={imageUrl} className="w-full h-full object-cover" alt="" />
          </div>
          <span className="text-sm font-medium text-gray-900">{author}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default PortfolioCard;

export default function PortfolioLayout() {
  const portfolioItems = [
    {
      bgColor: "bg-blue-400",
      author: "John dow",
      likes: "18k",
      comments: "10k",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1758698145702-7f08b2dae2b3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      bgColor: "bg-blue-500",
      author: "John dow",
      likes: "400k",
      comments: "78k",
      imageUrl:
        "https://images.unsplash.com/photo-1758478648528-61a41d58944b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNDV8fHxlbnwwfHx8fHw%3D",
    },
    {
      bgColor: "bg-blue-400",
      author: "John dow",
      likes: "18k",
      comments: "10k",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1758893665417-8b64f3a41598?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      bgColor: "bg-blue-500",
      author: "John dow",
      likes: "400k",
      comments: "78k",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1758360086631-9565ac269436?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1Mnx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      bgColor: "bg-blue-500",
      author: "John dow",
      likes: "400k",
      comments: "78k",
      imageUrl:
        "https://images.unsplash.com/photo-1758478648528-61a41d58944b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNDV8fHxlbnwwfHx8fHw%3D",
    },
    {
      bgColor: "bg-blue-400",
      author: "John dow",
      likes: "18k",
      comments: "10k",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1758893665417-8b64f3a41598?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-8 md:p-16 relative">
      <div className="max-w-5xl mx-auto relative">
        {/* Portfolio Label */}
        <SectionLabel text="Portfolio" />

        {/* Heading */}
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">A look through my lens</h1>
          <p className="text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
            Each frame tells a story, capturing genuine moments that showcase my style and vision. Browse through my
            favorite projects.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="relative h-fit grid md:grid-cols-2 grid-cols-1 gap-y-10 gap-x-6 mt-12 z-10">
          {portfolioItems.map((item, index) => (
            <PortfolioCard
              key={index}
              bgColor={item.bgColor}
              author={item.author}
              likes={item.likes}
              comments={item.comments}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      </div>
      {/* <Balloons /> */}
    </div>
  );
}
