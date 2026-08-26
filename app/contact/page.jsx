import { siteInfo } from "@/lib/content/siteInfo";
import { Reveal } from "@/components/ui/Reveal";
import { ConceptForm } from "@/components/ui/ConceptForm";

export const metadata = {
  title: "Contact | Jesus House Birmingham (Unofficial Concept)",
};

const FORM_FIELDS = [
  { name: "name", label: "Name", required: true },
  { name: "email", label: "Email", required: true },
  { name: "message", label: "Message", required: true },
];

export default function Contact() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-3xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4">Contact Us</h1>
        <p className="font-body text-ink/80 mb-8">
          Reach out and we&rsquo;ll get back to you as soon as possible.
        </p>
        <div className="font-body text-sm text-ink/80 flex flex-col gap-1 mb-10">
          <p>{siteInfo.address}</p>
          <p>
            <a
              href={`tel:+1${siteInfo.phone.replace(/\D/g, "")}`}
              className="underline inline-block py-1 -my-1"
            >
              {siteInfo.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${siteInfo.email}`} className="underline inline-block py-1 -my-1">
              {siteInfo.email}
            </a>
          </p>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <ConceptForm
          fields={FORM_FIELDS}
          submitLabel="Send Message"
          successMessage="Thanks — this is a demo, so nothing was actually sent to the church."
        >
          <label className="flex flex-col gap-1 text-sm">
            Name
            <input name="name" className="border border-ink/20 rounded px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Email
            <input name="email" type="email" className="border border-ink/20 rounded px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Message
            <textarea name="message" rows={4} className="border border-ink/20 rounded px-3 py-2" />
          </label>
        </ConceptForm>
      </Reveal>
    </main>
  );
}
