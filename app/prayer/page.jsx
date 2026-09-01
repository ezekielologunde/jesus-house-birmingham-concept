import { Reveal } from "@/components/ui/Reveal";
import { ConceptForm } from "@/components/ui/ConceptForm";

export const metadata = {
  title: "Prayer Requests | Jesus House Birmingham (Unofficial Concept)",
  description: "Submit a prayer request to Jesus House Birmingham (unofficial concept).",
};

const FORM_FIELDS = [
  { name: "name", label: "Name", required: true },
  { name: "request", label: "Prayer Request", required: true },
];

export default function Prayer() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-2xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4">Prayer Requests</h1>
        <p className="font-body text-ink/80 mb-8">
          We&rsquo;d be honored to stand with you in prayer.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <ConceptForm
          fields={FORM_FIELDS}
          endpoint="/api/prayer"
          submitLabel="Submit Request"
          successMessage="Thank you — your request has been received."
        >
          <label className="flex flex-col gap-1 text-sm">
            Name
            <input name="name" className="border border-ink/20 rounded px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Prayer Request
            <textarea name="request" rows={5} className="border border-ink/20 rounded px-3 py-2" />
          </label>
        </ConceptForm>
      </Reveal>
    </main>
  );
}
