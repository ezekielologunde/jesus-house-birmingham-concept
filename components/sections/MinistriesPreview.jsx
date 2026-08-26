import Link from "next/link";
import { ministries } from "@/lib/content/ministries";
import { Reveal } from "@/components/ui/Reveal";

export function MinistriesPreview() {
  const preview = ministries.slice(0, 4);

  return (
    <section className="px-6 py-20 bg-ivory">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl mb-8">Ministries</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {preview.map((m, i) => (
            <Reveal key={m.id} delay={i * 80}>
              <p className="font-display text-lg mb-2">{m.name}</p>
              <p className="font-body text-sm text-ink/70">{m.description}</p>
            </Reveal>
          ))}
        </div>
        <Link href="/ministries" className="inline-block mt-8 font-body underline text-sanctuary">
          See all ministries
        </Link>
      </div>
    </section>
  );
}
