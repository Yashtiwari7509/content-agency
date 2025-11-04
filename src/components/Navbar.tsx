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
import { useState } from "react";
import { NavLink, useLocation,  } from "react-router";
import { ChevronDown } from "lucide-react";

export function NavbarTop() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | number | null>(null);
  const location = useLocation();
  const currentPath = location.pathname; 

  const navItems = [
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Pricing",
      link: "/pricing",
    },
  ];

  const contactSections = [
    {
      name: "Success",
      link: "#score",
    },
    {
      name: "Reviews",
      link: "#Marqee-slider",
    },
    {
      name: "Portfolio",
      link: "#portfolio",
    },
  ];

  const { contextSafe } = useGSAP();
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
        <NavBody className="py-3 border-white backdrop-blur-[10px]">
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
                  setHovered("surfer");
                  setIsDropdownOpen(true);
                }}
              >
                <button className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300 flex items-center gap-1">
                  {hovered === "surfer" && (
                    <div
                      className="absolute inset-0 h-full w-full rounded-full bg-white dark:bg-neutral-800"
                      style={{ transition: "all 0.2s" }}
                    />
                  )}
                  <span className="relative z-20">Surfer</span>
                  <ChevronDown
                    className={`relative z-20 w-4 h-4 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Content */}
                {isDropdownOpen && (
                  <div className="absolute top-full -left-[100%] p-4 mt-2 w-fit rounded-full bg-white/40 backdrop-blur-xl  border border-white overflow-hidden">
                    {contactSections.map((section, idx) => (
                      <span
                        key={`dropdown-${idx}`}
                        onClick={() => handleSectionClick(section.link)}
                        className="w-full rounded-full text-left px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-white/40 cursor-pointer dark:hover:bg-neutral-800 transition-colors"
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
              onMouseEnter={OnMouseEnter}
              onMouseLeave={OnMouseLeave}
              className="py-3 px-10 transition-colors relative rounded-full overflow-hidden font-light shadow-none"
            >
              <h4 id="btn-txt" className="relative z-10">
                Book call
              </h4>

              <div id="bg" className="w-full h-full rounded-full -z-0 absolute top-[150%] -left-0">
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
        <MobileNav className="!rounded-full !px-4">
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <NavLink
                key={`mobile-link-${idx}`}
                to={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative w-full text-2xl text-center text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </NavLink>
            ))}

            {/* Mobile Contact Sections */}
            <div className="w-full border-t border-neutral-200 dark:border-neutral-800 pt-4 mt-4">
              {contactSections.map((section, idx) => (
                <button
                  key={`mobile-section-${idx}`}
                  onClick={() => {
                    handleSectionClick(section.link);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-xl text-center text-neutral-600 dark:text-neutral-300 py-2"
                >
                  {section.name}
                </button>
              ))}
            </div>

            <div className="flex w-full flex-col gap-4 mt-6">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full shadow-none border py-4 rounded-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
