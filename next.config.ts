import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Prefer AVIF, fall back to WebP. All project photos are local static
    // imports, so no remotePatterns are needed.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
