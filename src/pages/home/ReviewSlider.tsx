import { A_dp, Andrew1, N_dp, Nick1, T_dp, Thomas1 } from "@/assets/ClientImage";
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
    image: Andrew1,
    review:
      "The podcast intros Xpro creates are excellent at hooking viewers right from the start and encouraging them to watch the full episode. One that particularly stood out was the intro for the episode featuring Max as a guest — it captured the moment perfectly and set the tone for the whole conversation.",
    name: "Andrew Koutnik",
    designation: "YouTube Creator",
    avatar: A_dp,
  },
  {
    id: 2,
    image: Nick1,
    review:
      "These guys came on board early in my YouTube journey, back when I had around 55K subscribers, and they've played a big role in helping me break down complex, nerdy concepts into something my audience can easily follow and stay engaged with. Their work is efficient, reliable, and always delivered on time.",
    name: "Nick Norwitz",
    designation: "YouTube Creator",
    avatar: N_dp,
  },
  {
    id: 3,
    image: Thomas1,
    review:
      "The animations you guys created helped me explain complex concepts in a way that truly resonated with my audience. Their attention to detail and creativity is evident, and it's no surprise our community consistently praises their work in the comments.",
    name: "Thomas Delauer",
    designation: "YouTube Creator",
    avatar: T_dp,
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
