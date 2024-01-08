/** @type {import('next').NextConfig} */
const nextConfig = {
      // Can be safely removed in newer versions of Next.js

  webpack(config) {
    config.resolve.fallback = {

      ...config.resolve.fallback,  

      fs: false, 
    };
    
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        // ...
      }
    ],
  },
}
serverComponentsExternalPackages: ["bcrypt"]
module.exports = nextConfig
