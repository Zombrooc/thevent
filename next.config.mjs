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
      {
        protocol: "https",
        hostname: "tailwindui.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/thevent-3a1a8.appspot.com/**",
      },
    ],
    dangerouslyAllowSVG: true,
  },
<<<<<<< HEAD

=======
>>>>>>> 0b4e53ad89929980a125ead7fc3ec5d956c33f2e
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
