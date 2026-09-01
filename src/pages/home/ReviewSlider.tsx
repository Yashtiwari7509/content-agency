import { reviews } from "@/constant/client_reviews";
import { useEffect, useState } from "react";


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
            className="absolute inset-0 text-sm leading-relaxed line-clamp-3 text-gray-600 transition-opacity duration-700 ease-in-out"
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
            className="absolute inset-0 flex items-center gap-3 transition-opacity duration-100 ease-out hero-bg-mask"
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
