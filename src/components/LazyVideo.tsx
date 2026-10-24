import { forwardRef, useEffect, useImperativeHandle, useRef, type VideoHTMLAttributes } from "react";

type LazyVideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  src: string;
  isActive?: boolean;
};

const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(({ src, poster, autoPlay = false, isActive = true, ...props }, forwardedRef) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadedSrcRef = useRef<string | null>(null);

  useImperativeHandle(forwardedRef, () => videoRef.current!, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const loadAndPlay = () => {
      if (loadedSrcRef.current !== src) {
        video.src = src;
        video.poster = poster ?? "";
        loadedSrcRef.current = src;
        return;
      }
      if (autoPlay && video.paused) void video.play().catch(() => {});
    };

    const handleVisibility = (isVisible: boolean) => {
      if (!isActive) {
        video.pause();
      } else if (isVisible) {
        loadAndPlay();
      } else {
        video.pause();
      }
    };

    if (!("IntersectionObserver" in window)) {
      handleVisibility(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        handleVisibility(entry.isIntersecting);
      },
      { rootMargin: "0px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [autoPlay, isActive, poster, src]);

  return <video ref={videoRef} {...props} autoPlay={autoPlay && isActive} />;
});

LazyVideo.displayName = "LazyVideo";

export default LazyVideo;
