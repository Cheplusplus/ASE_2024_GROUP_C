"use client"; // Make sure this is a client component

import { useEffect } from "react";

const ServiceWorkerRegistration = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")  // Path to your service worker
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);  // Empty dependency array ensures this only runs on mount

  return null;  // No need to render anything
};

export default ServiceWorkerRegistration;
