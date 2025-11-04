import SectionLabel from "./SectionLabel"; // keep this import if you already have it

const SectionHeader = ({
  label, // small label above heading (e.g., "Portfolio")
  title, // main heading text
  description, // paragraph below heading
  align = "center", // allows left or center alignment
  className = "", // optional custom classes
}:{
    label?: string;
    title: string;
    description?: string;
    align?: "left" | "center" | "right";
    className?: string;
}) => {
  const alignment = align === "left" ? "text-left" : "text-center";

  return (
    <div className={`w-full  mb-10 ${alignment} ${className}`}>
      {label && <SectionLabel text={label} />}

      <div className={`${alignment} mb-4`}>
        <h1 className="text-3xl text-center md:text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        {description && <p className="text-sm text-center text-gray-600 max-w-lg mx-auto leading-relaxed">{description}</p>}
      </div>
    </div>
  );
};

export default SectionHeader;
