/** @type {import('next').NextConfig} */
const nextConfig = {
 
  images: {
    domains: [
      'images.unsplash.com',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com'
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  }
};

export default nextConfig;
