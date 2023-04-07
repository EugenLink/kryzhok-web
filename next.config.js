/** @type {import('next').NextConfig} */

const withOptimizedImages = require("next-optimized-images");

module.exports = withOptimizedImages({
  /* конфигурация next-optimized-images */
});

const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "u1978287.isp.regruhosting.ru",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
