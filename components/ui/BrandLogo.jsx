import Image from "next/image";

// A light chip behind every logo variant, sized to the variant's own
// aspect ratio via object-contain — the 3 real assets range from a
// transparent circular seal to an opaque badge with a baked-in sky
// background to a black-background wordmark, so a fixed light backing
// plus "contain" (not "cover") is what keeps all 3 looking intentional
// without cropping any of their edge content (ribbon text, motto line).
export function BrandLogo({ logo, className = "w-8 h-8" }) {
  return (
    <span
      className={`relative shrink-0 rounded-xl bg-white/95 ring-1 ring-ink/10 p-1 overflow-hidden ${className}`}
    >
      <Image src={logo.src} alt={logo.alt} fill sizes="64px" className="object-contain" />
    </span>
  );
}
