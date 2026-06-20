import React from "react";

type Props = {
  title?: string;
  subtitle?: string;
  docs?: number;
  appLabel?: string;
  DesignLabel?: React.ComponentType<{ className?: string }> | null;
};

export default function ServiceCard({
  title = "Content Booster",
  subtitle = "Agency Feature Set",
  docs = 0,
  appLabel = "",
  DesignLabel,
}: Props) {
  return (
    <div className="w-72  overflow-hidden rounded-[28px] border-black relative">
      {/* Top visual section */}
      <div className="relative h-12 overflow-hidden">
        {/* Top right label */}
        <div className="absolute right-[18px] top-4 text-right">
          <p className="m-0 text-xl font-semibold leading-[1.4] tracking-[0.01em] text-[#888] text-shadow-2xs">{appLabel}</p>
        </div>

        {/* Folder tab shape */}
        <div className="absolute h-10 w-46 rounded-t-3xl border border-b-0 bottom-0"></div>
      </div>

      {/* Bottom content */}
      <div className="backdrop-blur-2xl border border-t-0 rounded-tr-3xl px-4 pb-4! ">
        {/* Title */}
        <div className="mb-8">
          <p className="mb-1 text-[20px] font-bold tracking-[-0.01em] text-black">{title}</p>
          <p className="text-[14px] font-normal text-black">{subtitle}</p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[36px] font-bold leading-none tracking-[-0.02em] text-black">{"0" + (docs + 1)}</span>
            <span className="text-[14px] font-normal text-black">+</span>
          </div>
          <div>{DesignLabel && <DesignLabel className="size-6 font-light text-black" />}</div>
        </div>
      </div>
    </div>
  );
}
