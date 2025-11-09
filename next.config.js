// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // If you are hosting on Vercel, no special config is usually needed here.
  // This tells Next.js to prefer using a client-side environment variable prefix (NEXT_PUBLIC_)
  // even though we hardcoded the Firebase keys for simplicity.
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
