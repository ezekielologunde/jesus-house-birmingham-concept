// The church itself isn't consistent about which of its 3 real logos or
// which name form it uses where (Facebook, the physical building signage,
// and jesushousebhm.org/our-team all differ) — so instead of picking one
// combination and calling it canonical, the nav/footer brand mark rotates
// randomly through the 3 real pairings once per visit (see
// lib/useBrandVariant.js). All 3 assets are real, sourced from the church's
// own Facebook page and its logo files.
export const brandVariants = [
  {
    id: "rccg-seal",
    logo: { src: "/brand/rccg-seal.png", alt: "The Redeemed Christian Church of God seal" },
    name: "RCCG Jesus House Birmingham",
    motto: "The Redeemed Christian Church of God",
  },
  {
    id: "jhb-badge",
    logo: { src: "/brand/jhb-badge.png", alt: "Jesus House Birmingham badge" },
    name: "Jesus House Birmingham",
    motto: "Jesus Christ the same yesterday, today, and forever — Hebrews 13:8",
  },
  {
    id: "jhb-vertical",
    logo: { src: "/brand/jhb-vertical.png", alt: "JHB mark" },
    name: "JHB",
    motto: "The Redeemed Christian Church of God",
  },
];
