import Image from "next/image";
import { pastors, ministryLeads } from "@/lib/content/leadership";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Leadership | Jesus House Birmingham (Unofficial Concept)",
  description: "Leadership team profiles for Jesus House Birmingham (unofficial concept).",
};

function PersonCard({ name, title, photo }) {
  return (
    <div className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden">
      <div className="relative aspect-[4/5]">
        <Image
          src={photo}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="p-5 text-center">
        <p className="font-display text-xl tracking-tight">{name}</p>
        {title && <p className="font-body text-sm text-royal mt-1">{title}</p>}
      </div>
    </div>
  );
}

export default function Leadership() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-6xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-12">Leadership Team</h1>
      </Reveal>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-20">
        {pastors.map((p, i) => (
          <Reveal key={p.name} delay={i * 80}>
            <PersonCard {...p} />
          </Reveal>
        ))}
      </div>

      <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-8">Ministry Leads</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ministryLeads.map((m, i) => (
          <Reveal key={m.name} delay={i * 60}>
            <PersonCard {...m} />
          </Reveal>
        ))}
      </div>
    </main>
  );
}
