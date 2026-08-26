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
