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
  // const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <footer ref={footerRef} className="relative w-full overflow-hidden" style={{ background: "#050508" }}>
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
            <p className="text-white text-2xl md:text-3xl font-semibold tracking-tight leading-snug">Ready to scale your content?</p>
          </div>
          <div className="flex items-center gap-5">
            {/* Social icons */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="group w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                  }}
                >
                  <s.icon size={14} className="text-gray-500 group-hover:text-white transition-colors duration-200" />
                </a>
              ))}
            </div>
            {/* CTA button */}
            <a
              href="#contact-section"
              className="group flex items-center whitespace-nowrap gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white border border-white/20 transition-all duration-300 hover:opacity-85 active:scale-95"
            >
              Book a Call
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
        {/* ── Divider ── */}
        {/* <div className="mx-8 max-w-7xl md:mx-auto h-px" style={{ background: "rgba(255,255,255,0.06)" }} /> */}
        {/* <div
          className="relative z-10 w-full overflow-hidden py-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div ref={marqueeRef} className="flex items-center whitespace-nowrap" style={{ willChange: "transform" }}>
            {Array.from({ length: 2 }).map((_, di) =>
              [
                "Video Editing",
                "Color Grading",
                "Motion Graphics",
                "Cinematic Reels",
                "Thumbnail Design",
                "Channel Strategy",
                "Brand Storytelling",
                "Content Scaling",
              ].map((item, i) => (
                <span key={`${di}-${i}`} className="flex items-center shrink-0">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-medium px-8" style={{ color: "rgba(255,255,255,0.28)" }}>
                    {item}
                  </span>
                  <span className="inline-block w-[3px] h-[3px] rounded-full shrink-0" style={{ background: ACCENT }} />
                </span>
              )),
            )}
          </div>
        </div>
        <div className="ft-bottom-bar relative z-10 mx-auto max-w-7xl px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          <nav className="flex flex-wrap gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-gray-600 hover:text-white transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="text-xs tracking-wide" style={{ color: "rgba(255,255,255,0.18)" }}>
            © {new Date().getFullYear()} ContentAgency
          </p>
          <div className="flex gap-5">
            {["Privacy", "Terms"].map((item) => (
              <a key={item} href="#" className="text-xs text-gray-700 hover:text-gray-400 transition-colors duration-200 tracking-wide">
                {item}
              </a>
            ))}
          </div>
        </div> */}
      </div>
    </footer>
  );
}
