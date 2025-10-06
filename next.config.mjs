/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    const rewrites = [];
    if (process.env.API_ENDPOINT) {
      rewrites.push({
        source: '/api/proxy',
        destination: process.env.API_ENDPOINT,
      });
    }
    return rewrites;
  },
};

export default nextConfig;