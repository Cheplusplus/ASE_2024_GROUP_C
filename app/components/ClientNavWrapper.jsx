// components/ClientNavWrapper.jsx
'use client';
import { useState, useEffect } from 'react';
import React from 'react';

export default function ClientNavWrapper({ children }) {
  const [navbarPosition, setNavbarPosition] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setNavbarPosition((prev) => Math.max(prev - 10, -100));
      } else if (e.key === 'ArrowRight') {
        setNavbarPosition((prev) => Math.min(prev + 10, 100));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return React.cloneElement(children, { position: navbarPosition });
}
