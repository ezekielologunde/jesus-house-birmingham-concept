import Link from "next/link";
import { recurringEvents } from "@/lib/content/events";
import { Reveal } from "@/components/ui/Reveal";

export function EventsPreview() {
  const preview = recurringEvents.slice(0, 2);

  return (
    <section className="px-6 py-20 bg-blush">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl mb-8">Upcoming</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {preview.map((e, i) => (
            <Reveal key={e.id} delay={i * 80}>
              <p className="font-display text-lg">{e.name}</p>
              <p className="font-body text-sm text-ink/70">{e.time}</p>
            </Reveal>
          ))}
        </div>
        <Link href="/events" className="inline-block mt-8 font-body underline text-sanctuary">
          See all events
        </Link>
      </div>
    </section>
  );
}
