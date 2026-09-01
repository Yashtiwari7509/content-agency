import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Instagram, Youtube, Twitter, Linkedin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Twitter, label: "X / Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

// const navLinks = [
//   { label: "Home", href: "/" },
//   { label: "About", href: "/about" },
//   { label: "Services", href: "#" },
//   { label: "Portfolio", href: "#" },
//   { label: "Contact", href: "#contact-section" },
// ];

const ACCENT = "oklch(0.55 0.15 208.93)";

export default function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);

  return (
    <footer ref={footerRef} className="relative w-full overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute top-0 w-[900px] h-[500px] rounded-full opacity-10 blur-[120px]"
          style={{ background: `radial-gradient(ellipse, ${ACCENT}, transparent 40%)` }}
        />
        {/* ── Top stripe: CTA + socials ── */}
        <div className="ft-top-row relative z-10 mx-auto max-w-7xl px-4 pt-10 pb-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.22em] font-medium" style={{ color: ACCENT }}>
              Let's collaborate
            </p>
            <p className="text-black text-2xl md:text-3xl font-semibold tracking-tight leading-snug">Ready to scale your content?</p>
          </div>
          <div className="flex items-center gap-5">
            {/* Social icons */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="group w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 bg-gray-100"
                >
                  <s.icon size={14} className="text-gray-500 group-hover:text-black transition-colors duration-200" />
                </a>
              ))}
            </div>
            {/* CTA button */}
            <a
              href="#contact-section"
              className="group flex items-center whitespace-nowrap gap-2 px-6 py-3 rounded-full text-sm font-semibold text-black border border-black/20 transition-all duration-300 hover:opacity-85 active:scale-95"
            >
              Book a Call
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
