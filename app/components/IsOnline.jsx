"use client";

import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMyContext4 } from "./UpdatedNotify";

const OnlineStatusNotifier = () => {
    const {notify,NotifyFunc} = useMyContext4();
  useEffect(() => {
    // Check the initial status
    const notifyStatus = () => {
      if (navigator.onLine) {
        toast.success("You are back online!", { autoClose: 3000 });
      } else {
        toast.error("You are offline. Some features may not work.", {
          autoClose: 3000,
        });
      }
    };

    // Notify on initial render
    //notifyStatus();

    // Listen for online and offline events
    const handleOnline = () => toast.success("You are back online!", { autoClose: 3000 });
    const handleOffline = () => toast.error("You are offline. Some features may not work.", { autoClose: 3000 });

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);


  useEffect(()=>{
    if(notify){
    const updatedDownloadedRecipe = () => toast.success("Downloaded recipe has been updated.", { autoClose: 3000 });
    updatedDownloadedRecipe();
    NotifyFunc(false);
    }
  },[notify])

  return <ToastContainer position="bottom-right" />;
};

export default OnlineStatusNotifier;
