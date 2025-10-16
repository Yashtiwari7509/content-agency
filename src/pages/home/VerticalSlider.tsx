import { useRef, type FC } from "react";
import { DollarSign, TrendingUp, type LucideIcon } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
  "blue-500": "from-white to-blue-500",
  "purple-600": "from-white to-purple-600",
  "gray-600": "from-white to-gray-600",
} as const;

// ---- Component: NotificationItem ---- //
const NotificationItem: FC<NotificationItemProps> = ({ icon: Icon, iconBg, message }) => (
  <div className="flex items-center gap-3 mb-4">
    <div
      className={`bg-gradient-to-tr ${gradientMap[iconBg]} w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0`}
    >
      {typeof Icon === "string" ? (
        <span className="text-white text-sm font-semibold">{Icon}</span>
      ) : (
        <Icon className="w-5 h-5 text-white" />
      )}
    </div>
    <div className="bg-gray-50 border rounded-full px-4 py-3 flex-1">
      <p className="text-black text-sm">{message}</p>
    </div>
  </div>
);

// ---- Component: VerticalSlider ---- //
const VerticalSlider: FC = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const notifications: Notification[] = [
    { icon: DollarSign, iconBg: "blue-500", message: "You received $3,000 from John!" },
    { icon: DollarSign, iconBg: "purple-600", message: "You received a payment of $4,989!" },
    { icon: "Cal", iconBg: "gray-600", message: "You have a new meeting booked!" },
    { icon: TrendingUp, iconBg: "purple-600", message: "Woohoo! You made a sale!" },
    { icon: DollarSign, iconBg: "blue-500", message: "You received $3,000 from John!" },
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
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-black text-4xl font-bold mb-3">Built to bring your business results</h1>
          <p className="text-gray-500 text-lg">Designed to help turn website visits into actual sales.</p>
        </div>

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
