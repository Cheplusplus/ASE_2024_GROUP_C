/** @type {import('next').NextConfig} */
import withSerwist from "@serwist/next";  // Import Serwist directly

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.sndimg.com",
        pathname: "/**",
      },
    ],
  },
};

export default async function configureNext(phase, { defaultConfig }) {
  let baseConfig = nextConfig;

  // Apply Serwist configuration in production and development
  if (phase === "phase-development-server" || phase === "phase-production-build") {
    const withSerwistInit = await import("@serwist/next");

    // Configure Serwist with a custom service worker destination
    baseConfig = withSerwistInit.default({
      swSrc: "public/service-worker/app-worker.ts",  // Path to the source worker file
      swDest: "public/sw.js",  // Custom service worker destination
      reloadOnOnline: true,  // Enable reloading on online connection
    })(baseConfig);
  }

  return baseConfig;
}


