import {
  Navbar,
  NavBody,
  NavItems,
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

export function NavbarTop() {
  const navItems = [
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Pricing",
      link: "/pricing",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  const { contextSafe } = useGSAP();
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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-screen flex justify-center items-center fixed z-50">
      <Navbar className="max-w-5xl mt-5 ">
        {/* Desktop Navigation */}
        <NavBody className="py-3  border-white backdrop-blur-[10px]">
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {/* <NavbarButton variant="secondary">Login</NavbarButton> */}
            <NavbarButton
              onMouseEnter={OnMouseEnter}
              onMouseLeave={OnMouseLeave}
              className="py-3 px-10 transition-colors relative rounded-full overflow-hidden font-light  shadow-none"
            >
              <h4 id="btn-txt" className="relative z-10">
                Book call
              </h4>

              <div id="bg" className="w-full h-full rounded-full -z-0  absolute top-[150%] -left-0 ">
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
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative w-full text-2xl text-center text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton  onClick={() => setIsMobileMenuOpen(false)} variant="primary" className="w-full shadow-none border py-4 rounded-full">
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
