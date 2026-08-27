import { Smartphone, Globe, Send, QrCode, MessageSquare, Banknote } from "lucide-react";
import { givingMethods } from "@/lib/content/giving";
import { siteInfo } from "@/lib/content/siteInfo";
import { Reveal } from "@/components/ui/Reveal";
import { DemoDonationForm } from "@/components/giving/DemoDonationForm";

export const metadata = {
  title: "Giving | Jesus House Birmingham (Unofficial Concept)",
  description: "Ways to give to Jesus House Birmingham, plus a demo online giving flow (unofficial concept).",
};

const ICONS = {
  smartphone: Smartphone,
  globe: Globe,
  send: Send,
  qrcode: QrCode,
  "message-square": MessageSquare,
  banknote: Banknote,
};

export default function Giving() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-5xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4">Help Us Spread Love and Faith</h1>
        <p className="font-body text-ink/80 mb-3 max-w-2xl">
          Your financial contribution means the world to us and helps us continue our mission of
          serving the community.
        </p>
        <p className="font-body text-sm bg-sky rounded-lg px-4 py-3 text-ink/80 max-w-2xl">
          This is not an official giving channel — it reproduces the giving methods shown on the
          church&rsquo;s own signage for this concept build. Please confirm any gift through{" "}
          <a href={siteInfo.realSiteUrl} className="underline text-royal">
            {siteInfo.realSiteUrl.replace("https://www.", "").replace(/\/$/, "")}
          </a>{" "}
          directly.
        </p>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 mt-12">
        {givingMethods.map((method, i) => {
          const Icon = ICONS[method.icon];
          return (
            <Reveal
              key={method.id}
              delay={i * 70}
              className="relative bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 p-7 pt-6 overflow-hidden"
            >
              <div
                className="absolute inset-x-0 top-0 h-1.5"
                style={{ backgroundColor: method.color }}
                aria-hidden="true"
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${method.color}1a`, color: method.color }}
              >
                <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <h2 className="font-display text-xl md:text-2xl tracking-tight">
                {method.href ? (
                  <a href={method.href} className="underline inline-block py-1 -my-1" style={{ color: method.color }}>
                    {method.name}
                  </a>
                ) : (
                  method.name
                )}
              </h2>
              <p className="font-body text-sm text-ink/70 mt-2">{method.detail}</p>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={givingMethods.length * 70} className="mt-10 max-w-2xl">
        <DemoDonationForm />
      </Reveal>
    </main>
  );
}
