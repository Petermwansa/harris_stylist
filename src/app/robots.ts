import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Served at /robots.txt — tells search engines they're welcome everywhere,
// and where to find the list of pages (the sitemap).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}