import SectionHeader from "@/components/SectionHeader";
import PortfolioClientRow from "@/components/portfolio/PortfolioClientRow";
import { VideoPlaybackProvider } from "@/components/video/VideoPlaybackContext";
import { portfolioClients } from "./portfolio/clients";

export default function PortfolioLayout() {
  return (
    <section id="portfolio" className="relative min-h-screen p-2 md:p-16">
      <div className="relative mx-auto max-w-5xl">
        <SectionHeader
          label="Portfolio"
          title="Where creativity meets —"
          gradientWord="motion"
          description="Dive into our work — bold visuals, sharp edits, and stories built to move your audience."
        />

        <VideoPlaybackProvider>
          <div className="relative z-10 mt-12 flex flex-col gap-2 min-h-screen">
            {portfolioClients.map((client, index) => (
              <PortfolioClientRow key={client.id} client={client} reverse={index % 2 === 1} />
            ))}
          </div>
        </VideoPlaybackProvider>
      </div>
    </section>
  );
}
