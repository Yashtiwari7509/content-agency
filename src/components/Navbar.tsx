import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronDown, LayoutGrid, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContact } from "@/components/contact/ContactContext";
import AuroraFlair from "./AuroraFlair";

const navItems = [{ name: "About", link: "/about" }];

const contactSections = [
  { name: "Our Score", link: "#score" },
  { name: "Portfolio", link: "#portfolio" },
  { name: "Reviews", link: "#Marqee-slider" },
];

export function NavbarTop() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { openContact } = useContact();

  const linksRowRef = useRef<HTMLDivElement>(null); // the row the underline is measured against
  const underlineRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLElement | null>>({});

  const { contextSafe } = useGSAP();

  // Close both menus on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // dropdown: fade/slide the card in, stagger its items
  useGSAP(() => {
    if (!dropdownRef.current) return;
    const items = dropdownRef.current.querySelectorAll("[data-drop-item]");

    // Kill any in-flight tweens first so rapid open/close toggles
    // (fast mouse movement across the navbar) can't leave the panel
    // stuck at a leftover mid-animation opacity.
    gsap.killTweensOf(dropdownRef.current);
    gsap.killTweensOf(items);

    if (dropdownOpen) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -8, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out", overwrite: "auto" },
      );
      gsap.fromTo(
        items,
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.04, delay: 0.05, ease: "power2.out", overwrite: "auto" },
      );
    } else {
      gsap.to(dropdownRef.current, {
        opacity: 0,
        y: -8,
        scale: 0.98,
        duration: 0.2,
        ease: "power2.in",
        overwrite: "auto",
      });
    }
  }, [dropdownOpen]);

  // mobile menu
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

  // hover underline — measured with getBoundingClientRect so it's independent of any
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

  const scrollToSection = (link: string) => {
    document.querySelector(link)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setDropdownOpen(false);
  };

  return (
    <div className="fixed inset-x-0 top-6 z-50 flex w-screen justify-center px-4">
      {/* Desktop */}
      <div
        className={cn(
          "hidden w-full max-w-5xl items-center backdrop justify-between rounded-full px-6 py-3.5 sm:flex border border-white",
          "duration-700 ease-out",
        )}
      >
        <Link to="/" className="relative z-20 flex shrink-0 items-center">
          <img
            src="https://img.freepik.com/premium-vector/colorful-bird-wing-feather-logo-icon_23758-199.jpg?semt=ais_hybrid&w=740&q=80"
            alt="logo"
            width={30}
            height={30}
            className="rounded-full"
          />
        </Link>

        <div
          ref={linksRowRef}
          onMouseLeave={() => {
            // Mouse truly left the entire nav links area (including dropdown panel)
            hideUnderline();
            setDropdownOpen(false);
          }}
          className="relative flex items-center gap-1 text-[13px] font-medium tracking-wide"
        >
          <div
            ref={underlineRef}
            className="pointer-events-none absolute bottom-1 top-1/2 -translate-y-1/2 h-10 rounded-full bg-white opacity-0 -z-10"
          />

          {/* Explore dropdown — opens on pointer-enter, closes on pointer-leave */}
          <div
            className="relative"
            onMouseEnter={() => {
              setDropdownOpen(true);
              moveUnderlineTo("explore");
            }}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              ref={(el) => {
                linkRefs.current.explore = el;
              }}
              className="flex items-center gap-1 px-4 py-2 select-none"
            >
              <span>Explore</span>
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", dropdownOpen && "rotate-180")} />
            </button>

            <div
              className="absolute left-0 top-full pt-2"
              style={{ pointerEvents: dropdownOpen ? "all" : "none" }}
              onMouseEnter={() => setDropdownOpen(true)} // defensive: confirm open if hovered directly
            >
              <div
                ref={dropdownRef}
                className="z-50 w-30 p-1 rounded-2xl border border-white shadow-2xl backdrop-blur-xl bg-white opacity-0"
              >
                {contactSections.map((s) => (
                  <span
                    key={s.link}
                    data-drop-item
                    onClick={() => {
                      scrollToSection(s.link);
                      setDropdownOpen(false);
                    }}
                    className="block cursor-pointer rounded-xl px-3.5 py-2.5 text-[13px] text-neutral-600 transition-colors hover:bg-black hover:text-white"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {navItems.map((item) => (
            <NavLink
              key={item.link}
              ref={(el) => {
                linkRefs.current[item.link] = el;
              }}
              onMouseEnter={() => {
                // Moving to a regular nav link dismisses the explore dropdown immediately
                setDropdownOpen(false);
                moveUnderlineTo(item.link);
              }}
              to={item.link}
              viewTransition
              className="px-4 py-2"
            >
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
        <AuroraFlair
          className={cn(
            "relative shrink-0 cursor-pointer border-white border overflow-hidden rounded-full px-6 py-2.5 text-[13px] font-semibold transition-colors duration-700",
          )}
        >
          <h1 onClick={openContact} className="relative z-10">
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
          <Link to="/" className="flex items-center px-1 py-1">
            <img
              src="https://img.freepik.com/premium-vector/colorful-bird-wing-feather-logo-icon_23758-199.jpg?semt=ais_hybrid&w=740&q=80"
              alt="logo"
              width={28}
              height={28}
              className="rounded-full"
            />
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
              <span>{item.name}</span>
            </NavLink>
          ))}

          {location.pathname === "/" && (
            <div className="mt-1 flex flex-col gap-1 cursor-pointer">
              {contactSections.map((s) => (
                <span
                  key={s.link}
                  data-mobile-item
                  onClick={() => {
                    scrollToSection(s.link);
                    setMobileOpen(false);
                  }}
                  className="rounded-xl px-3 py-3 text-base text-neutral-600"
                >
                  {s.name}
                </span>
              ))}
            </div>
          )}

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
