import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.overwatchitemtracker.com",
      },
    ],
  },
};

export default nextConfig;
