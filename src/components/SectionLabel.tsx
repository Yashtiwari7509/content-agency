interface SectionLabelProps {
  text: string;
  align?: "left" | "center" | "right";
}

const SectionLabel = ({ text, align = "center" }: SectionLabelProps) => {
  const justifyClass = align === "left" ? "justify-start" : align === "right" ? "justify-end" : "justify-center";

  return (
    <div className={`flex ${justifyClass} mb-4`}>
      <h4 className="relative inline-block py-1 rounded-full text-xs font-semibold tracking-widest uppercase">
        {text}
        <div className={`absolute z-10 h-px w-full bg-linear-to-r from-[#14E5E2] to-transparent`} />
      </h4>
    </div>
  );
};

export default SectionLabel;
