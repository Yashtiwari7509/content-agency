import { Andrew, Nick, Thomas } from "@/assets/ClientImage";
import type { PortfolioClient } from "@/components/portfolio/types";


/** Swap gifUrl paths to your .gif files in /public when ready */
export const portfolioClients: PortfolioClient[] = [
  {
    id: "thomas-delauer",
    name: "Thomas DeLauer",
    handle: "@ThomasDeLauer",
    role: "4M+ subscribers",
    avatar: Thomas,
    gifUrl: "/video2.mp4",
    photos: ["https://res.cloudinary.com/decqmmcxq/image/upload/v1781200920/main-sample.png", "/image.png", "/b.png", "/hands.png"],
    videos: [
      { src: "/video.mp4", title: "Brand campaign" },
      { src: "/video2.mp4", title: "Long-form edit" },
      {
        src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781200912/samples/elephants.mp4",
        title: "Long-form edit",
      },
    ],
  },
  {
    id: "nick-norwitz",
    name: "Nick Norwitz",
    handle: "@NickNorwitz",
    role: "1M+ subscribers",
    avatar: Nick,
    gifUrl: "/video.mp4",
    photos: ["/utuber2.jpg", "/youtube.png", "/lh.png", "/rh.png"],
    videos: [
      { src: "/video2.mp4", title: "Reel highlight" },
      { src: "/wave1.mp4", title: "Short-form" },
    ],
  },
  {
    id: "andrew-koutnik",
    name: "Andrew Koutnik",
    handle: "@AndrewKoutnik",
    role: "80k+ followers",
    avatar: Andrew,
    gifUrl: "/video2.mp4",
    photos: ["/insta-andrew.jpg", "/abs.jpg", "/profile.webp", "/social.png"],
    videos: [
      { src: "/video.mp4", title: "Instagram reel" },
      { src: "/wave1.mp4", title: "Story cut" },
      {
        src: "https://youtu.be/HCZsTtu7nP0",
        title: "",
      },
      {
        src: "https://youtu.be/OwpHnBlh1jwhttps://youtu.be/OwpHnBlh1jw",
        title: "",
      },
    ],
  },
];
