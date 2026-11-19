import type { NextConfig } from "next";

const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,

  images: {
    // next/image only optimises external images that match a pattern here.
    // Anything else gets "400 Bad Request" — so strangers can't use YOUR
    // server to resize THEIR images.
    remotePatterns: [
      {
        // Unsplash = our placeholder photos.
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
        // Query strings are blocked unless listed exactly. Ours is the one
        // built in src/lib/images.ts: ?w=2400&q=85
        search: "?w=2400&q=85",
      },
      // Harris's own photos in Firebase Storage — only from HIS bucket.
      // Download URLs end in "?alt=media&token=…" (a different token per
      // photo), so here we leave `search` out to allow any query string.
      ...(storageBucket
        ? [
            {
              protocol: "https" as const,
              hostname: "firebasestorage.googleapis.com",
              pathname: `/v0/b/${storageBucket}/o/**`,
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;