import About from "./About";
import TeamSection from "@/pages/home/TeamSection";
import ContactSection from "@/pages/home/ContactSection";
import SiteFooter from "@/pages/home/SiteFooter";
// import ScrollAboutCards from "./ScrollAboutCards";
import WorkCards from "./ScrollAboutCards";
import FoundersSection from "@/pages/home/FoundersSection";

export default function AboutPage() {
  return (
    <>
      <About />
      <WorkCards />
      <FoundersSection />
      <ContactSection />
      <TeamSection />
      <SiteFooter />
    </>
  );
}
