"use client"; // Ensure this runs on the client side

import { useState, useEffect } from "react";

export default function PWADownloadButton() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Check if PWA is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstallable(false);
      return;
    }

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // Prevent automatic display
      setDeferredPrompt(event); // Save the event to trigger later
      setIsInstallable(true); // Enable the button
    };

    // Listen for PWA install prompt
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check for already installed PWA
    window.addEventListener('appinstalled', () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener(
        "beforeinstallprompt", 
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        // Show the native install prompt
        const { outcome } = await deferredPrompt.prompt();
        
        if (outcome === "accepted") {
          console.log("PWA installed successfully");
          
          // Hide the install button
          setIsInstallable(false);
          setDeferredPrompt(null);
        } else {
          console.log("PWA installation declined");
        }
      } catch (error) {
        console.error("PWA installation failed", error);
      }
    }
  };

  // Only render if the app is installable and not already in standalone mode
  if (!isInstallable) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all flex items-center gap-2"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
        />
      </svg>
      Install App
    </button>
  );
}