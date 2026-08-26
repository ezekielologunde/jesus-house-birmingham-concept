import { pastors, ministryLeads } from "@/lib/content/leadership";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Leadership | Jesus House Birmingham (Unofficial Concept)",
};

function Initials({ name }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <div className="w-16 h-16 rounded-full bg-royal text-ivory flex items-center justify-center font-display text-xl">
      {initials}
    </div>
  );
}

export default function Leadership() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-5xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl mb-2">Leadership Team</h1>
        <p className="font-body text-ink/70 mb-12">
          No leadership photos exist for this concept build — shown with monogram avatars instead.
        </p>
      </Reveal>

      <div className="grid gap-8 md:grid-cols-3 mb-16">
        {pastors.map((p, i) => (
          <Reveal key={p.name} delay={i * 80} className="flex flex-col items-center text-center gap-3">
            <Initials name={p.name} />
            <p className="font-display text-lg">{p.name}</p>
            <p className="font-body text-sm text-royal">{p.title}</p>
          </Reveal>
        ))}
      </div>

      <h2 className="font-display text-2xl mb-6">Ministry Leads</h2>
      <div className="grid gap-4 md:grid-cols-4">
        {ministryLeads.map((m, i) => (
          <Reveal key={m.name} delay={i * 60} className="flex items-center gap-3">
            <Initials name={m.name} />
            <p className="font-body text-sm">{m.name}</p>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
