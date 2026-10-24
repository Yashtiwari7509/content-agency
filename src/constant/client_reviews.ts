import { A_dp, Andrew1, C_dp, N_dp, Nick1, S_dp, T_dp, Thomas1 } from "@/assets/ClientImage";

export const reviews1 = [
  {
    name: "Thomas DeLauer",
    username: "@ThomasDeLauer",
    body: "Motion graphics elevated our entire brand.",
    img: T_dp,
  },
  {
    name: "Nick Norwitz",
    username: "@NickNorwitz",
    body: "Editor truly understands complex science topics.",
    img: N_dp,
  },
  {
    name: "Dr. Andrew koutnik",
    username: "@andrewkoutnikphd",
    body: "Fast, reliable, incredibly professional service.",
    img: A_dp,
  },
  {
    name: "Dr. Chris Palmer",
    username: "@ChrisPalmerMD",
    body: "24-hour turnaround saved us, repeatedly.",
    img: C_dp,
  },
  {
    name: "Dr. Scott Sherr",
    username: "@drscottsherr",
    body: "Xpro turned my expertise into great content.",
    img: S_dp,
  },
];

export const reviews2 = [
  {
    name: "Thomas DeLauer",
    username: "@ThomasDeLauer",
    body: "Complex mechanisms explained with perfect clarity.",
    img: T_dp,
  },
  {
    name: "Nick Norwitz",
    username: "@NickNorwitz",
    body: "Motion graphics make dense research digestible.",
    img: N_dp,
  },
  {
    name: "Dr. Andrew koutnik",
    username: "@andrewkoutnikphd",
    body: "Every reel feels deeply researched, intentional.",
    img: A_dp,
  },
  {
    name: "Dr. Chris Palmer",
    username: "@ChrisPalmerMD",
    body: "VSL video captured our MH2 clinic perfectly.",
    img: C_dp,
  },
  {
    name: "Dr. Scott Sherr",
    username: "@drscottsherr",
    body: "Made my solo channel finally happen.",
    img: S_dp,
  },
];

export const reviews3 = [
  {
    name: "Thomas DeLauer",
    username: "@ThomasDeLauer",
    body: "Handled our huge volume, zero missed deadlines.",
    img: T_dp,
  },
  {
    name: "Nick Norwitz",
    username: "@NickNorwitz",
    body: "Understands journal references better than expected.",
    img: N_dp,
  },
  {
    name: "Dr. Andrew koutnik",
    username: "@andrewkoutnikphd",
    body: "Loved our podcast, especially that cinematic intro.",
    img: A_dp,
  },
  {
    name: "Dr. Chris Palmer",
    username: "@ChrisPalmerMD",
    body: "The Xpro, our first go-to agency.",
    img: C_dp,
  },
  {
    name: "Dr. Scott Sherr",
    username: "@drscottsherr",
    body: "Color grading finally looks consistent and professional.",
    img: S_dp,
  },
];
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
      "Their Reels have significantly improved retention on my Instagram page, and their podcast editing is equally impressive. The team consistently delivers high-quality work.",
    name: "Dr. Andrew Koutnik",
    designation: "Performance Scientist",
    avatar: A_dp,
  },
  {
    id: 2,
    image: Nick1,
    review:
      "They’ve been with me since 55K subscribers, turning complex concepts into engaging content with consistent, reliable, on-time delivery.",
    name: "Dr. Nick Norwitz",
    designation: "Health Researcher and Scientist",
    avatar: N_dp,
  },
  {
    id: 3,
    image: Thomas1,
    review:
      "The animations made complex concepts easy to understand, with creativity and attention to detail that our community consistently praises.",
    name: "Thomas Delauer",
    designation: "Fitness and Nutrition Expert",
    avatar: T_dp,
  },
];

export interface Project {
  index: string;
  category: string;
  title: string;
  year: string;
  image: string;
}

export const projects: Project[] = [
  {
    index: "01",
    category: "Production — Delivery",
    title: "2500+ Videos",
    year: "Counting",
    image: "https://res.cloudinary.com/decqmmcxq/image/upload/v1791996880/workflow1_boft0i.webp",
  },
  {
    index: "02",
    category: "Relationships — Trust",
    title: "50+ Satisfied Clients",
    year: "Clients",
    image: "https://res.cloudinary.com/decqmmcxq/image/upload/v1791996880/workflow2_ml3zhy.webp",
  },
  {
    index: "03",
    category: "Team — Specialists",
    title: "20+ Team Members",
    year: "People",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    index: "04",
    category: "YouTube — Management",
    title: "40 Channels Managed",
    year: "Growth",
    image: "https://res.cloudinary.com/decqmmcxq/image/upload/v1791996880/workflow3_abi5sf.webp",
  },
];
