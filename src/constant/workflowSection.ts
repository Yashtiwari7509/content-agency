import { Video, Sparkles, Music, Palette, Film, Layers, Mic, Zap } from "lucide-react";
import { Andrew1, Chris1, Nick1, Rahul1, Thomas1 } from "@/assets/ClientImage";

export const services = [
  {
    title: "VFX Studio",
    subtitle: "Advanced visual effects",
    appLabel: "Effects",
    Icon: Sparkles,
  },
  {
    title: "Motion Graphics",
    subtitle: "Brand animation",
    appLabel: "Motion",
    Icon: Film,
  },
  {
    title: "Color Grading",
    subtitle: "Scene polish & tone",
    appLabel: "Color",
    Icon: Palette,
  },
  {
    title: "Sound Design",
    subtitle: "Music + SFX layers",
    appLabel: "Audio",
    Icon: Music,
  },
  {
    title: "Video Editing",
    subtitle: "Cut, trim & transitions",
    appLabel: "Edit",
    Icon: Video,
  },
  {
    title: "Multi-Layer",
    subtitle: "Compositing & overlay",
    appLabel: "Layers",
    Icon: Layers,
  },
  {
    title: "Voiceover",
    subtitle: "Studio-quality narration",
    appLabel: "Voice",
    Icon: Mic,
  },
  {
    title: "Fast Delivery",
    subtitle: "48 h turnaround",
    appLabel: "Speed",
    Icon: Zap,
  },
];
export const members = [
  {
    src: Andrew1,
    alt: "Andrew",
    name: "Andrew",
    // scale-x-[-1] moved to imgClassName so the wrapper (and tooltip) stay in normal coordinate space
    className: "left-[2%] bottom-2 h-[580px] hidden lg:block z-10 w-110 translate-y-10",
    imgClassName: "scale-x-[-1]",
  },
  {
    src: Thomas1,
    alt: "Thomas",
    name: "Thomas",
    className: "lg:left-[20%] -left-20 bottom-0 w-72 lg:h-[580px] lg:w-120 z-20 translate-y-10",
    imgClassName: "",
  },
  {
    src: Rahul1,
    alt: "Rahul",
    name: "Rahul",
    className: "left-1/2 -translate-x-1/2 bottom-0 w-80 lg:w-120 lg:h-[620px] z-30 translate-y-10",
    imgClassName: "",
  },
  {
    src: Nick1,
    alt: "Nick",
    name: "Nick",
    className: "lg:right-[20%] -right-20 bottom-0 lg:h-[570px] z-20 w-70 lg:w-120 translate-y-10",
    imgClassName: "scale-x-[-1]",
  },
  {
    src: Chris1,
    alt: "Chris",
    name: "Chris",
    className: "right-[10%] bottom-0 h-[580px] hidden lg:block z-10 w-120 translate-y-12",
    imgClassName: "scale-x-[-1]",
  },
];


export interface Card {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  tag: string;
  accent: string;
  light: string;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  num: string;
}

export const CARDS: Card[] = [
  {
    id: 0,
    title: "Aurora Borealis",
    subtitle: "Northern Lights",
    year: "2024",
    tag: "Nature",
    gradientFrom: "#064e3b",
    gradientVia: "#0f766e",
    gradientTo: "#164e63",
    accent: "#5DCAA5",
    light: "#E1F5EE",
    num: "01",
  },
  {
    id: 1,
    title: "Solaris",
    subtitle: "Beyond The Horizon",
    year: "2024",
    tag: "Cosmos",
    gradientFrom: "#2e1065",
    gradientVia: "#581c87",
    gradientTo: "#1e1b4b",
    accent: "#AFA9EC",
    light: "#EEEDFE",
    num: "02",
  },
  {
    id: 2,
    title: "Ember Drift",
    subtitle: "Through The Flame",
    year: "2024",
    tag: "Fire",
    gradientFrom: "#431407",
    gradientVia: "#7f1d1d",
    gradientTo: "#4c0519",
    accent: "#F0997B",
    light: "#FAECE7",
    num: "03",
  },
];

// ─── Card definitions ─────────────────────────────────────────────────────────

export type CardDef =
  | {
    type: "compare";
    firstImage?: string;
    secondImage?: string;
    firstVideo?: string;
    secondVideo?: string;
  }
  | { type: "image"; src: string; alt?: string };

export const cards: CardDef[] = [
  {
    type: "compare",
    firstVideo: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610823/dorian_pod_ir9eke.mp4",
    secondVideo: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610824/3_Engazing_Intro_yet9ws.mp4",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1780552274419-aeae3c7d66fd?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Workflow Preview",
  },
  {
    type: "compare",
    firstVideo: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610823/dorian_pod_ir9eke.mp4",
    secondVideo: "https://res.cloudinary.com/decqmmcxq/video/upload/v1781610824/3_Engazing_Intro_yet9ws.mp4",
  },
];