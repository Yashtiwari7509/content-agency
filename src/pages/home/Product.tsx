import React from "react";
import { ShoppingBag } from "lucide-react";

/* ---------------------------------------------------------
   Progressive blur
   The photo lives in the top portion of the card only. It
   doesn't get cut off with a hard edge — it dissolves into
   the card's own gradient. Layer 0 is the crisp photo itself;
   layers 1-4 are copies of the same photo, each blurrier than
   the last, each masked to a lower/thinner band. Stacked, they
   read as one continuous blur ramp instead of a single flat
   blur — that's what makes it look "progressive" rather than
   like a smudge was pasted on.
--------------------------------------------------------- */
const BLUR_LAYERS = [
  { blur: 3, from: 62, to: 74 },
  { blur: 7, from: 68, to: 82 },
  { blur: 14, from: 76, to: 90 },
  { blur: 24, from: 84, to: 100 },
];

function DissolvingImage({ src, alt, position }: { src: string; alt: string; position: string }) {
  const sharedImgClass = `absolute inset-0 h-full w-full object-cover ${position}`;

  return (
    <div className="absolute inset-0">
      {/* crisp base photo, faded out (not blurred) starting around 60% */}
      <img
        src={src}
        alt={alt}
        className={sharedImgClass}
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 58%, transparent 78%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 58%, transparent 78%)",
        }}
      />

      {/* graduated blur ramp filling the dissolve zone */}
      {BLUR_LAYERS.map(({ blur, from, to }, i) => (
        <img
          key={i}
          src={src}
          alt=""
          aria-hidden
          className={sharedImgClass}
          style={{
            filter: `blur(${blur}px)`,
            maskImage: `linear-gradient(to bottom, transparent ${from}%, black ${from + 4}%, black ${to - 4}%, transparent ${to}%)`,
            WebkitMaskImage: `linear-gradient(to bottom, transparent ${from}%, black ${from + 4}%, black ${to - 4}%, transparent ${to}%)`,
          }}
        />
      ))}
    </div>
  );
}

/* --------------------------------------------------------- */

interface ProductCardProps {
  image: string;
  title: string;
  price?: string;
  cardBg: string; // solid gradient behind the whole card
  imagePosition?: string; // tailwind object-position for the photo
  dark?: boolean; // true = light text (for the near-black card)
}

function ProductCard({ image, title, price, cardBg, imagePosition = "object-center", dark = false }: ProductCardProps) {
  return (
    <div
      className={`group relative flex aspect-[3/4] w-full flex-col overflow-hidden rounded-[32px] transition-transform duration-500 ease-out hover:-translate-y-1 ${cardBg}`}
      style={{
        boxShadow: "0 22px 40px -18px rgba(15,23,42,0.35), 0 4px 10px -4px rgba(15,23,42,0.15)",
      }}
    >
      {/* photo zone — top ~64% of the card, dissolving into the gradient */}
      <div className="relative h-[64%] w-full">
        <DissolvingImage src={image} alt={title} position={imagePosition} />

        {price && (
          <div className="absolute left-3.5 top-3.5 flex items-center gap-1.5 rounded-full bg-white/95 py-1 pl-1.5 pr-3 shadow-sm">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900">
              <ShoppingBag className="h-2.5 w-2.5 text-white" strokeWidth={2.5} />
            </span>
            <span className="text-[12px] font-semibold text-neutral-900">{price}</span>
          </div>
        )}
      </div>

      {/* text zone — sits on the plain gradient, no scrim needed */}
      <div className="relative z-10 flex flex-1 flex-col justify-end px-4 pb-4">
        <h3 className={`mb-3 text-[13.5px] font-medium leading-snug ${dark ? "text-white" : "text-neutral-900"}`}>{title}</h3>
        <button
          className={`w-full rounded-full py-2.5 text-[12.5px] font-medium transition-colors duration-300 active:scale-[0.98] ${dark ? "bg-white/15 text-white backdrop-blur-sm hover:bg-white/25" : "bg-white/70 text-neutral-900 hover:bg-white"
            }`}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- */

const PRODUCTS: ProductCardProps[] = [
  {
    image: "https://picsum.photos/seed/collarless-jacket/500/500",
    title: "Collarless Faux Suede Jacket",
    cardBg: "bg-gradient-to-b from-teal-100 via-emerald-200 to-teal-400",
  },
  {
    image: "https://picsum.photos/seed/beanie-hoodie/500/500",
    title: "Mens Washed Oversized Hoodie",
    price: "$256",
    cardBg: "bg-gradient-to-b from-cyan-100 via-teal-300 to-emerald-500",
    imagePosition: "object-top",
  },
  {
    image: "https://picsum.photos/seed/metallic-hoodie/500/500",
    title: "Mens Washed Oversized Hoodie",
    price: "$128",
    cardBg: "bg-gradient-to-b from-slate-200 via-slate-400 to-slate-500",
  },
  {
    image: "https://picsum.photos/seed/running-silhouette/500/500",
    title: "Mens Washed Oversized Hoodie",
    cardBg: "bg-gradient-to-b from-amber-400 via-orange-600 to-neutral-950",
    dark: true,
  },
];

export default function ProductCardGrid() {
  return (
    <div className="min-h-screen w-full bg-[#efeeeb] px-6 py-14">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-5">
        {PRODUCTS.map((product, i) => (
          <ProductCard key={i} {...product} />
        ))}
      </div>
    </div>
  );
}
