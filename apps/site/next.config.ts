import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/aboutique",
        destination: "https://curiouslychase.com/",
        permanent: true,
      },
      {
        source: "/aboutique/:path*",
        destination: "https://curiouslychase.com/",
        permanent: true,
      },
      {
        source: "/:path*",
        destination: "https://curiouslychase.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
