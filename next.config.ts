import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      // TODO: Add any additional image domains here
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Enable strict mode for better React practices
  reactStrictMode: true,
  // Compress output for better performance
  compress: true,
  // Power header removed for security
  poweredByHeader: false,
}

export default nextConfig
