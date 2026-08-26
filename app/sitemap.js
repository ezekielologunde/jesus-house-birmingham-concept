import { routes } from "@/lib/content/routes";

const BASE_URL = "https://jesus-house-birmingham-concept.vercel.app";

export default function sitemap() {
  return routes.map((r) => ({
    url: `${BASE_URL}/${r.path}`,
    lastModified: new Date(0).toISOString(),
  }));
}
