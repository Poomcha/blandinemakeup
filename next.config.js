/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scontent*.cdninstagram.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
