import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,

  images: {
    // next/image only optimises external images that match a pattern here.
    // Anything else gets "400 Bad Request" — so strangers can't use YOUR
    // server to resize THEIR images.
    remotePatterns: [
      {
        // Unsplash = our placeholder photos. In Step 10 we add Firebase Storage.
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
        // Query strings are blocked unless listed exactly. Ours is the one
        // built in src/lib/images.ts: ?w=2400&q=85
        search: "?w=2400&q=85",
      },
    ],
  },
};

export default nextConfig;