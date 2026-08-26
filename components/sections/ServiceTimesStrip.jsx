import { serviceTimes } from "@/lib/content/serviceTimes";
import { Reveal } from "@/components/ui/Reveal";
import { PinSection } from "@/components/ui/PinSection";

export function ServiceTimesStrip() {
  return (
    <PinSection>
      <section className="bg-sky px-6 py-16 min-h-screen flex items-center">
        <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-4">
          {serviceTimes.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <p className="font-body text-xs uppercase tracking-wide text-royal">{s.day}</p>
              <p className="font-display text-lg">{s.label}</p>
              <p className="font-body text-sm text-ink/70">{s.time}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </PinSection>
  );
}
