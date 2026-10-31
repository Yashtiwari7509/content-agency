import { forwardRef, useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const LOADING_IMAGE_PLACEHOLDER =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect x='6' y='9' width='36' height='30' rx='4' fill='none' stroke='%239ca3af' stroke-width='3'/%3E%3Ccircle cx='17' cy='19' r='3' fill='%239ca3af'/%3E%3Cpath d='m9 34 10-10 7 7 5-5 8 8' fill='none' stroke='%239ca3af' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")";

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
          backgroundImage: style?.backgroundImage ?? LOADING_IMAGE_PLACEHOLDER,
          backgroundPosition: style?.backgroundPosition ?? "center",
          backgroundRepeat: style?.backgroundRepeat ?? "no-repeat",
          backgroundSize: style?.backgroundSize ?? "2.5rem",
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
