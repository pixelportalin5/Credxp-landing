import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "credxp.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "credxp.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
