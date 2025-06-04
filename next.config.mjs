/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile the undici package to avoid private class fields issues
  transpilePackages: ["undici"],

  // Configure webpack if needed
  webpack: (config) => {
    config.externals = [
      ...(config.externals || []),
      { undici: "commonjs undici" },
    ];
    return config;
  },

  // Enable images from external domains if needed
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

export default nextConfig;
