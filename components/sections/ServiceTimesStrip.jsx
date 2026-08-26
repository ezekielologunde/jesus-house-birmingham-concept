import { serviceTimes } from "@/lib/content/serviceTimes";
import { Reveal } from "@/components/ui/Reveal";
import { PinSection } from "@/components/ui/PinSection";
import { NumberedList } from "@/components/ui/NumberedList";

const SERVICE_TIME_ITEMS = serviceTimes.map((s) => ({
  id: s.id,
  title: s.label,
  description: `${s.day} · ${s.time}`,
}));

export function ServiceTimesStrip() {
  return (
    <PinSection>
      <section className="bg-sky px-6 py-16 min-h-screen flex items-center">
        <div className="mx-auto max-w-3xl w-full">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-6">Service Times</h2>
          </Reveal>
          <NumberedList items={SERVICE_TIME_ITEMS} />
        </div>
      </section>
    </PinSection>
  );
}
