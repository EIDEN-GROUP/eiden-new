import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: a stray lockfile in the user's home directory
  // otherwise makes Turbopack guess wrong.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
  images: {
    // Every quality the pages actually ask for has to be listed: Next 16 will
    // not optimise at a step that is missing here, it answers 400, and the
    // picture simply never appears. 70 for thumbnails, 85 for general work,
    // 90 and 95 for the case-study plates and the client wall.
    qualities: [70, 85, 90, 95],
    // WebP only. AVIF is a fifth the size again but many times slower to
    // encode, and this site hands the optimiser multi-megabyte PNGs at 90 and
    // 95: an AVIF job that stalls on one of them is not retried, every later
    // request for the same picture queues behind it, and the tile stays empty
    // for good. WebP encodes the same picture in a fraction of a second.
    formats: ["image/webp"],
  },
};

export default nextConfig;
