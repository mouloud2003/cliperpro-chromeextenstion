/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...other config...
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;