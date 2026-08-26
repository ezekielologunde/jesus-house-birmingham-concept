import { Hero } from "@/components/sections/Hero";
import { VerseTicker } from "@/components/sections/VerseTicker";
import { ServiceTimesStrip } from "@/components/sections/ServiceTimesStrip";
import { WelcomeMessage } from "@/components/sections/WelcomeMessage";
import { MinistriesPreview } from "@/components/sections/MinistriesPreview";
import { EventsPreview } from "@/components/sections/EventsPreview";
import { DirectionsSpotlight } from "@/components/sections/DirectionsSpotlight";

export default function Home() {
  return (
    <main>
      <Hero />
      <VerseTicker />
      <ServiceTimesStrip />
      <WelcomeMessage />
      <MinistriesPreview />
      <EventsPreview />
      <DirectionsSpotlight />
    </main>
  );
}
