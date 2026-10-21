import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 纯静态导出，适配 Cloudflare Pages 静态托管（无 Node 运行时）
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
