import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb"
    }
  },
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "animarket.s3.amazonaws.com",
      port: "",
      pathname: "/**"
    },
    {
      protocol: "http",
      hostname: "localhost",
      port: "3000",
      pathname: "/api/v1/avatar/**"
    }]
  }
};

export default nextConfig;