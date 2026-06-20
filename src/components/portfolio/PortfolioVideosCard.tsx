import PortfolioVideoTile from "./PortfolioVideoTile";
import type { PortfolioVideo } from "./types";

interface PortfolioVideosCardProps {
  videos: PortfolioVideo[];
  clientName: string;
  clientId: string;
}

const PortfolioVideosCard = ({ videos, clientName, clientId }: PortfolioVideosCardProps) => {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 px-3 sm:grid-cols-2 sm:content-start">
        {videos.map((video, index) => (
          <PortfolioVideoTile
            key={`${clientId}-${video.src}-${index}`}
            video={video}
            playbackId={`${clientId}-video-${index}`}
            label={`${clientName} — ${video.title ?? `video ${index + 1}`}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioVideosCard;
