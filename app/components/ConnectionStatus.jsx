// app/components/ConnectionStatus.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useNotification, NOTIFICATION_TYPES } from "./NotificationContext";

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(typeof window !== "undefined" ? navigator.onLine : true);
  const { addNotification } = useNotification();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      addNotification("You are back online!", NOTIFICATION_TYPES.INFO);
    };

    const handleOffline = () => {
      setIsOnline(false);
      addNotification("You are offline. Some features may not be available.", NOTIFICATION_TYPES.WARNING);
    };

    // Attach event listeners for online and offline events
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [addNotification]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 text-center py-2 text-sm font-medium ${
        isOnline ? "bg-green-500 text-white" : "bg-yellow-500 text-black"
      }`}
    >
      {isOnline ? "Online" : "Offline"}
    </div>
  );
};

export default ConnectionStatus;