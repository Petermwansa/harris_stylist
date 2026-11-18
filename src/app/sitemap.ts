import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Served at /sitemap.xml — the list of pages we want Google to index.
const pages = ["", "/collections", "/designer", "/appointments", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}