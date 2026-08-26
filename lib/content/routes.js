// Single source of truth for the site's public routes, so Nav and
// sitemap.js can't silently drift apart when a route is added or renamed.
export const routes = [
  { label: "Home", path: "" },
  { label: "About", path: "about" },
  { label: "Leadership", path: "leadership" },
  { label: "Visit", path: "visit" },
  { label: "Ministries", path: "ministries" },
  { label: "Events", path: "events" },
  { label: "Giving", path: "giving" },
  { label: "Gallery", path: "gallery" },
  { label: "Testimonies", path: "testimonies" },
  { label: "Contact", path: "contact" },
  { label: "Prayer", path: "prayer" },
];

// The primary nav is a curated subset of `routes`, not all 11 — at 11 flat
// items the nav bar overflowed its container between the md breakpoint
// (768px) and ~1150px (confirmed in-browser: "Contact" and "Prayer" were
// pushed off-screen at 768px). Leadership, Testimonies, and Prayer stay
// real, crawlable routes (sitemap, footer quick links, cross-page links)
// but sit out of the top nav.
export const primaryNavPaths = ["", "about", "visit", "ministries", "events", "giving", "gallery", "contact"];

// Routes deliberately left out of the primary nav (see above) — surfaced
// instead via the footer's "More" column and links from related pages.
export const secondaryNavPaths = ["leadership", "testimonies", "prayer"];
