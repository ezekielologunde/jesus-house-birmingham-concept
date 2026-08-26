import { siteInfo } from "@/lib/content/siteInfo";
import { Reveal } from "@/components/ui/Reveal";

export function WelcomeMessage() {
  return (
    <section className="px-6 py-20">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl md:text-4xl mb-4">Welcoming You Home</h2>
        <p className="font-body text-ink/80 leading-relaxed">{siteInfo.coreMessage}.</p>
      </Reveal>
    </section>
  );
}
