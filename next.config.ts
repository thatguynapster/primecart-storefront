import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "cloud.appwrite.io", pathname: "**" },
      { hostname: "primecart.s3.us-east-2.amazonaws.com", pathname: "**" },
      { hostname: "vercel.com", pathname: "**" },
      { hostname: "*.thatguynapster.com", pathname: "**" },
    ],
  },
};

export default nextConfig;
