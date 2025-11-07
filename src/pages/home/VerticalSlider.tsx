import { useRef, type FC } from "react";
import { Calendar, Camera, Film, ThumbsUp, TrendingUp, type LucideIcon } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SectionHeader from "@/components/SectionHeader";

// ---- Types ---- //
type IconType = LucideIcon | string;

interface Notification {
  icon: IconType;
  iconBg: keyof typeof gradientMap;
  message: string;
}

interface NotificationItemProps extends Notification {}

// ---- Constants ---- //
const gradientMap = {
  "blue-500": "from-white to-green-500",
  "purple-600": "from-white to-pink-600",
  "gray-600": "from-white to-red-600",
} as const;

// ---- Component: NotificationItem ---- //
const NotificationItem: FC<NotificationItemProps> = ({ icon: Icon, iconBg, message }) => (
  <div className="flex items-center gap-3 mb-4">
    <div
      className={`bg-gradient-to-br ${gradientMap[iconBg]} via-background shadow-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0`}
    >
      {typeof Icon === "string" ? (
        <span className="text-white text-sm font-semibold">{Icon}</span>
      ) : (
        <Icon className="w-5 h-5 text-white " />
      )}
    </div>
    <div className="bg-gray-50 border rounded-full px-4 py-3 flex-1">
      <p className="text-black text-xs">{message}</p>
    </div>
  </div>
);

// ---- Component: VerticalSlider ---- //
const VerticalSlider: FC = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const notifications: Notification[] = [
    { icon: Camera, iconBg: "blue-500", message: "Your latest video project just went live!" },
    { icon: TrendingUp, iconBg: "purple-600", message: "Your client’s reel hit 50K views in 24 hours!" },
    { icon: Calendar, iconBg: "gray-600", message: "A new content shoot has been scheduled!" },
    { icon: ThumbsUp, iconBg: "purple-600", message: "Your recent campaign is gaining massive engagement!" },
    { icon: Film, iconBg: "blue-500", message: "A new project brief just landed in your inbox!" },
  ];

  useGSAP(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const totalHeight = slider.scrollHeight / 2;

    gsap.to(slider, {
      y: `-=${totalHeight}`,
      duration: 10,
      ease: "none",
      repeat: -1,
      modifiers: {
        y: gsap.utils.unitize((y) => parseFloat(y) % totalHeight),
      },
    });
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-5xl">
        <SectionHeader
          title="Videos that drive results"
          description="From strategy to final edit, our content is built to amplify your reach and deliver measurable impact."
          align="left"
        />

        <div id="Marqee-slider-vertical" className="h-96 overflow-hidden relative">
          <div ref={sliderRef} className="absolute w-full">
            {[...Array(2)].map((_, i) => (
              <div key={i}>
                {notifications.map((notification, index) => (
                  <NotificationItem key={`${i}-${index}`} {...notification} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalSlider;
