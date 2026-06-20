import About from "./About";
import TeamSection from "@/pages/home/TeamSection";
import ContactSection from "@/pages/home/ContactSection";
import SiteFooter from "@/pages/home/SiteFooter";

export default function AboutPage() {
  return (
    <>
      <About />
      <ContactSection />
      <TeamSection />
      <SiteFooter />
    </>
  );
}
