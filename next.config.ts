import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: a stray lockfile in the user's home directory
  // otherwise makes Turbopack guess wrong.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
  images: {
    // Brand imagery is photographic; two quality steps cover hero and thumbnails.
    qualities: [70, 85],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
