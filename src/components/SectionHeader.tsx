import { useRef } from "react";
import SectionLabel from "./SectionLabel";
import { useTextReveal } from "../animations/useTextAnimation";

interface SectionHeaderProps {
  label?: string; // small pill label above heading (e.g., "Portfolio")
  title: string; // main heading — supports plain text
  gradientWord?: string; // optional word(s) to render with gradient (appended after title)
  description?: string; // paragraph below heading
  align?: "left" | "center" | "right";
  className?: string;
}

const SectionHeader = ({ label, title, gradientWord, description, align = "center", className = "" }: SectionHeaderProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useTextReveal(sectionRef);

  const textAlign = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";

  const descAlign = align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : "";

  return (
    <div ref={sectionRef} className={`w-full mb-10 select-none ${textAlign} ${className}`}>
      {/* Pill label */}
      {label && <SectionLabel text={label} align={align} />}

      {/* Heading */}
      <h2 data-reveal="words" className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight reveal-text">
        {title}
        {gradientWord && (
          <>
            {" "}
            <span className="leading-12 text-primary">{gradientWord}</span>
          </>
        )}
      </h2>

      {/* Description */}
      {description && (
        <p data-reveal="words" className={`mt-3 text-sm text-gray-500 max-w-xl font-light leading-5 reveal-text ${descAlign}`}>{description}</p>
      )}
    </div>
  );
};

export default SectionHeader;
