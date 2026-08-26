import { siteInfo } from "@/lib/content/siteInfo";
import { rccg } from "@/lib/content/rccg";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "About | Jesus House Birmingham (Unofficial Concept)",
};

export default function About() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-3xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl mb-6">About Jesus House Birmingham</h1>
        <p className="font-body text-ink/80 mb-4">
          Jesus House Birmingham is a parish of The Redeemed Christian Church of God (RCCG) in
          North America, and one of the parishes of RCCG worldwide.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <h2 className="font-display text-2xl mt-12 mb-3">Our Vision</h2>
        <p className="font-body text-ink/80">{siteInfo.vision}</p>
      </Reveal>

      <Reveal delay={80}>
        <h2 className="font-display text-2xl mt-12 mb-3">Our Message</h2>
        <p className="font-body text-ink/80">{siteInfo.coreMessage}.</p>
      </Reveal>

      <Reveal delay={80}>
        <h2 className="font-display text-2xl mt-12 mb-3">What We Believe</h2>
        <p className="font-body text-ink/80">
          We believe in one God, the saving grace of Jesus Christ, the authority of Scripture,
          and the power of the Holy Spirit at work in everyday life — worship that is
          contemporary in style but rooted in spirit and truth.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <h2 className="font-display text-2xl mt-12 mb-3">Part of a Global Family</h2>
        <p className="font-body text-ink/80 mb-4">
          RCCG was founded in {rccg.foundedYear} by {rccg.founder} and is led today by{" "}
          {rccg.generalOverseer}. The worldwide headquarters, {rccg.worldwideHq.name}, sits at{" "}
          {rccg.worldwideHq.address}. {rccg.worldwideHq.note}
        </p>
        <p className="font-body text-ink/80">
          RCCG&apos;s North America headquarters is at {rccg.northAmericaHq.address}.{" "}
          {rccg.northAmericaHq.note}
        </p>
      </Reveal>

      <Reveal delay={80}>
        <h2 className="font-display text-2xl mt-12 mb-3">Education</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {rccg.universities.map((u) => (
            <div key={u.name}>
              <p className="font-display text-lg">{u.name}</p>
              <p className="font-body text-sm text-sanctuary mb-1">{u.location}</p>
              <p className="font-body text-sm text-ink/70">{u.note}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={80}>
        <h2 className="font-display text-2xl mt-12 mb-3">Camp Development</h2>
        <p className="font-body text-ink/80">
          {rccg.campDevelopment.note} Learn more at{" "}
          <a href={rccg.campDevelopment.url} className="underline text-sanctuary">
            campdevelopment.rccgna.org
          </a>
          .
        </p>
      </Reveal>
    </main>
  );
}
