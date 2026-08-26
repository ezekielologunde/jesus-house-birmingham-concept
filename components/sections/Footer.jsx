import { siteInfo } from "@/lib/content/siteInfo";

export function Footer() {
  return (
    <footer className="bg-plum text-ivory">
      <div className="mx-auto max-w-6xl px-6 py-16 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-lg mb-2">Jesus House</p>
          <p className="text-sm text-ivory/80">{siteInfo.tagline}</p>
        </div>

        <div className="text-sm text-ivory/80 flex flex-col gap-1">
          <p>{siteInfo.address}</p>
          <p>{siteInfo.phone}</p>
          <p>{siteInfo.email}</p>
          <div className="flex gap-4 mt-2">
            <a href={siteInfo.facebook} className="underline">
              Facebook
            </a>
            <a href={siteInfo.instagram} className="underline">
              Instagram
            </a>
          </div>
        </div>

        <div className="text-xs text-ivory/60 leading-relaxed">
          <p>
            This is an unofficial redesign concept and is not affiliated with or endorsed by
            Jesus House Birmingham. For the real, official site, visit{" "}
            <a href={siteInfo.realSiteUrl} className="underline">
              jesushousebhm.org
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
