import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";

export const metadata = {
  title: "Gallery | Jesus House Birmingham (Unofficial Concept)",
  description: "Photos of life at Jesus House Birmingham.",
};

const TILES = [
  { id: "worship", src: "/gallery/worship.jpg", caption: "Sunday Worship" },
  { id: "praise-team", src: "/gallery/praise-team.jpg", caption: "Praise & Worship Team" },
  { id: "sunday-message", src: "/gallery/sunday-message.jpg", caption: "Sunday Message" },
  { id: "guest-speaker", src: "/gallery/guest-speaker.jpg", caption: "Guest Speaker" },
  { id: "youth-ministry", src: "/gallery/youth-ministry.jpg", caption: "Youth Ministry" },
  { id: "youth-fellowship", src: "/gallery/youth-fellowship.jpg", caption: "Youth Fellowship" },
  { id: "community-outreach", src: "/gallery/community-outreach.jpg", caption: "Community Outreach" },
  { id: "health-fair", src: "/gallery/health-fair.jpg", caption: "Health & Wellness Fair" },
];

export default function Gallery() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-5xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-2">Gallery</h1>
        <p className="font-body text-sm text-ink/60 mb-12">
          Moments from worship, fellowship, and outreach at Jesus House Birmingham.
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
