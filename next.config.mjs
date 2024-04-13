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
  async headers() {
    return [
      {
        source: "/api/checkout-sessions",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://checkout.stripe.com/c/pay/*", // Set your origin
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "POST, GET",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
