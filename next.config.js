/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  experimental: {
    typedRoutes: false,
  },
}

module.exports = nextConfig