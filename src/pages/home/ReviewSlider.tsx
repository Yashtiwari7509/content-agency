import { Andrew, Nick, Thomas } from "@/assets/ClientImage";
import { useEffect, useState } from "react";

export type ReviewItem = {
  id: number;
  image: string;
  review: string;
  name: string;
  designation: string;
  avatar: string;
};

export const reviews: ReviewItem[] = [
  {
    id: 1,
    image: Andrew,
    review: "They took our YouTube channel from 2K to 40K subs in 6 months. Every video feels on-brand and the edits are cinematic.",
    name: "Andrew",
    designation: "YouTube Creator",
    avatar: Andrew,
  },
  {
    id: 2,
    image: Nick,
    review: "Our brand reel hit 700K views in the first week. The team understood our vision & delivered beyond expectations.",
    name: "Nick",
    designation: "YouTube Creator",
    avatar: Nick,
  },
  {
    id: 3,
    image: Thomas,
    review: "The social content they produce drives real engagement. Our Instagram grew 3× and the quality is consistently top-tier.",
    name: "Thomas",
    designation: "YouTube Creator",
    avatar: Thomas,
  },
];

const INTERVAL_MS = 4500;

const ReviewSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % reviews.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-full flex flex-col px-4 py-5 gap-3">
      <div className="relative flex-1 min-h-0 rounded-xl overflow-hidden hero-bg-mask">
        {reviews.map((item, i) => (
          <img
            key={item.id}
            src={item.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === current ? 1 : 0 }}
          />
        ))}
      </div>

      <div className="relative min-h-[4.5rem] shrink-0">
        {reviews.map((item, i) => (
          <blockquote
            key={item.id}
            className="absolute inset-0 text-sm leading-relaxed text-gray-600 transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            &ldquo;{item.review}&rdquo;
          </blockquote>
        ))}
      </div>

      <div className="relative shrink-0 min-h-[3rem]">
        {reviews.map((item, i) => (
          <div
            key={item.id}
            className="absolute inset-0 flex items-center gap-3 transition-opacity duration-700 ease-in-out hero-bg-mask"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <img src={item.avatar} alt={item.name} className="size-10 rounded-full object-cover border-2 border-white shadow-sm" />
            <div>
              <p className="text-sm font-semibold text-gray-900 leading-tight">{item.name}</p>
              <p className="text-xs text-gray-500">{item.designation}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-1.5 justify-center pt-1">
        {reviews.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Go to review ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-4 h-1.5 bg-gray-800" : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewSlider;
