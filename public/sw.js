if (!self.define) {
  let e,
    s = {};
  const n = (n, a) => (
    (n = new URL(n + ".js", a).href),
    s[n] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, i) => {
    const t =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[t]) return;
    let c = {};
    const r = (e) => n(e, t),
      o = { module: { uri: t }, exports: c, require: r };
    s[t] = Promise.all(a.map((e) => o[e] || r(e))).then((e) => (i(...e), c));
  };
}
define(["./workbox-4754cb34"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "676dbf139cf3d09a99dd390044a6d127",
        },
        {
          url: "/_next/static/chunks/117-a2855faa26802a07.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/chunks/130-2848eaac24759ccb.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/chunks/145-f61915d4fbfaec44.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/chunks/448-c198fb9a2b641d86.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/chunks/605-21041df4685c6024.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/chunks/659-6b4b5ea803dc6bf3.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-c7b5e8a1971281c9.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/chunks/app/all/page-7ddb657191cf84bd.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/chunks/app/error-956517e3f5ae6fca.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/chunks/app/layout-01894a597cf76443.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/chunks/app/loading-4fe98d3e7baa0c87.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/chunks/app/page-cd7761662eeb945a.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/chunks/app/profile/page-01fab7b5aab52495.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/chunks/app/recipes/%5Bid%5D/page-a9203f78e739f7dd.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/chunks/app/sign-in/page-3521fc5064f0fe7b.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/chunks/app/sign-up/page-78de9ce2c0a47656.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/chunks/fd9d1056-94352e48c5d4f513.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/chunks/framework-f66176bb897dc684.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/chunks/main-484cdf34780dedf5.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/chunks/main-app-043abf35a3471829.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/chunks/pages/_app-72b849fbd24ac258.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/chunks/pages/_error-7ba65e1336b92748.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-de96603576ac7c02.js",
          revision: "smFDrQp71dV3fIzzeZTb3",
        },
        {
          url: "/_next/static/css/992a61398bb12e61.css",
          revision: "992a61398bb12e61",
        },
        {
          url: "/_next/static/smFDrQp71dV3fIzzeZTb3/_buildManifest.js",
          revision: "c155cce658e53418dec34664328b51ac",
        },
        {
          url: "/_next/static/smFDrQp71dV3fIzzeZTb3/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/apple-touch-icon.png",
          revision: "53488bbdb608d1be8cc39ffbb118abc3",
        },
        {
          url: "/favicon-96x96.png",
          revision: "268219e92ebdc8082e4e2423f843035c",
        },
        { url: "/favicon.ico", revision: "45d847bbc0e1f1ff8e478dfe92322257" },
        { url: "/favicon.svg", revision: "f4bfb04da61910435458e6583247fedd" },
        { url: "/logo.png", revision: "295d484ca45963c80cec6b64b17649c6" },
        { url: "/manifest.json", revision: "f0198904fa76336d79420d394b0e46b0" },
        { url: "/right.png", revision: "df7dd110284b43da699bca73dbe6fbfe" },
        {
          url: "/site.webmanifest",
          revision: "743cd6d1f2fcd8ab639f2c07d4acc05d",
        },
        {
          url: "/wallpaper1.jpg",
          revision: "b047c0765305977a1413e1bdffc18100",
        },
        {
          url: "/wallpaper2.jpg",
          revision: "bb821a0e581df90251cfb61aa43ef093",
        },
        {
          url: "/web-app-manifest-192x192.png",
          revision: "0a6ca06d910e6063a3ae25c70cc8d256",
        },
        {
          url: "/web-app-manifest-512x512.png",
          revision: "1ab6e156f8d0f7be6ffc02ab0efdcc89",
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: n,
              state: a,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
