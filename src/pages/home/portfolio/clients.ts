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
    gifUrl: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610817/thomas_gif_video_ijkltg.mp4",
    photos: ["https://res.cloudinary.com/decqmmcxq/image/upload/v1781200920/main-sample.png", "/image.png", "/b.png", "/hands.png"],
    videos: [
      { src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610816/video_4_bkzimp.mp4", title: "Brand campaign" },
      { src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610823/dorian_pod_ir9eke.mp4", title: "Long-form edit" },
      {
        src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610817/thomas_gif_video_ijkltg.mp4",
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
    gifUrl: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610782/nick_video_for_gif_gdgvzs.mp4",
    photos: ["/utuber2.jpg", "/youtube.png", "/lh.png", "/rh.png"],
    videos: [
      { src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610820/1_r28ehf.mp4", title: "Reel highlight" },
      { src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610814/2_Funny_rlwgre.mp4", title: "Short-form" },
    ],
  },
  {
    id: "andrew-koutnik",
    name: "Andrew Koutnik",
    handle: "@AndrewKoutnik",
    role: "80k+ followers",
    avatar: Andrew1,
    gifUrl: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610818/2_Inrange_pod_intro_wyzula.mp4",
    photos: ["/insta-andrew.jpg", "/abs.jpg", "/profile.webp", "/social.png"],
    videos: [
      { src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610817/andrew_gif_video_scybwe.mp4", title: "Instagram reel" },
      { src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610830/1_main_video_bnjpvk.mp4", title: "Story cut" },
      {
        src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610830/1_main_video_bnjpvk.mp4",
        title: "",
      },
      {
        src: "https://youtu.be/OwpHnBlh1jwhttps://youtu.be/OwpHnBlh1jw",
        title: "",
      },
    ],
  },
];
