import { ministries } from "@/lib/content/ministries";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";

export const metadata = {
  title: "Ministries | Jesus House Birmingham (Unofficial Concept)",
  description: "Explore the ministries and small groups at Jesus House Birmingham (unofficial concept).",
};

export default function Ministries() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-5xl mx-auto">
      <RevealText
        text="Ministries"
        tag="h1"
        className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4"
      />
      <Reveal delay={100}>
        <p className="font-body text-ink/80 max-w-2xl mb-12">
          Whether you&rsquo;re looking to deepen your faith, connect with others, or make a
          difference in the world, there&rsquo;s a place for you here.
        </p>
      </Reveal>

      <div className="grid gap-8 md:grid-cols-3">
        {ministries.map((m, i) => (
          <Reveal
            key={m.id}
            delay={i * 60}
            className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 p-6"
          >
            <h2 className="font-display text-xl md:text-2xl tracking-tight mb-2">{m.name}</h2>
            <p className="font-body text-sm text-ink/70">{m.description}</p>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
