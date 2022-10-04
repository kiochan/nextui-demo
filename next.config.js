/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push(
        {
            test: /\.md$/,
            use: 'raw-loader'
        }
    )

    return config
  },
  reactStrictMode: true,
  swcMinify: true,
  /*
  experimental: {
    reactRoot: "concurrent",
  },
  */
};

module.exports = nextConfig;
