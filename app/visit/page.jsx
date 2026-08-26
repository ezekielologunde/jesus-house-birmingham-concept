import { siteInfo } from "@/lib/content/siteInfo";
import { serviceTimes } from "@/lib/content/serviceTimes";
import { Reveal } from "@/components/ui/Reveal";
import { ConceptForm } from "@/components/ui/ConceptForm";

export const metadata = {
  title: "Visit | Jesus House Birmingham (Unofficial Concept)",
};

const FORM_FIELDS = [
  { name: "name", required: true },
  { name: "email", required: true },
];

export default function Visit() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(siteInfo.address)}&output=embed`;

  return (
    <main className="px-6 pt-32 pb-24 max-w-5xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl mb-4">Plan Your Visit</h1>
        <p className="font-body text-ink/80 max-w-2xl">
          Join our church family and experience the warmth of a community that cares.
        </p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-4 my-12">
        {serviceTimes.map((s, i) => (
          <Reveal key={s.id} delay={i * 80}>
            <p className="font-body text-xs uppercase tracking-wide text-royal">{s.day}</p>
            <p className="font-display text-lg">{s.label}</p>
            <p className="font-body text-sm text-ink/70">{s.time}</p>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <Reveal>
          <h2 className="font-display text-2xl mb-3">Address</h2>
          <p className="font-body text-ink/80 mb-4">{siteInfo.address}</p>
          <iframe
            title="Map to Jesus House Birmingham"
            src={mapSrc}
            className="w-full h-64 border-0 rounded-lg"
            loading="lazy"
          />
        </Reveal>

        <Reveal delay={80}>
          <h2 className="font-display text-2xl mb-3">Plan a Visit</h2>
          <ConceptForm
            fields={FORM_FIELDS}
            submitLabel="Let Us Know You're Coming"
            successMessage="Thanks — this is a demo, so nothing was actually sent. On the real site, the church would follow up before your visit."
          >
            <label className="flex flex-col gap-1 text-sm">
              Name
              <input name="name" className="border border-ink/20 rounded px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Email
              <input name="email" type="email" className="border border-ink/20 rounded px-3 py-2" />
            </label>
          </ConceptForm>
        </Reveal>
      </div>
    </main>
  );
}
