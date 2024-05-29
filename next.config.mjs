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


// // next.config.mjs

// import withTM from 'next-transpile-modules';

// // Configure the modules to transpile
// const withTranspileModules = withTM(['react-slick', 'slick-carousel']);

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'upload.wikimedia.org',
//       },
//       {
//         protocol: 'https',
//         hostname: 'bidunart.com',
//       },
//       {
//         protocol: 'http',
//         hostname: 'res.cloudinary.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'cdn.shopify.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'www-konga-com-res.cloudinary.com',
//       },
//     ],
//   },
//   experimental: {
//     missingSuspenseWithCSRBailout: false,
//   },
//   webpack: async (config, { isServer }) => {
//     // if (isServer) {
//     //   const { generateSitemap } = await import('./scripts/generate-sitemap.js');
//     //   generateSitemap();
//     // }
//     if (isServer) {
//       import('./scripts/generate-sitemap.js')
//         .then((module) => {
//           const generateSitemap = module.default;
//           generateSitemap();
//         })
//         .catch((err) => {
//           console.error("Failed to import 'generate-sitemap.js':", err);
//         });
//     }
//     return config;
//     // return config;
//   },
// };

// // Export the configuration using the withTranspileModules function
// export default withTranspileModules(nextConfig);

