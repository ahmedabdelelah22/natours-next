/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: 'https://natours-production-b3f7.up.railway.app/api/v1/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'natours-production-b3f7.up.railway.app',
        pathname: '/img/**',
      },
    ],
  },
};

export default nextConfig;