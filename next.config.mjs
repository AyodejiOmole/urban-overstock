/** @type {import('next').NextConfig} */
const nextConfig = {
  // swcMinify: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'bidunart.com',
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'www-konga-com-res.cloudinary.com',
      },
    ],
  },

  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;

