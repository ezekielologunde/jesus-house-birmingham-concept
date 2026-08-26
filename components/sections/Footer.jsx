import Link from "next/link";
import { siteInfo } from "@/lib/content/siteInfo";
import { LogoMark } from "@/components/ui/LogoMark";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { routes, secondaryNavPaths } from "@/lib/content/routes";

const MORE_LINKS = secondaryNavPaths
  .map((path) => routes.find((r) => r.path === path))
  .filter(Boolean);

export function Footer() {
  return (
    <footer className="bg-midnight text-ivory">
      <div className="mx-auto max-w-6xl px-6 py-16 grid gap-10 md:grid-cols-4">
        <div>
          <LogoMark className="w-9 h-9 mb-3" />
          <p className="font-body text-xs leading-tight tracking-[0.04em] text-gold uppercase mb-1 max-w-[14rem]">
            Redeemed Christian Church of God
          </p>
          <p className="font-display text-lg mb-2">{siteInfo.name}</p>
          <p className="text-sm text-ivory/80">{siteInfo.tagline}</p>
        </div>

        <div className="text-sm text-ivory/80 flex flex-col gap-2">
          <p className="font-body text-xs tracking-[0.25em] text-gold uppercase mb-1">More</p>
          {MORE_LINKS.map((r) => (
            <Link
              key={r.path}
              href={`/${r.path}`}
              className="underline inline-block py-1 -my-1 w-fit"
            >
              {r.label}
            </Link>
          ))}
        </div>

        <div className="text-sm text-ivory/80 flex flex-col gap-1">
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
          <div className="flex gap-4 mt-2 -mx-1">
            <a
              href={siteInfo.facebook}
              className="underline py-2 px-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href={siteInfo.instagram}
              className="underline py-2 px-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="text-sm text-ivory/80 leading-relaxed">
          <p className="font-body text-xs tracking-[0.25em] text-gold uppercase mb-2">Newsletter</p>
          <p className="mb-3">Get updates on services, events, and ministries.</p>
          <NewsletterForm />

          <p className="mt-6 pt-6 border-t border-ivory/10">
            This is an <strong>unofficial redesign concept</strong> and is <strong>not affiliated with or endorsed by</strong>
            {" "}Jesus House Birmingham. For the real, official site, visit{" "}
            <a href={siteInfo.realSiteUrl} className="underline" target="_blank" rel="noopener noreferrer">
              jesushousebhm.org
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
