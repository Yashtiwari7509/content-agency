import { Andrew1, Nick1, Thomas1 } from "@/assets/ClientImage";
import type { PortfolioClient } from "@/components/portfolio/types";


/** Swap gifUrl paths to your .gif files in /public when ready */
export const portfolioClients: PortfolioClient[] = [
  {
    id: "thomas-delauer",
    name: "Thomas DeLauer",
    handle: "@ThomasDeLauer",
    role: "4M+ subscribers",
    avatar: Thomas1,
    gifUrl: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781449073/2_Inrange_pod_intro_kp3oj3.mp4",
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
    avatar: Nick1,
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
    avatar: Andrew1,
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
