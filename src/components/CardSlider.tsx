import { useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Draggable);

interface Card {
    id: number;
    title: string;
    subtitle: string;
    year: string;
    tag: string;
    accent: string;
    light: string;
    gradientFrom: string;
    gradientVia: string;
    gradientTo: string;
    num: string;
}

const CARDS: Card[] = [
    {
        id: 0,
        title: "Aurora Borealis",
        subtitle: "Northern Lights",
        year: "2024",
        tag: "Nature",
        gradientFrom: "#064e3b",
        gradientVia: "#0f766e",
        gradientTo: "#164e63",
        accent: "#5DCAA5",
        light: "#E1F5EE",
        num: "01",
    },
    {
        id: 1,
        title: "Solaris",
        subtitle: "Beyond The Horizon",
        year: "2024",
        tag: "Cosmos",
        gradientFrom: "#2e1065",
        gradientVia: "#581c87",
        gradientTo: "#1e1b4b",
        accent: "#AFA9EC",
        light: "#EEEDFE",
        num: "02",
    },
    {
        id: 2,
        title: "Ember Drift",
        subtitle: "Through The Flame",
        year: "2024",
        tag: "Fire",
        gradientFrom: "#431407",
        gradientVia: "#7f1d1d",
        gradientTo: "#4c0519",
        accent: "#F0997B",
        light: "#FAECE7",
        num: "03",
    },
];

const CARD_W = 320;
const CARD_H = 440;

function ArrowIcon({ color }: { color: string }) {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

interface SliderCardProps {
    card: Card;
    cardRef: (el: HTMLDivElement | null) => void;
}

function SliderCard({ card, cardRef }: SliderCardProps) {
    return (
        <div
            ref={cardRef}
            className="absolute overflow-hidden rounded-[24px] will-change-transform"
            style={{
                width: CARD_W,
                height: CARD_H,
                backfaceVisibility: "hidden",
            }}
        >
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(
            135deg,
            ${card.gradientFrom},
            ${card.gradientVia},
            ${card.gradientTo}
          )`,
                }}
            />

            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
                }}
            />

            <div
                className="absolute left-0 right-0 top-0 h-px"
                style={{
                    background: `linear-gradient(
            90deg,
            transparent,
            ${card.accent}55,
            transparent
          )`,
                }}
            />

            <div className="absolute left-7 top-7 text-xs tracking-[0.2em]" style={{ color: `${card.accent}aa` }}>
                {card.num}
            </div>

            <div
                className="absolute right-6 top-6 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em]"
                style={{
                    border: `1px solid ${card.accent}33`,
                    color: `${card.light}dd`,
                }}
            >
                {card.tag}
            </div>

            <div
                className="absolute bottom-0 left-0 right-0 px-7 pb-8 pt-14"
                style={{
                    background: `linear-gradient(
            to top,
            ${card.gradientFrom}ee,
            transparent
          )`,
                }}
            >
                <p className="mb-2 text-[11px] uppercase tracking-[0.2em]" style={{ color: `${card.accent}bb` }}>
                    {card.subtitle}
                </p>

                <h2 className="mb-5 text-[28px] leading-tight" style={{ color: card.light }}>
                    {card.title}
                </h2>

                <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: `${card.accent}99` }}>
                        {card.year}
                    </span>

                    <button
                        className="flex h-9 w-9 items-center justify-center rounded-full"
                        style={{
                            border: `1px solid ${card.accent}55`,
                        }}
                    >
                        <ArrowIcon color={card.accent} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function CardSlider() {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const stageRef = useRef<HTMLDivElement>(null);

    const currentIndex = useRef(0);

    const renderCards = (offset: number) => {
        cardRefs.current.forEach((card, i) => {
            if (!card) return;

            const delta = i - offset;

            const x = Math.sin(delta * 0.7) * 420;

            const z = Math.cos(delta * 0.7) * 350;

            const rotateY = -delta * 28;

            const scale = gsap.utils.clamp(0.65, 1, 1 - Math.abs(delta) * 0.18);

            const opacity = gsap.utils.clamp(0.25, 1, 1 - Math.abs(delta) * 0.3);

            gsap.set(card, {
                x,
                z,
                scale,
                rotateY,
                opacity,
                zIndex: 1000 - Math.round(Math.abs(delta) * 100),
            });
        });
    };
    useGSAP(() => {
        if (!stageRef.current) return;

        renderCards(currentIndex.current);

        const draggable = Draggable.create(stageRef.current, {
            type: "x",
            autoScroll : 1,

            onDrag() {
                const offset = currentIndex.current - this.x / 700;

                renderCards(offset);
            },

            onRelease() {
                const dragOffset = this.x / 700;

                let next = currentIndex.current;

                if (dragOffset > 0.25) {
                    next = currentIndex.current - 1;
                }

                if (dragOffset < -0.25) {
                    next = currentIndex.current + 1;
                }

                next = gsap.utils.clamp(0, CARDS.length - 1, next);

                currentIndex.current = next;

                gsap.to(this.target, {
                    x: 0,
                    duration: 0.55,
                    ease: "expo.out",
                });

                gsap.to(
                    { value: currentIndex.current - dragOffset },
                    {
                        value: next,
                        duration: 0.55,
                        ease: "expo.out",

                        onUpdate() {
                            renderCards(this.targets()[0].value);
                        },
                    },
                );
            },
        })[0];

        gsap.from(cardRefs.current, {
            opacity: 0,
            y: 60,
            duration: 1.2,
            stagger: 0.08,
            ease: "power4.out",
        });

        return () => {
            draggable.kill();
        };
    }, []);
    return (
        <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden text-white">
            <div className="mb-14 text-center">
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-500">Editorial Collection</p>

                <h1 className="text-5xl font-light">Featured Stories</h1>
            </div>

            <div ref={stageRef} className="relative flex items-center justify-center touch-none cursor-grab active:cursor-grabbing">
                {CARDS.map((card, i) => (
                    <SliderCard
                        key={card.id}
                        card={card}
                        cardRef={(el) => {
                            cardRefs.current[i] = el;
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
