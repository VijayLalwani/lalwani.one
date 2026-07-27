/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  experimental: {
    viewTransition: true,
  },
};

module.exports = nextConfig;