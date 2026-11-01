import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronDown, LayoutGrid, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContact } from "@/components/contact/ContactContext";
import AuroraFlair from "./AuroraFlair";

// ─── Data ────────────────────────────────────────────────────────────────────

const navItems = [{ name: "About", link: "/about" }];

const servicesItems = [
  { name: "Short-Form Video Editing", link: "#phone-section" },
  { name: "Long-Form Video Editing", link: "#portfolio" },
  { name: "Social Media Management", link: "#our-impact" },
];

const homeSections = [
  { name: "Our Score", link: "#score" },
  { name: "Reviews", link: "#Marqee-Tag" },
];

// TODO: replace these link values with the actual section IDs on the About page
const aboutSections = [
  { name: "Achievements", link: "#acheive" },
  { name: "Founders", link: "#founders" },
];

// ─── NavDropdown ──────────────────────────────────────────────────────────────

type DropdownItem = { name: string; link: string };

interface NavDropdownProps {
  /** The label shown in the trigger button */
  label: string;
  items: DropdownItem[];
  /** Called by the parent to register the trigger button ref for underline tracking */
  buttonRef?: (el: HTMLButtonElement | null) => void;
  onOpen?: () => void;
  /** Width class for the panel, e.g. "w-44" */
  panelWidth?: string;
  /** Optional click handler per item (overrides default href navigation) */
  onItemClick?: (item: DropdownItem) => void;
}

function NavDropdown({ label, items, buttonRef, onOpen, panelWidth = "w-44", onItemClick }: NavDropdownProps) {
  return (
    <div className="group relative" onMouseEnter={() => onOpen?.()}>
      <button ref={buttonRef} className="flex items-center gap-1 px-4 py-2 select-none">
        <p>{label}</p>
        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
      </button>

      {/* Invisible bridge so moving to the panel doesn't close the dropdown */}
      <div className="absolute left-0 top-full h-3 w-full" />

      <div
        className={cn(
          "absolute left-0 top-full mt-3 z-50 p-1 rounded-2xl border border-white bg-white",
          "opacity-0 scale-[0.97] pointer-events-none whitespace-nowrap",
          "transition-[opacity,transform] duration-150 ease-out",
          "group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto",
          panelWidth,
        )}
      >
        {items.map((item) => (
          <a
            key={item.name}
            href={item.link}
            onClick={(e) => {
              if (onItemClick) {
                e.preventDefault();
                onItemClick(item);
              }
            }}
            className="block cursor-pointer rounded-xl font-light px-3.5 py-2.5 text-[13px] transition-colors hover:bg-black hover:text-white"
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── NavbarTop ────────────────────────────────────────────────────────────────

export function NavbarTop() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { openContact } = useContact();

  const linksRowRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLElement | null>>({});

  const { contextSafe } = useGSAP();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu animation
  useGSAP(() => {
    if (!mobileMenuRef.current) return;
    const items = mobileMenuRef.current.querySelectorAll("[data-mobile-item]");
    gsap.killTweensOf(mobileMenuRef.current);
    gsap.killTweensOf(items);

    if (mobileOpen) {
      mobileMenuRef.current.style.visibility = "visible";
      mobileMenuRef.current.style.pointerEvents = "all";
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power3.out", overwrite: "auto" },
      );
      gsap.fromTo(
        items,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, delay: 0.1, ease: "power2.out", overwrite: "auto" },
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -16,
        duration: 0.25,
        ease: "power2.in",
        overwrite: "auto",
        onComplete: () => {
          if (mobileMenuRef.current) {
            mobileMenuRef.current.style.visibility = "hidden";
            mobileMenuRef.current.style.pointerEvents = "none";
          }
        },
      });
    }
  }, [mobileOpen]);

  // Hover underline — measured with getBoundingClientRect so it's independent of any
  // nested "relative" wrappers (this was the source of the mispositioning before)
  const moveUnderlineTo = contextSafe((key: string) => {
    const el = linkRefs.current[key];
    const row = linksRowRef.current;
    if (!el || !row || !underlineRef.current) return;
    const elRect = el.getBoundingClientRect();
    const rowRect = row.getBoundingClientRect();
    gsap.to(underlineRef.current, {
      opacity: 1,
      width: elRect.width,
      x: elRect.left - rowRect.left,
      duration: 0.4,
      ease: "back.out",
      overwrite: "auto",
    });
  });

  const hideUnderline = contextSafe(() => {
    if (!underlineRef.current) return;
    gsap.to(underlineRef.current, { opacity: 0, duration: 0.2, ease: "power2.inOut", overwrite: "auto" });
  });

  const currentSections = location.pathname === "/about" ? aboutSections : homeSections;

  const scrollToSection = (link: string) => {
    document.querySelector(link)?.scrollIntoView({
      behavior: "smooth",
      block: link === "#our-impact" ? "center" : "start",
    });
  };

  const isHome = location.pathname === "/";

  return (
    <div className="fixed inset-x-0 top-6 z-50 flex w-screen justify-center px-4">
      {/* Desktop */}
      <div
        className={cn(
          "hidden w-full max-w-5xl items-center backdrop justify-between rounded-full px-4 py-3.5 sm:flex border border-white",
          "duration-700 ease-out",
        )}
      >
        <Link
          to="/"
          className="relative z-20 font-bold flex text-2xl shrink-0 items-center px-2 rounded-full"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/";
          }}
        >
          <p className="the">The X</p>
          <p className="xpro">Pro</p>
        </Link>

        <div
          ref={linksRowRef}
          onMouseLeave={() => {
            // Mouse truly left the entire nav links area (including dropdown panel)
            hideUnderline();
          }}
          className="relative flex items-center gap-1 text-[13px] font-medium tracking-wide"
        >
          <div
            ref={underlineRef}
            className="pointer-events-none absolute bottom-1 top-1/2 -translate-y-1/2 h-10 rounded-full bg-white opacity-0 -z-10"
          />

          {/* Services dropdown — home route only */}
          {isHome && (
            <NavDropdown
              label="Services"
              items={servicesItems}
              panelWidth="w-60"
              buttonRef={(el) => {
                linkRefs.current.services = el;
              }}
              onOpen={() => moveUnderlineTo("services")}
              onItemClick={(item) => scrollToSection(item.link)}
            />
          )}

          {/* Explore dropdown */}
          <NavDropdown
            label="Explore"
            items={currentSections}
            panelWidth="w-36"
            buttonRef={(el) => {
              linkRefs.current.explore = el;
            }}
            onOpen={() => moveUnderlineTo("explore")}
            onItemClick={(item) => scrollToSection(item.link)}
          />
          {isHome && (
            <NavLink
              ref={(el) => {
                linkRefs.current["portfolio"] = el;
              }}
              onMouseEnter={() => {
                moveUnderlineTo("portfolio");
              }}
              to="#"
              onClick={() => scrollToSection("#portfolio")}
              viewTransition
              className="px-4 py-2"
            >
              <p>Portfolio</p>
            </NavLink>
          )}

          {navItems.map((item) => (
            <NavLink
              key={item.link}
              ref={(el) => {
                linkRefs.current[item.link] = el;
              }}
              onMouseEnter={() => {
                moveUnderlineTo(item.link);
              }}
              to={item.link}
              viewTransition
              className="px-4 py-2"
            >
              <p>{item.name}</p>
            </NavLink>
          ))}
        </div>
        <AuroraFlair
          className={cn(
            "relative shrink-0 cursor-pointer bg-white border-white border overflow-hidden rounded-full px-6 py-2.5 text-[13px] font-semibold transition-colors duration-700",
          )}
        >
          <h1 onClick={openContact} className="relative z-10 rounded-full">
            Book call
          </h1>
        </AuroraFlair>
      </div>

      {/* Mobile */}
      <div className="mx-auto w-full max-w-[calc(100vw-2rem)] sm:hidden">
        <div
          className={cn(
            "flex items-center justify-between rounded-full px-3 py-2 transition-[background-color,border-color] duration-700 backdrop border border-white/40",
          )}
        >
          <Link
            to="/"
            className="relative z-20 text-xl font-bold flex shrink-0 items-center px-4 py-2 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/";
            }}
          >
            <p className="the">The X</p>
            <p className="xpro">Pro</p>
          </Link>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={cn("rounded-full border p-2.5 transition-colors border-white/40", scrolled ? " text-neutral-900" : " text-white")}
          >
            {mobileOpen ? <X size={18} /> : <LayoutGrid size={18} />}
          </button>
        </div>

        {/* Mobile menu — starts hidden and non-interactive; GSAP controls visibility on open/close */}
        <div
          ref={mobileMenuRef}
          className="fixed inset-x-4 top-24 z-50 flex flex-col justify-center items-center rounded-3 bg-white/95 p-4 opacity-0 rounded-2xl backdrop-blur-2xl"
          style={{ visibility: "hidden", pointerEvents: "none" }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.link}
              data-mobile-item
              to={item.link}
              viewTransition
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 text-lg text-neutral-800"
            >
              <p>{item.name}</p>
            </NavLink>
          ))}

          <div className="mt-1 flex flex-col gap-1 cursor-pointer">
            {currentSections.map((s) => (
              <p
                key={s.link}
                data-mobile-item
                onClick={() => {
                  scrollToSection(s.link);
                  setMobileOpen(false);
                }}
                className="rounded-xl px-3 py-3 text-base text-neutral-600"
              >
                {s.name}
              </p>
            ))}
          </div>

          <button
            data-mobile-item
            onClick={() => {
              setMobileOpen(false);
              openContact();
            }}
            className="mt-3 rounded-full w-full cursor-pointer bg-neutral-900 px-6 py-3 text-sm  text-white"
          >
            Book call
          </button>
        </div>
      </div>
    </div>
  );
}
