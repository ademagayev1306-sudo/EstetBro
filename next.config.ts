import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  
  // В Next.js 16 ESLint больше не запускается автоматически во время `next build`,
  // поэтому опция eslint.ignoreDuringBuilds здесь не нужна (и ломает типы конфига).
  reactStrictMode: false,
};

export default nextConfig;
