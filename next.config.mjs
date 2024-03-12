/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**.gravatar.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**.unsplash.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
