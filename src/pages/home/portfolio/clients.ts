import { Andrew1, Nick1, Thomas1 } from "@/assets/ClientImage";
import type { PortfolioClient } from "@/components/portfolio/types";

/** Swap gifUrl paths to your .gif files in /public when ready */
export const portfolioClients: PortfolioClient[] = [
  {
    id: "thomas-delauer",
    name: "Thomas DeLauer",
    handle: "@ThomasDeLauerOfficial",
    role: "4M+ subscribers",
    platform: "youtube",
    avatar: Thomas1,
    gifUrl: "https://res.cloudinary.com/vngznh0k/video/upload/v1793552952/Thomas_Gif_Video.mp4",
    photos: [
      "https://res.cloudinary.com/decqmmcxq/image/upload/v1781610775/Screenshot_33_cip7ce.png",
      "https://res.cloudinary.com/decqmmcxq/image/upload/v1781610768/Screenshot_34_awewqe.png",
      "https://res.cloudinary.com/decqmmcxq/image/upload/v1781610771/Screenshot_123_mhqjuj.png",
      "https://res.cloudinary.com/decqmmcxq/image/upload/v1781610774/Screenshot_25_clj4v8.png",
    ],
    videos: [
      {
        src: "https://res.cloudinary.com/vngznh0k/video/upload/v1793552942/Video_1.mp4",
        title: "Long-form edit",
      },
      { src: "https://res.cloudinary.com/vngznh0k/video/upload/v1793552967/Video_2.mp4", title: "Brand campaign" },
      { src: "https://res.cloudinary.com/vngznh0k/video/upload/v1793552922/Video_3.mp4", title: "Long-form edit" },
      {
        src: "https://res.cloudinary.com/vngznh0k/video/upload/v1793552968/Video_4.mp4",
        title: "Long-form edit",
      },
      {
        src: "https://res.cloudinary.com/vngznh0k/video/upload/v1793552956/Video_5.mp4",
        title: "Long-form edit",
      },
      {
        src: "https://res.cloudinary.com/vngznh0k/video/upload/v1793552959/Pod_Intro_Tommy.mp4",
        title: "Long-form edit",
      },
      {
        src: "https://res.cloudinary.com/vngznh0k/video/upload/v1793552978/Dorian_Pod.mp4",
        title: "Long-form edit",
      },
    ],
  },
  {
    id: "nick-norwitz",
    name: "Nick Norwitz",
    handle: "@nicknorwitzMDPhD",
    role: "1M+ subscribers",
    platform: "youtube",
    avatar: Nick1,
    gifUrl: "https://res.cloudinary.com/vngznh0k/video/upload/v1793552769/Nick_Video_For_Gif.mp4",
    photos: [
      "https://res.cloudinary.com/decqmmcxq/image/upload/v1781610775/Screenshot_52_vgj5x7.png",
      "https://res.cloudinary.com/decqmmcxq/image/upload/v1781610775/Screenshot_39_ade8js.png",
      "https://res.cloudinary.com/decqmmcxq/image/upload/v1781610774/Screenshot_43_neeqyb.png",
      "https://res.cloudinary.com/decqmmcxq/image/upload/v1781610774/Screenshot_58_lbljkj.png",
      "https://res.cloudinary.com/decqmmcxq/image/upload/v1781610766/Screenshot_104_ejnlj1.png",
      "https://res.cloudinary.com/decqmmcxq/image/upload/v1781610769/Screenshot_54_nz6ibg.png",
      "https://res.cloudinary.com/decqmmcxq/image/upload/v1781610769/Screenshot_46_ytjnuz.png",
    ],
    videos: [
      { src: "https://res.cloudinary.com/vngznh0k/video/upload/v1793552800/1.mp4", title: "Short-form" },
      { src: "https://res.cloudinary.com/vngznh0k/video/upload/v1793552801/2_Funny.mp4", title: "Reel highlight" },
      { src: "https://res.cloudinary.com/vngznh0k/video/upload/v1793552826/3_Engazing_Intro.mp4", title: "Short-form" },
      { src: "https://res.cloudinary.com/vngznh0k/video/upload/v1793552772/4_Documentry.mp4", title: "Short-form" },
      { src: "https://res.cloudinary.com/vngznh0k/video/upload/v1793552810/5_Motion_Graphics.mp4", title: "Short-form" },
    ],
  },
  {
    id: "andrew-koutnik",
    name: "Andrew Koutnik",
    handle: "@andrewkoutnikphd",
    role: "100k+ followers",
    avatar: Andrew1,
    platform: "instagram",
    url: "https://www.instagram.com/andrewkoutnikphd",
    gifUrl: "https://res.cloudinary.com/vngznh0k/video/upload/v1793552434/Andrew_Gif_Video.mp4",
    photos: [
      "https://res.cloudinary.com/vngznh0k/image/upload/v1793552342/Screenshot_63.png",
      "https://res.cloudinary.com/vngznh0k/image/upload/v1793552205/Screenshot_66.png",
      "https://res.cloudinary.com/vngznh0k/image/upload/v1793552206/Screenshot_64.png",
      "https://res.cloudinary.com/vngznh0k/image/upload/v1793552208/Screenshot_101.png",
      "https://res.cloudinary.com/vngznh0k/image/upload/v1793552210/Screenshot_129.png",
    ],
    videos: [
      { src: "https://res.cloudinary.com/vngznh0k/video/upload/v1793552464/1_Main_Video.mp4", title: "Story cut" },
      {
        src: "https://res.cloudinary.com/vngznh0k/video/upload/v1793552554/2_Inrange_pod_intro.mp4",
        title: "",
      },
      {
        src: "https://res.cloudinary.com/vngznh0k/video/upload/v1793552434/Andrew_Trailer.mp4",
        title: "",
      },
    ],
  },
];
