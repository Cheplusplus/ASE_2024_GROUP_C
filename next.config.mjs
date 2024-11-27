import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants.js";

export default async (phase) => {
  /** @type {import("next").NextConfig} */
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

  // Apply Serwist configuration during development and production build phases
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withSerwist = (await import("@serwist/next")).default({
      swSrc: "public/service-worker/app-worker.js", // Updated to JavaScript for consistency
      swDest: "public/sw.js", // Output location for the service worker
      reloadOnOnline: true, // Automatically reload the app when back online
    });

    return withSerwist(nextConfig); // Wrap your Next.js configuration with Serwist
  }

  // Default configuration for other phases
  return nextConfig;
};




