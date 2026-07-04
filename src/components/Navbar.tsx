import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { ChevronDown } from "lucide-react";
import { useContact } from "@/components/contact/ContactContext";

export function NavbarTop() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | number | null>(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const { openContact } = useContact();

  const navItems = [
    {
      name: "About",
      link: "/about",
    },
  ];

  const contactSections = [
    {
      name: "Our Score",
      link: "#score",
    },
    {
      name: "Portfolio",
      link: "#portfolio",
    },
    {
      name: "Reviews",
      link: "#Marqee-slider",
    },
  ];

  const { contextSafe } = useGSAP();
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  // const params = ();
  const handleEnter = contextSafe(() => {
    gsap.to("#bg", {
      top: "-30%",
      duration: 1,
      ease: "power2.out",
    });
    gsap.to("#bg img", {
      rotateZ: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
    });
    gsap.to("#btn-txt", {
      yPercent: -20,
      duration: 0.3,
      scale: 1.2,
    });
  });
  const handleLeave = contextSafe(() => {
    gsap.to("#bg", {
      top: "150%",
      duration: 1,
      ease: "elastic.out",
    });
    gsap.to("#bg img", {
      rotateZ: 0,
      duration: 1,
      repeat: 0,
      ease: "none",
    });
    gsap.to("#btn-txt", {
      yPercent: 0,
      duration: 0.3,
      scale: 1,
    });
  });

  const OnMouseEnter = () => {
    handleEnter();
  };
  const OnMouseLeave = () => {
    handleLeave();
  };

  const handleSectionClick = (link: string) => {
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-screen flex justify-center items-center fixed z-50">
      <Navbar className="max-w-5xl mt-5 ">
        {/* Desktop Navigation */}
        <NavBody className="py-3 border-white backdrop">
          <NavbarLogo />

          {/* Nav Items with Dropdown - maintaining original structure */}
          <div
            onMouseLeave={() => {
              setHovered(null);
              setIsDropdownOpen(false);
            }}
            className="absolute inset-0 hidden transition-all flex-1 flex-row items-center justify-center space-x-2 text-sm font-light text-white duration-200 hover:text-zinc-800 lg:flex lg:space-x-2"
          >
            {/* Contact Dropdown */}
            {currentPath === "/" && (
              <div
                className="relative"
                onMouseEnter={() => {
                  setHovered("Explore");
                  setIsDropdownOpen(true);
                }}
              >
                <button data-cursor="link" className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300 flex items-center gap-1">
                  {hovered === "Explore" && (
                    <div
                      className="absolute inset-0 h-full w-full rounded-full bg-white dark:bg-neutral-800"
                      style={{ transition: "all 0.2s" }}
                    />
                  )}
                  <span className="relative z-20">Explore</span>
                  <ChevronDown
                    className={`relative z-20 w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Content */}
                {isDropdownOpen && (
                  <div
                    data-cursor="link"
                    className="absolute top-full -left-full p-4 mt-2 w-fit rounded-full bg-white/90  backdrop border-white overflow-hidden"
                  >
                    {contactSections.map((section, idx) => (
                      <span
                        key={`dropdown-${idx}`}
                        onClick={() => handleSectionClick(section.link)}
                        className="w-full rounded-full whitespace-nowrap text-left px-4 py-2 text-sm text-neutral-700  hover:border-black/20 hover:border cursor-pointer transition-colors"
                      >
                        {section.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
            {navItems.map((item, idx) => (
              <NavLink
                onMouseEnter={() => setHovered(idx)}
                className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
                key={`link-${idx}`}
                to={item.link}
                viewTransition
                data-cursor="link"
              >
                {hovered === idx && (
                  <div
                    className="absolute inset-0 h-full w-full rounded-full bg-white dark:bg-neutral-800"
                    style={{ transition: "all 0.2s" }}
                  />
                )}
                <span className="relative z-20">{item.name}</span>
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <NavbarButton
              as="button"
              type="button"
              onClick={openContact}
              onMouseEnter={OnMouseEnter}
              onMouseLeave={OnMouseLeave}
              data-cursor="link"
              className="py-3 px-10 transition-colors hover:shadow-xl relative rounded-full overflow-hidden font-light shadow-none"
            >
              <h4 id="btn-txt" className="relative z-10">
                Book call
              </h4>

              <div id="bg" className="w-full h-full rounded-full z-0 absolute top-[150%] left-0">
                <img
                  id="ball"
                  src="./b.png"
                  className="size-36 scale-150 brightness-125 blur-[3px] -rotate-45 aspect-square absolute top-0 right-0"
                  alt=""
                />
              </div>
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav className="rounded-full">
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <NavLink
                key={`mobile-link-${idx}`}
                to={item.link}
                viewTransition
                onClick={() => setIsMobileMenuOpen(false)}
                data-cursor="link"
                className="relative w-full text-2xl text-center top-0 text-neutral-600 dark:text-neutral-300"
              >
                <span className="block whitespace-nowrap">{item.name}</span>
              </NavLink>
            ))}

            {/* Mobile Contact Sections */}
            {currentPath === "/" && (
              <div className="w-full border-t border-neutral-200 pt-4 mt-4">
                {contactSections.map((section, idx) => (
                  <span
                    key={`mobile-section-${idx}`}
                    onClick={() => {
                      handleSectionClick(section.link);
                      setIsMobileMenuOpen(false);
                    }}
                    data-cursor="link"
                    className="w-full text-xl text-center whitespace-nowrap text-neutral-600 dark:text-neutral-300 py-2 block"
                  >
                    {section.name}
                  </span>
                ))}
              </div>
            )}

            <div className="flex w-full flex-col gap-4 mt-6">
              <NavbarButton
                as="button"
                type="button"
                onMouseEnter={OnMouseEnter}
                onMouseLeave={OnMouseLeave}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openContact();
                }}
                className="py-3 px-10 transition-colors hover:shadow-xl relative rounded-full overflow-hidden font-light shadow-none"
              >
                <h4 id="btn-txt" className="relative z-10">
                  Book call
                </h4>

                <div className="w-full h-full rounded-full z-0 t-center">
                  <img
                    id="ball"
                    src="./b.png"
                    className="size-36  scale-200 brightness-125 blur-[3px]  aspect-square absolute top-0 right-0"
                    alt=""
                  />
                </div>
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
