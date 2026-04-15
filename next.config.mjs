/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://natours-production-b3f7.up.railway.app/api/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'natours-production-b3f7.up.railway.app',
      },
    ],
  },
};

export default nextConfig;