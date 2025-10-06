/** @type {import('next').NextConfig} */
const nextConfig = {
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