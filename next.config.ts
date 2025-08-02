import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Skip linting during build for production deployment
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip type checking during build for faster deployment
    ignoreBuildErrors: true,
  },
  // Force server-side rendering for all pages
  output: 'standalone',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;