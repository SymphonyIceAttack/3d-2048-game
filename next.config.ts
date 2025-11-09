import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "symcloud.top",
      },
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS domains
      },
    ],
  },
};

export default nextConfig;
