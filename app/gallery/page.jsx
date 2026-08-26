import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";

export const metadata = {
  title: "Gallery | Jesus House Birmingham (Unofficial Concept)",
  description: "Photos representing life at Jesus House Birmingham (unofficial concept).",
};

// Open-license (Unsplash) stock photos — not actual photos of Jesus House
// Birmingham. Photographer credit kept here per Unsplash's attribution guidelines.
const TILES = [
  { id: "worship", src: "/gallery/worship.jpg", caption: "Sunday Worship", photographer: "Fallon Michael" },
  { id: "community", src: "/gallery/community.jpg", caption: "Community Fellowship", photographer: "Danique Godwin" },
  { id: "outreach", src: "/gallery/outreach.jpg", caption: "Outreach & Missions", photographer: "Victória Kubiaki" },
  { id: "youth", src: "/gallery/youth.jpg", caption: "Youth Ministry", photographer: "Mic Narra" },
  { id: "choir", src: "/gallery/choir.jpg", caption: "Choir & Worship Team", photographer: "John Onaeko" },
  { id: "prayer", src: "/gallery/prayer.jpg", caption: "Prayer Band", photographer: "Jametlene Reskp" },
];

export default function Gallery() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-5xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-2">Gallery</h1>
        <p className="font-body text-sm text-ink/60 mb-12">
          These are open-license stock photos, not actual photos of Jesus House Birmingham —
          this concept build has no real photography of the church.
        </p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {TILES.map((tile, i) => (
          <Parallax key={tile.id} speed={i % 2 === 0 ? 0.15 : -0.15}>
            <Reveal delay={i * 60}>
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300">
                <Image
                  src={tile.src}
                  alt={tile.caption}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
                {/* bottom-fade scrim guarantees a dark-enough patch under the
                    caption regardless of how bright the underlying photo is */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-transparent" />
                <p className="relative h-full flex items-end p-4 font-body text-ivory text-sm font-semibold">
                  {tile.caption}
                </p>
              </div>
            </Reveal>
          </Parallax>
        ))}
      </div>
    </main>
  );
}
