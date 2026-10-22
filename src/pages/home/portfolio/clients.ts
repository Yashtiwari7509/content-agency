import { Andrew1, Nick1, Thomas1 } from "@/assets/ClientImage";
import type { PortfolioClient } from "@/components/portfolio/types";

/** Swap gifUrl paths to your .gif files in /public when ready */
export const portfolioClients: PortfolioClient[] = [
  {
    id: "thomas-delauer",
    name: "Thomas DeLauer",
    handle: "@ThomasDeLauerOfficial",
    role: "4M+ subscribers",
    avatar: Thomas1,
    gifUrl: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610817/thomas_gif_video_ijkltg.mp4",
    photos: [
      "https://res.cloudinary.com/decqmmcxq/image/upload/v1781610775/Screenshot_33_cip7ce.png",
      "https://res.cloudinary.com/decqmmcxq/image/upload/v1781610768/Screenshot_34_awewqe.png",
      "https://res.cloudinary.com/decqmmcxq/image/upload/v1781610771/Screenshot_123_mhqjuj.png",
      "https://res.cloudinary.com/decqmmcxq/image/upload/v1781610774/Screenshot_25_clj4v8.png",
    ],
    videos: [
      {
        src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610788/VIDEO_1_umu4vh.mp4",
        title: "Long-form edit",
      },
      { src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610823/dorian_pod_ir9eke.mp4", title: "Brand campaign" },
      { src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610817/thomas_gif_video_ijkltg.mp4", title: "Long-form edit" },
      {
        src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610816/video_4_bkzimp.mp4",
        title: "Long-form edit",
      },
      {
        src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610800/video_5_frsmvs.mp4",
        title: "Long-form edit",
      },
      {
        src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610784/video_3_u4rbwq.mp4",
        title: "Long-form edit",
      },
    ],
  },
  {
    id: "nick-norwitz",
    name: "Nick Norwitz",
    handle: "@nicknorwitzMDPhD",
    role: "1M+ subscribers",
    avatar: Nick1,
    gifUrl: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610782/nick_video_for_gif_gdgvzs.mp4",
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
      { src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610824/3_Engazing_Intro_yet9ws.mp4", title: "Short-form" },
      { src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610829/4_Motion_graphics_q5iryp.mp4", title: "Reel highlight" },
      { src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610820/1_r28ehf.mp4", title: "Short-form" },
      { src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610814/2_Funny_rlwgre.mp4", title: "Short-form" },
      { src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610785/4_Documentry_qyiifi.mp4", title: "Short-form" },
    ],
  },
  {
    id: "andrew-koutnik",
    name: "Andrew Koutnik",
    handle: "@andrewkoutnikphd",
    role: "80k+ followers",
    avatar: Andrew1,
    gifUrl: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610818/2_Inrange_pod_intro_wyzula.mp4",
    photos: [
      "https://res.cloudinary.com/decqmmcxq/image/upload/v1781610775/Screenshot_33_cip7ce.png",
      "https://res.cloudinary.com/decqmmcxq/image/upload/v1781610778/Screenshot_63_fq8lir.png",
      "https://res.cloudinary.com/decqmmcxq/image/upload/v1781610776/Screenshot_66_u9ip2p.png",
      "https://res.cloudinary.com/decqmmcxq/image/upload/v1781610776/Screenshot_64_shotym.png",
    ],
    videos: [
      { src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610833/andrew_trailer_nyefp8.mp4", title: "Story cut" },
      {
        src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610830/1_main_video_bnjpvk.mp4",
        title: "",
      },
      {
        src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610818/2_Inrange_pod_intro_wyzula.mp4",
        title: "",
      },
      {
        src: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610817/andrew_gif_video_scybwe.mp4",
        title: "",
      },
    ],
  },
];
