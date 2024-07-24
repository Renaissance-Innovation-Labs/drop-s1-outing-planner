/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    OPEN_API_KEY: process.env.OPEN_API_KEY,
  },
};

export default nextConfig;
