import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  // TypeScript errors are now properly handled - no need to ignore
  reactStrictMode: false,
};

export default nextConfig;
