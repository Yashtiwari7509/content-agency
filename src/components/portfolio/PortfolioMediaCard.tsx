import { useState } from "react";
import { Images, Sparkles } from "lucide-react";
import PhotoSlider from "./PhotoSlider";
// import { isPlayableVideoSrc } from "@/components/video/videoSource";

interface PortfolioMediaCardProps {
  gifUrl: string;
  photos: string[];
  clientName: string;
  clientId: string;
}

const PortfolioMediaCard = ({ gifUrl, photos, clientName }: PortfolioMediaCardProps) => {
  const [showGallery, setShowGallery] = useState(false);
  // const useVideoPreview = isPlayableVideoSrc(gifUrl);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      <div className="relative w-full">
        {showGallery ? (
          <PhotoSlider photos={photos} altPrefix={clientName} />
        ) : (
          <video src={gifUrl} autoPlay muted loop className="w-full object-cover aspect-video! rounded-2xl" />
        )}

        <button
          type="button"
          onClick={() => setShowGallery((v) => !v)}
          className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-xs font-medium text-white backdrop transition cursor-pointer"
        >
          {showGallery ? (
            <>
              <Sparkles className="h-3.5 w-3.5" />
              Show preview
            </>
          ) : (
            <>
              <Images className="h-3.5 w-3.5" />
              View gallery
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PortfolioMediaCard;
