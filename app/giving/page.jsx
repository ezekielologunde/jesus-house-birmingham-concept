import { givingMethods } from "@/lib/content/giving";
import { siteInfo } from "@/lib/content/siteInfo";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Giving | Jesus House Birmingham (Unofficial Concept)",
};

export default function Giving() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-3xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl mb-4">Help Us Spread Love and Faith</h1>
        <p className="font-body text-ink/80 mb-3">
          Your financial contribution means the world to us and helps us continue our mission of
          serving the community.
        </p>
        <p className="font-body text-sm bg-blush rounded-lg px-4 py-3 text-ink/80">
          This is not an official giving channel — it reproduces the giving methods shown on the
          church&rsquo;s own signage for this concept build. Please confirm any gift through{" "}
          <a href={siteInfo.realSiteUrl} className="underline text-sanctuary">
            {siteInfo.realSiteUrl.replace("https://www.", "").replace(/\/$/, "")}
          </a>{" "}
          directly.
        </p>
      </Reveal>

      <div className="grid gap-6 mt-12">
        {givingMethods.map((method, i) => (
          <Reveal key={method.id} delay={i * 70}>
            <h2 className="font-display text-xl">
              {method.href ? (
                <a href={method.href} className="text-sanctuary underline">
                  {method.name}
                </a>
              ) : (
                method.name
              )}
            </h2>
            <p className="font-body text-sm text-ink/70">{method.detail}</p>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
