"use client"; // Make sure this is a client component

import { useEffect } from "react";

/**
 * ServiceWorkerRegistration is a React component that registers a service worker
 * for the application when the component mounts. It utilizes the useEffect hook
 * to ensure that the registration logic runs only once after the component is mounted.
 *
 * The component checks if the browser supports service workers and attempts to
 * register a service worker located at '/sw.js'. If the registration is successful,
 * a success message along with the registration object is logged to the console.
 * If the registration fails, an error message is logged.
 *
 * This component does not render any UI elements.
 *
 * @returns {null} - No JSX is rendered by this component.
 *
 * @example
 * <ServiceWorkerRegistration />
 */
const ServiceWorkerRegistration = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js") // Path to your service worker
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []); // Empty dependency array ensures this only runs on mount

  return null; // No need to render anything
};

export default ServiceWorkerRegistration;
