import { cn } from "@/lib/utils";
import { LucideLayoutGrid, X } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 20) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className={cn("sticky inset-x-0 top-20 z-40 w-full", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, { visible })
          : child
      )}
    </div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  const bodyRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!bodyRef.current) return;

    gsap.to(bodyRef.current, {
      width: visible ? "50%" : "100%",
      y: visible ? 20 : 0,
      duration: 1.2,
    });
  }, [visible]);

  return (
    <div
      ref={bodyRef}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative main-top-nav z-60 mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 border-2 border-white lg:flex dark:bg-transparent",
        visible && "bg-zinc-50/10 !border-blue-800/10 !border dark:bg-neutral-950/80",
        className
      )}
    >
      {children}
    </div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [, setPrevHovered] = useState<number | null>(null);
  const hoverBgRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(() => {
    if (!hoverBgRef.current) return;

    if (hovered !== null && itemRefs.current[hovered]) {
      const hoveredItem = itemRefs.current[hovered];
      if (!hoveredItem) return;

      const rect = hoveredItem.getBoundingClientRect();
      const parentRect = hoveredItem.parentElement?.getBoundingClientRect();

      if (parentRect) {
        gsap.to(hoverBgRef.current, {
          opacity: 1,
          width: rect.width,
          height: rect.height,
          x: hoveredItem.offsetLeft,
          y: hoveredItem.offsetTop,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    } else {
      gsap.to(hoverBgRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
      });
    }

    setPrevHovered(hovered);
  }, [hovered]);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden transition-all flex-1  flex-row items-center justify-center space-x-2 text-sm font-light text-white duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className
      )}
    >
      <div
        ref={hoverBgRef}
        className="absolute rounded-full bg-white  dark:bg-neutral-800 opacity-0 pointer-events-none"
        style={{ willChange: "transform, opacity" }}
      />
      {items.map((item, idx) => (
        <NavLink
          ref={(el) => {
            itemRefs.current[idx] = el;
          }}
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
          key={`link-${idx}`}
          to={item.link}
        >
          <span className="relative z-20">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export const MobileNav = ({ children, className, visible = false }: MobileNavProps) => {
  const mobileRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!mobileRef.current) return;

    gsap.to(mobileRef.current, {
      width: visible ? "90%" : "100%",
      paddingRight: visible ? 12 : 0,
      paddingLeft: visible ? 12 : 0,
      y: visible ? 20 : 0,
      duration: 0.6,
    });
  }, [visible]);

  return (
    <div
      ref={mobileRef}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => {
  return <div className={cn("flex w-full flex-row items-center justify-between", className)}>{children}</div>;
};

export const MobileNavMenu = ({ children, className, isOpen }: MobileNavMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      // setShouldRender(true);
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className={cn(
        "fixed inset-x-0 top-16 border-white border z-50 flex w-full overflow-hidden flex-col items-start justify-start gap-4 rounded-lg bg-white/30 px-4 py-8 backdrop-blur-xl dark:bg-neutral-950",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  return isOpen ? (
    <div className="p-3 border rounded-full">
      <X className="text-black cursor-pointer" onClick={onClick} />
    </div>
  ) : (
    <div className="p-3 border border-white rounded-full">
      <LucideLayoutGrid size={20} className="text-zinc-800 cursor-pointer" onClick={onClick} />
    </div>
  );
};

export const NavbarLogo = () => {
  return (
    <Link to="/" className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black">
      <img
        src="https://img.freepik.com/premium-vector/colorful-bird-wing-feather-logo-icon_23758-199.jpg?semt=ais_hybrid&w=740&q=80"
        alt="logo"
        className="rounded-full "
        width={30}
        height={30}
      />
    </Link>
  );
};

export const NavbarButton = <T extends "a" | "button">({
  href,
  as: Tag = "a" as T,
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: T extends "a" ? string : never;
  as?: T;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (T extends "a" ? Omit<React.ComponentPropsWithoutRef<"a">, "href"> : React.ComponentPropsWithoutRef<"button">)) => {
  const baseStyles =
    "px-4 py-2  rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:bg-black hover:text-white transition-colors duration-500 inline-block text-center";

  const variantStyles = {
    primary: "",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white",
    gradient: "bg-gradient-to-b from-blue-500 to-blue-700 text-white",
  };

  const TagName = Tag as any;

  return (
    <TagName
      {...(Tag === "a" ? { href: href ?? undefined } : {})}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...(props as any)}
    >
      {children}
    </TagName>
  );
};
