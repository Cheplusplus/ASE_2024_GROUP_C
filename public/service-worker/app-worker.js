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

self.addEventListener("install", (event) => {
  console.log("Service Worker: Installed");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activated");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", async (event) => {
  if (event.data.type === "CACHE_RECIPE") {
    const recipeUrl = event.data.recipeUrl;
    try {
      const cache = await caches.open("recipes-cache");
      const response = await fetch(recipeUrl);
      await cache.put(recipeUrl, response);
      event.ports[0].postMessage({ success: true });
    } catch (error) {
      console.error("Error caching recipe:", error);
      event.ports[0].postMessage({ success: false });
    }
  }
});




