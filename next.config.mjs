/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com"
      },
      {
        protocol: "https",
        hostname: "api.qrserver.com"
      }
    ]
  }
};

export default nextConfig;
