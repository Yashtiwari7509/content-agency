import { ExternalLink, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PortfolioClient } from "./types";
import PortfolioMediaCard from "./PortfolioMediaCard";
import PortfolioVideosCard from "./PortfolioVideosCard";

interface PortfolioClientRowProps {
  client: PortfolioClient;
  reverse?: boolean;
}

const PortfolioClientRow = ({ client }: PortfolioClientRowProps) => {
  const media = <PortfolioMediaCard gifUrl={client.gifUrl} photos={client.photos} clientName={client.name} clientId={client.id} />;
  const videos = <PortfolioVideosCard videos={client.videos} clientName={client.name} clientId={client.id} />;

  return (
    <article className="flex flex-col sticky top-30 gap-6 p-4 bg-white mb-20 pb-0">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-gray-100 ring-2">
            <img src={client.avatar} alt={client.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{client.name}</h3>
            <p className="text-sm text-gray-500">
              {client.handle} · {client.role}
            </p>
          </div>
        </div>
        <a
          href={`https://youtube.com/${client.handle.replace("@", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
        >
          <Youtube className="h-4 w-4" />
          Channel
          <ExternalLink className="h-3.5 w-3.5 text-gray-400" />
        </a>
      </header>

      <div className="grid h-120 grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-8">
        <div className={cn("min-h-0")}>{media}</div>
        <div className={cn("min-h-0")}>{videos}</div>
      </div>
    </article>
  );
};

export default PortfolioClientRow;
