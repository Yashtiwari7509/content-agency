import React from "react";

type Props = {
  title?: string;
  subtitle?: string;
  docs?: number;
  appLabel?: string;
  DesignLabel?: React.ComponentType<{ className?: string }> | null;
};

export default function TaskelloCard({
  title = "Content Booster",
  subtitle = "Agency Feature Set",
  docs = 0,
  appLabel = "",
  DesignLabel,
}: Props) {
  return (
    <div className="w-72 overflow-hidden rounded-[28px] border-black relative">
      <div
        className="size-full absolute inset-0"
        style={{ background: "url('./abs.jpg')", transform: `rotate(${docs * 10}deg)`, scale: docs * 0.15 + 1 }}
      ></div>
      {/* Top visual section */}
      <div className="relative h-22 overflow-hidden">
        {/* Top right label */}
        <div className="absolute right-[18px] top-4 text-right">
          <p className="m-0 text-[13px] font-semibold leading-[1.4] tracking-[0.01em] text-white text-shadow-2xs">{appLabel}</p>
        </div>

        {/* Folder tab shape */}
        <div className="absolute h-6 w-36 rounded-t-xl bg-black bottom-0"></div>
      </div>

      {/* Bottom content */}
      <div className="backdrop-blur-2xl bg-black rounded-tr-xl px-4 pb-4! ">
        {/* Title */}
        <div className="mb-8">
          <p className="mb-1 text-[20px] font-bold tracking-[-0.01em] text-white">{title}</p>
          <p className="text-[14px] font-normal text-[#888]">{subtitle}</p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[36px] font-bold leading-none tracking-[-0.02em] text-white">{"0" + (docs + 1)}</span>
            <span className="text-[14px] font-normal text-[#888]">+</span>
          </div>
          <div>{DesignLabel && <DesignLabel className="size-6 font-light text-white" />}</div>
        </div>
      </div>
    </div>
  );
}
