// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//   },

//   async redirects() {
//     return [
//       {
//         source: '/:path*\\.html',
//         destination: '/:path*',
//         permanent: true,
//       },
//     ]
//   },
//   eslint: { ignoreDuringBuilds: true }, 
  
//   typescript: {
//     ignoreBuildErrors: true,
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  images: {
    // Development only. This page carries 126 images, so skipping the dev
    // server's on demand resizing makes local work noticeably quicker.
    // Tied to NODE_ENV rather than a hand flipped flag: a manual toggle is
    // one someone forgets, and shipping unoptimized would hand every visitor
    // full size originals.
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/:path*\\.html',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  compress: true,             
  poweredByHeader: false,     
};

export default withAnalyzer(nextConfig);
