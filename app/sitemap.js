const ROUTES = [
  "",
  "about",
  "leadership",
  "visit",
  "ministries",
  "events",
  "giving",
  "gallery",
  "testimonies",
  "contact",
  "prayer",
];

const BASE_URL = "https://jesus-house-birmingham-concept.vercel.app";

export default function sitemap() {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}/${route}`,
    lastModified: new Date(0).toISOString(),
  }));
}
