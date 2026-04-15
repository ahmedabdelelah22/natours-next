/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              connect-src 'self'
                https://api.stripe.com
                https://cdn.jsdelivr.net
                ws://localhost:*
                wss://natours-production-b3f7.up.railway.app:*
                https://natours-production-b3f7.up.railway.app;
              script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""} https://js.stripe.com;
              frame-src https://js.stripe.com https://hooks.stripe.com;
              img-src 'self' data: blob: https:;
              style-src 'self' 'unsafe-inline';
            `.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },

  images: {
    domains: ["natours-production-b3f7.up.railway.app"],
  },

  reactCompiler: true,
};

export default nextConfig;