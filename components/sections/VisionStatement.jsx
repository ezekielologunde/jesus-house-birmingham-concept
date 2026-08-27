import { siteInfo } from "@/lib/content/siteInfo";
import { Reveal } from "@/components/ui/Reveal";

export function VisionStatement() {
  return (
    <section className="bg-midnight text-ivory px-6 py-24">
      <Reveal from="scale" className="mx-auto max-w-4xl text-center">
        <p className="font-body text-xs tracking-[0.3em] text-gold uppercase mb-6">Our Vision</p>
        <p className="font-display text-3xl md:text-5xl leading-tight tracking-tight text-balance">
          {siteInfo.vision}
        </p>
      </Reveal>
    </section>
  );
}
