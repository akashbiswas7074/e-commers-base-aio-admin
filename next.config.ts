import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Add a rule to handle `.html` files
    config.module.rules.push({
      test: /\.html$/,
      use: "html-loader",
    });

    // Optionally ignore `@mapbox/node-pre-gyp` if it’s not required
    config.externals = {
      ...config.externals,
      "@mapbox/node-pre-gyp": "commonjs @mapbox/node-pre-gyp",
    };

    return config;
  },
  // Remove the invalid turbo setting or configure it correctly if needed
  experimental: {
    // turbo: {} // Uncomment and customize if you want to configure Turbo options
  },
};

export default nextConfig;
