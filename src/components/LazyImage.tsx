import { forwardRef, useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { shortPre } from "@/assets/Image";

const LazyImage = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement>>(({ src, onLoad, onError, className, style, ...props }, ref) => {
  const [settledSrc, setSettledSrc] = useState<string | undefined>();
  const isLoading = src !== undefined && settledSrc !== src;

  return (
    <img
      ref={ref}
      src={src}
      {...props}
      className={cn(isLoading && "bg-gray-200", className)}
      style={{
        ...style,
        ...(isLoading && {
          backgroundImage: style?.backgroundImage ?? `url(${shortPre})`,
          backgroundPosition: style?.backgroundPosition ?? "center",
          backgroundRepeat: style?.backgroundRepeat ?? "no-repeat",
          backgroundSize: style?.backgroundSize ?? "contain",
        }),
      }}
      onLoad={(event) => {
        setSettledSrc(src);
        onLoad?.(event);
      }}
      onError={(event) => {
        setSettledSrc(src);
        onError?.(event);
      }}
    />
  );
});

LazyImage.displayName = "LazyImage";

export default LazyImage;
