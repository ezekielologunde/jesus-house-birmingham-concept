import Image from "next/image";
import { siteInfo } from "@/lib/content/siteInfo";
import { pastors } from "@/lib/content/leadership";
import { Reveal } from "@/components/ui/Reveal";

export function WelcomeMessage() {
  const leadPastor = pastors.find((p) => p.title === "Lead Pastor") ?? pastors[0];

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl grid gap-10 md:grid-cols-2 md:items-center">
        <Reveal from="left">
          <div className="relative aspect-[4/5] max-w-sm mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-card">
            <Image
              src="/leadership/pastors-welcome.jpg"
              alt={`${leadPastor.name} welcoming visitors to Jesus House Birmingham`}
              fill
              sizes="(min-width: 768px) 24rem, 80vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal from="right" delay={100} className="text-center md:text-left">
          <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-4">Welcoming You Home</h2>
          <p className="font-body text-ink/80 leading-relaxed mb-4">{siteInfo.coreMessage}.</p>
          <p className="font-display text-lg text-royal">
            — {leadPastor.name}, {leadPastor.title}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
