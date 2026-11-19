import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Served at /robots.txt — tells search engines where they're welcome,
// and where to find the list of pages (the sitemap).
export default function robots(): MetadataRoute.Robots {
  return {
    // Search engines may index everything EXCEPT the private admin panel
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}