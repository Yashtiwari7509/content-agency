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
    name: "Dr. Andrew Huberman",
    username: "@hubermanlab",
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
    name: "Dr. Andrew Huberman",
    username: "@hubermanlab",
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
    name: "Dr. Andrew Huberman",
    username: "@hubermanlab",
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
    image: "https://images.unsplash.com/photo-1574717024453-354056aafa98?q=80&w=1200&auto=format&fit=crop",
  },
  {
    index: "02",
    category: "Relationships — Trust",
    title: "50+ Satisfied Clients",
    year: "Clients",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
  },
];
