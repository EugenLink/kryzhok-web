/** @type {import('next').NextConfig} */
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
