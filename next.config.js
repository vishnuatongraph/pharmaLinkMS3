/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sifekoaanuqzrkuvoivq.supabase.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "jvlxkyagdziwjkeusaxb.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
