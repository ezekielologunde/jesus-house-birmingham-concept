import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";

export const metadata = {
  title: "Gallery | Jesus House Birmingham (Unofficial Concept)",
};

const TILES = [
  { id: "worship", caption: "Sunday Worship" },
  { id: "community", caption: "Community Fellowship" },
  { id: "outreach", caption: "Outreach & Missions" },
  { id: "youth", caption: "Youth Ministry" },
  { id: "choir", caption: "Choir & Worship Team" },
  { id: "prayer", caption: "Prayer Band" },
];

const GRADIENTS = [
  "from-flame to-royal",
  "from-gold to-flame",
  "from-royal to-midnight",
  "from-flame to-midnight",
  "from-gold to-royal",
  "from-royal to-ink",
];

export default function Gallery() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-5xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-2">Gallery</h1>
        <p className="font-body text-sm text-ink/60 mb-12">
          No real photography exists for this concept build — these are styled placeholder tiles,
          not actual photos of the church.
        </p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {TILES.map((tile, i) => (
          <Parallax key={tile.id} speed={i % 2 === 0 ? 0.15 : -0.15}>
            <Reveal delay={i * 60}>
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]}`}
                />
                {/* flame/gold are much lighter than they look (high luminance
                    for their apparent boldness), so a caption sitting
                    directly on them can fail contrast — this bottom-fade
                    scrim guarantees a dark-enough patch under the text
                    regardless of which gradient a tile gets. */}
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
