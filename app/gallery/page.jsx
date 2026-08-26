import { Reveal } from "@/components/ui/Reveal";

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
  "from-sanctuary to-plum",
  "from-gold to-sanctuary",
  "from-plum to-ink",
  "from-blush to-gold",
  "from-sanctuary to-gold",
  "from-ink to-plum",
];

export default function Gallery() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-5xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl mb-2">Gallery</h1>
        <p className="font-body text-sm text-ink/60 mb-12">
          No real photography exists for this concept build — these are styled placeholder tiles,
          not actual photos of the church.
        </p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {TILES.map((tile, i) => (
          <Reveal key={tile.id} delay={i * 60}>
            <div
              className={`aspect-square rounded-lg bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} flex items-end p-4`}
            >
              <p className="font-body text-ivory text-sm font-semibold">{tile.caption}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
