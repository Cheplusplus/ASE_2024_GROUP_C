// components/ClientNavWrapper.jsx
'use client';
import { useState, useEffect } from 'react';
import React from 'react';

/**
 * A wrapper component that adds client-side event listeners for arrow key presses and updates the `position` prop of the wrapped component accordingly.
 * The wrapped component must accept a `position` prop.
 * @prop {JSX.Element} children - The component to wrap.
 * @returns {JSX.Element} The wrapped component with the updated `position` prop.
 */
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
