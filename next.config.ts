import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@facter/ds-core"],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
