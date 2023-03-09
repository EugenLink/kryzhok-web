/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "volga24bot.com",
        port: "",
        pathname: "/cgi-bin/**",
      },
    ],
  },
};

module.exports = nextConfig;
