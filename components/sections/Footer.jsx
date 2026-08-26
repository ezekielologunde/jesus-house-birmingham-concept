import { siteInfo } from "@/lib/content/siteInfo";

export function Footer() {
  return (
    <footer className="bg-plum text-ivory">
      <div className="mx-auto max-w-6xl px-6 py-16 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-lg mb-2">{siteInfo.name}</p>
          <p className="text-sm text-ivory/80">{siteInfo.tagline}</p>
        </div>

        <div className="text-sm text-ivory/80 flex flex-col gap-1">
          <p>{siteInfo.address}</p>
          <p>{siteInfo.phone}</p>
          <p>{siteInfo.email}</p>
          <div className="flex gap-4 mt-2">
            <a href={siteInfo.facebook} className="underline" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href={siteInfo.instagram} className="underline" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>

        <div className="text-sm text-ivory/80 leading-relaxed">
          <p>
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
