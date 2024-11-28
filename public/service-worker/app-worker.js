import { defaultCache } from "@serwist/next/worker";
import { Serwist } from "serwist";

// Remove the TypeScript-specific `declare` keyword
// In JavaScript, `self` is already globally available in the service worker context.

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST, // `self` is the global object in the worker
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
  fallbacks: {
    entries: [
      {
        url: '/offline', // the page that'll display if user goes offline
        matcher({ request }) {
          return request.destination === 'document';
        },
      },
    ],
  },
  cacheStrategy: 'StaleWhileRevalidate', // You can use CacheFirst, NetworkFirst, or StaleWhileRevalidate
});

serwist.addEventListeners();



