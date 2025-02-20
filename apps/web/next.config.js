/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";


const nextConfig = {
  reactStrictMode: false,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows any hostname
      },
    ],
  },

  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@9dcc/ui", "@9dcc/tailwind-config"],

  async rewrites() {
    return [
      {
        source: "/ingest/:path*",
        destination: "https://app.posthog.com/:path*", // Proxy to PostHog cloud service
      },
    ];
  },

  webpack: (webpackConfig, { dev, isServer }) => {
    // Add 'encoding' to externals correctly
    if (webpackConfig.externals) {
      if (Array.isArray(webpackConfig.externals)) {
        webpackConfig.externals.push("encoding");
      } else {
        webpackConfig.externals = [webpackConfig.externals, "encoding"];
      }
    } else {
      webpackConfig.externals = ["encoding"];
    }

    webpackConfig.experiments = { ...webpackConfig.experiments, topLevelAwait: true };
    webpackConfig.infrastructureLogging = {
      level: "error",
    };

    if (isServer && !dev) {
      webpackConfig.devtool = "source-map";
    }

    return webpackConfig;
  },
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  publicExcludes: ['!OneSignalSDKWorker.js'],
  buildExcludes: [/OneSignalSDKWorker\.js$/],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/cdn\.onesignal\.com\/sdks\/.*$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'onesignal-assets',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    }
  ]
})(nextConfig);
