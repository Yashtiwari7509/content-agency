import PortfolioVideoTile from "./PortfolioVideoTile";
import type { PortfolioVideo } from "./types";

interface PortfolioVideosCardProps {
  videos: PortfolioVideo[];
  clientName: string;
  clientId: string;
}

const PortfolioVideosCard = ({ videos, clientName, clientId }: PortfolioVideosCardProps) => {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl">
      <div className="shrink-0 border-b border-gray-100 px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Featured edits</p>
        <p className="text-sm font-semibold text-gray-900">{clientName}</p>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:content-start">
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
