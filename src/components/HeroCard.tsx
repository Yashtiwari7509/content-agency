import { cn } from "@/lib/utils";

type CardBottom = {
    label: string;
    value: string;
};

export type CardStatsItem = {
    top: string[]; // image URLs / imported urls
    bottom: CardBottom[];
    heroCard: boolean;
    animation: boolean;
    alignmentCss: string;
};

const HeroCard = ({ card, id }: { card: CardStatsItem; id: string }) => {
    return (
        <div
            id={id}
            className={cn(
                "bg-white/10 overflow-hidden w-fit h-fit t-center border-2 backdrop rounded-2xl  border-white absolute",
                id,
            )}
            style={{ inset: card.alignmentCss }}
        >
            {/* <div className="absolute w-1 z-10 blur-[2px] h-40 bg-background top-0 right-0 handle"></div> */}

            <div className="inner1 flex w-full h-18  justify-around p-2 items-center gap-2 relative">
                {card.top.map((img, i) => (
                    <div key={i} className="size-15 shrink-0 rounded-xl overflow-hidden p-2 bg-gray-50/40">
                        <img
                            src={img}
                            // style={{ scale: i === 1 ? 1.3 : 1 }}
                            className="object-cover overflow-hidden rounded-lg w-full h-full"
                            alt=""
                        />
                    </div>
                ))}
            </div>
            <div className="flex inner2 w-full h-12 bg-gray-50 justify-around p-2 items-center gap-2 relative">
                {card.bottom.map((txt, i) => (
                    <div key={i} className="size-10 shrink-0  flex flex-col justify-center items-center p-2 bg-gray-50">
                        <h2 className="font-bold">{txt.value}</h2>
                        <p className="font-extralight text-xs leading-none tracking-tighter">{txt.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeroCard;
