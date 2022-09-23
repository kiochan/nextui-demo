/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    reactMode: "concurrent",
  },
};

module.exports = nextConfig;
