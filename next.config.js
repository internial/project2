/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' if you're using dynamic rendering (e.g., for Clerk auth)
  // output: 'export', // <-- Comment or remove this line

  eslint: {
    ignoreDuringBuilds: true
  },
  images: { unoptimized: true }

  // If you're using dynamic pages, make sure they are SSR (Server-Side Rendered)
  // to support middleware, Clerk, or dynamic routing.
};

module.exports = nextConfig;
