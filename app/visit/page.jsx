import { siteInfo } from "@/lib/content/siteInfo";
import { serviceTimes } from "@/lib/content/serviceTimes";
import { Reveal } from "@/components/ui/Reveal";
import { ConceptForm } from "@/components/ui/ConceptForm";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { NumberedList } from "@/components/ui/NumberedList";

export const metadata = {
  title: "Visit | Jesus House Birmingham (Unofficial Concept)",
};

const FORM_FIELDS = [
  { name: "name", label: "Name", required: true },
  { name: "email", label: "Email", required: true },
];

export default function Visit() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(siteInfo.address)}&output=embed`;
  const mainService = serviceTimes.find((s) => s.id === "main");
  const rhemaService = serviceTimes.find((s) => s.id === "rhema");
  const realSiteDomain = siteInfo.realSiteUrl.replace("https://www.", "").replace(/\/$/, "");
  const serviceTimeItems = serviceTimes.map((s) => ({
    id: s.id,
    title: s.label,
    description: `${s.day} · ${s.time}`,
  }));

  const faqs = [
    {
      id: "official",
      question: "Is this Jesus House Birmingham's official website?",
      answer: `No — this is an unofficial redesign concept and isn't affiliated with or endorsed by Jesus House Birmingham. For the real, official site, visit ${realSiteDomain}.`,
    },
    {
      id: "dress-code",
      question: "What should I wear?",
      answer:
        "Come as you are. There's no dress code — many people dress smart-casual, but you're welcome exactly as you're comfortable.",
    },
    {
      id: "length",
      question: "What time is the Main Service, and how long does it run?",
      answer: `The Main Service runs ${mainService.time} on Sundays. If you'd like to come earlier, ${rhemaService.label} starts the morning at ${rhemaService.time}.`,
    },
    {
      id: "what-to-expect",
      question: "What happens during a service?",
      answer: `Expect passionate worship and a Bible-based message. Our heart is simple: ${siteInfo.coreMessage} — in a style that's contemporary but rooted in spirit and truth.`,
    },
    {
      id: "more-questions",
      question: "I have more questions — how do I reach someone?",
      answer: `Call or email us directly — ${siteInfo.phone} or ${siteInfo.email} — or use the form on our Contact page.`,
    },
  ];

  return (
    <main className="px-6 pt-32 pb-24 max-w-5xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4">Plan Your Visit</h1>
        <p className="font-body text-ink/80 max-w-2xl">
          Join our church family and experience the warmth of a community that cares.
        </p>
      </Reveal>

      <Reveal delay={80} className="mb-16">
        <h2 className="font-display text-2xl md:text-3xl tracking-tight mt-16 mb-2">Service Times</h2>
        <NumberedList items={serviceTimeItems} />
      </Reveal>

      <div className="grid gap-10 md:grid-cols-2">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-3">Address</h2>
          <p className="font-body text-ink/80 mb-4">{siteInfo.address}</p>
          <iframe
            title="Map to Jesus House Birmingham"
            src={mapSrc}
            className="w-full h-64 border-0 rounded-lg"
            loading="lazy"
          />
        </Reveal>

        <Reveal delay={80}>
          <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-3">Plan a Visit</h2>
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

      <Reveal delay={80}>
        <h2 className="font-display text-2xl md:text-3xl tracking-tight mt-16 mb-6">What to Expect</h2>
        <FaqAccordion items={faqs} />
      </Reveal>
    </main>
  );
}
