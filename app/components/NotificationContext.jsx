"use client"

import React, { createContext, useState, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

// Notification types
const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Notification Context
const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = NOTIFICATION_TYPES.SUCCESS, duration = 3000) => {
    const id = Date.now();
    const newNotification = { id, message, type };
    
    setNotifications((prev) => [...prev, newNotification]);

    // Auto remove notification
    setTimeout(() => {
      setNotifications((prev) => prev.filter(notification => notification.id !== id));
    }, duration);

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter(notification => notification.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification, notifications }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

// Custom hook for notifications
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// Notification Container Component
const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  /**
   * Returns a notification icon based on the given type.
   * @param {NOTIFICATION_TYPES} type The type of the notification.
   * @returns {React.ReactElement} The icon.
   */
  const getNotificationIcon = (type) => {
    switch(type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return <CheckCircle className="w-6 h-6 text-white" />;
      case NOTIFICATION_TYPES.ERROR:
        return <X className="w-6 h-6 text-white" />;
      case NOTIFICATION_TYPES.WARNING:
        return <AlertTriangle className="w-6 h-6 text-white" />;
      case NOTIFICATION_TYPES.INFO:
        return <Info className="w-6 h-6 text-white" />;
      default:
        return null;
    }
  };

  /**
   * Returns the tailwindcss background color class based on the given notification type.
   * @param {NOTIFICATION_TYPES} type The type of the notification.
   * @returns {string} The tailwindcss background color class.
   */
  const getTypeStyles = (type) => {
    switch(type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return 'bg-green-500';
      case NOTIFICATION_TYPES.ERROR:
        return 'bg-red-500';
      case NOTIFICATION_TYPES.WARNING:
        return 'bg-yellow-500';
      case NOTIFICATION_TYPES.INFO:
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20 
            }}
            className={`
              ${getTypeStyles(notification.type)} 
              text-white 
              px-4 py-3 
              rounded-lg 
              shadow-lg 
              flex 
              items-center 
              space-x-3 
              relative 
              pointer-events-auto
            `}
          >
            <div className="flex-shrink-0">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex-grow">
              {notification.message}
            </div>
            <button 
              onClick={() => removeNotification(notification.id)}
              className="opacity-50 hover:opacity-100 transition-opacity"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Export notification types for external use
export { NOTIFICATION_TYPES };