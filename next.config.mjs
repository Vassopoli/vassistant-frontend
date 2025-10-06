/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/proxy',
        destination: process.env.API_ENDPOINT,
      },
    ]
  },
};

export default nextConfig;