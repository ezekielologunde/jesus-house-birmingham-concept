import { recurringEvents, seasonalEvents } from "@/lib/content/events";
import { Reveal } from "@/components/ui/Reveal";
import { AddToCalendarButton } from "@/components/ui/AddToCalendarButton";

export const metadata = {
  title: "Events | Jesus House Birmingham (Unofficial Concept)",
  description: "Upcoming services and annual programs at Jesus House Birmingham (unofficial concept).",
};

export default function Events() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-5xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-12">Events</h1>
      </Reveal>

      <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-6">Every Week</h2>
      <div className="grid gap-6 md:grid-cols-4 mb-16">
        {recurringEvents.map((e, i) => (
          <Reveal
            key={e.id}
            delay={i * 60}
            className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-300 p-5"
          >
            <p className="font-display text-lg tracking-tight">{e.name}</p>
            <p className="font-body text-sm text-ink/70">{e.time}</p>
          </Reveal>
        ))}
      </div>

      <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-2">Annual Programs</h2>
      <p className="font-body text-sm text-ink/60 mb-6">
        Two signature annual weeks, real programs run by the men&apos;s and young adults&apos; ministries.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {seasonalEvents.map((e, i) => (
          <Reveal
            key={e.id}
            delay={i * 80}
            className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-300 p-5"
          >
            <p className="font-display text-lg tracking-tight">{e.name}</p>
            <p className="font-body text-sm text-royal">{e.dateLabel}</p>
            <p className="font-body text-sm text-ink/70">{e.description}</p>
            <AddToCalendarButton title={e.name} month={e.month} description={e.description} />
          </Reveal>
        ))}
      </div>
    </main>
  );
}
