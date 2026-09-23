import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "**.com",
    "**.dev",
    "**.app",
    "**.io",
    "**.net",
    "**.org",
  ],
}

export default nextConfig
