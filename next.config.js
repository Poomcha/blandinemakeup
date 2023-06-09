/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'scontent-sjc3-1.cdninstagram.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
