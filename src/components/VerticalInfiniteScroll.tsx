import { useRef, useEffect, type FC } from "react";
import { Camera, TrendingUp, Calendar, ThumbsUp, Video, BarChart2, Star, type LucideIcon } from "lucide-react";

interface Notification {
    icon: LucideIcon;
    text: string;
    bold: string;
}

const NOTIFICATIONS: Notification[] = [
    { icon: Camera, bold: "Your latest video project", text: "Your latest video project just went live!" },
    { icon: TrendingUp, bold: "Client reel hit 50K views", text: "Client reel hit 50K views in just 24 hours." },
    { icon: Calendar, bold: "content shoot", text: "A new content shoot has been scheduled." },
    { icon: ThumbsUp, bold: "campaign", text: "Your recent campaign is gaining massive engagement." },
    { icon: Video, bold: "project brief", text: "A new project brief just landed in your inbox." },
    { icon: BarChart2, bold: "up 3.2×", text: "Monthly impressions up 3.2× from last quarter." },
    { icon: Star, bold: "final cut", text: "Client approved the final cut ahead of schedule." },
];

const GAP = 10; // px — must match CSS gap
const SPEED = 0.5; // px per animation frame

const NotificationItem: FC<{ notification: Notification }> = ({ notification }) => {
    const { icon: Icon, text, bold } = notification;

    const parts = text.split(bold);
    const formatted =
        parts.length === 2 ? (
            <>
                {parts[0]}
                <strong className="font-medium text-gray-900">{bold}</strong>
                {parts[1]}
            </>
        ) : (
            text
        );

    return (
        <div className="flex items-center gap-3 shrink-0 border border-gray-100 rounded-xl px-3.5 py-3">
            <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-gray-700" />
            </div>
            <p className="text-[13px] text-gray-500 leading-snug">{formatted}</p>
        </div>
    );
};

const VerticalInfiniteScroll: FC = () => {
    const trackRef = useRef<HTMLDivElement>(null);
    const offsetRef = useRef(0);
    const rafRef = useRef<number | null>(null);
    const oneSetHRef = useRef(0);

    // Three copies for seamless looping
    const tripled = [...NOTIFICATIONS, ...NOTIFICATIONS, ...NOTIFICATIONS];

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        // Wait one frame so DOM has rendered and we can measure
        const init = () => {
            const items = track.querySelectorAll<HTMLElement>("[data-notif-item]");
            let h = 0;
            for (let i = 0; i < NOTIFICATIONS.length; i++) {
                h += items[i].offsetHeight + GAP;
            }
            oneSetHRef.current = h;

            // Start at the middle copy so there's content above and below
            offsetRef.current = h;
            track.style.transform = `translateY(-${h}px)`;

            const step = () => {
                offsetRef.current += SPEED;
                // Snap back by exactly one set when we've consumed two sets
                if (offsetRef.current >= oneSetHRef.current * 2) {
                    offsetRef.current -= oneSetHRef.current;
                }
                track.style.transform = `translateY(-${offsetRef.current}px)`;
                rafRef.current = requestAnimationFrame(step);
            };

            rafRef.current = requestAnimationFrame(step);
        };

        const raf = requestAnimationFrame(init);

        return () => {
            cancelAnimationFrame(raf);
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div className="h-64 overflow-hidden relative">
            <div ref={trackRef} className="flex flex-col will-change-transform" style={{ gap: GAP }}>
                {tripled.map((n, i) => (
                    <div key={i} data-notif-item="">
                        <NotificationItem notification={n} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VerticalInfiniteScroll;
