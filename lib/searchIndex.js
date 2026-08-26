// Search index for the Cmd/Ctrl+K site search — one entry per real public
// page, reusing the same descriptions set as each page's meta description.
// Admin routes are deliberately excluded (not meant to be publicly
// discoverable). No Google-site-search fallback: robots.js disallows all
// crawling site-wide, so a "search Google on this site" link would return
// nothing useful.
export const searchIndex = [
  {
    title: "Home",
    href: "/",
    description: "Service times, ministries, and upcoming events at Jesus House Birmingham (unofficial concept).",
  },
  {
    title: "About",
    href: "/about",
    description: "Learn about Jesus House Birmingham's mission, vision, and beliefs (unofficial concept).",
  },
  {
    title: "Leadership",
    href: "/leadership",
    description: "Leadership team profiles for Jesus House Birmingham (unofficial concept).",
  },
  {
    title: "Visit",
    href: "/visit",
    description: "Service times, what to expect, and what to know before visiting Jesus House Birmingham (unofficial concept).",
  },
  {
    title: "Ministries",
    href: "/ministries",
    description: "Explore the ministries and small groups at Jesus House Birmingham (unofficial concept).",
  },
  {
    title: "Events",
    href: "/events",
    description: "Upcoming services and annual programs at Jesus House Birmingham (unofficial concept).",
  },
  {
    title: "Giving",
    href: "/giving",
    description: "Ways to give to Jesus House Birmingham, plus a demo online giving flow (unofficial concept).",
  },
  {
    title: "Gallery",
    href: "/gallery",
    description: "Photos representing life at Jesus House Birmingham (unofficial concept).",
  },
  {
    title: "Testimonies",
    href: "/testimonies",
    description: "Stories of faith and community from Jesus House Birmingham (unofficial concept).",
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Get directions, contact details, and send a message to Jesus House Birmingham (unofficial concept).",
  },
  {
    title: "Prayer",
    href: "/prayer",
    description: "Submit a prayer request to Jesus House Birmingham (unofficial concept).",
  },
  {
    title: "Store",
    href: "/store",
    description: "Browse the demo store for this Jesus House Birmingham concept build — sample products only.",
  },
];

export function searchSite(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/).filter(Boolean);
  return searchIndex
    .map((item) => {
      const title = item.title.toLowerCase();
      const description = item.description.toLowerCase();
      const score = words.reduce((acc, w) => {
        if (title.includes(w)) return acc + 4;
        if (description.includes(w)) return acc + 2;
        return acc;
      }, 0);
      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item);
}
