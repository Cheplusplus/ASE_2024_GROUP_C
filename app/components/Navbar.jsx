'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';


const Navbar = ({ position = 0 }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubNavVisible, setIsSubNavVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dragPosition, setDragPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  const startXRef = useRef(0);

  useEffect(() => {
    let timeoutId;
    const handleMouseMove = (e) => {
      if (e.clientY <= 100) {
        setIsSubNavVisible(true);
        clearTimeout(timeoutId);
      } else {
        timeoutId = setTimeout(() => setIsSubNavVisible(false), 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleDragStart = (e) => {
    setIsDragging(true);
    startXRef.current = e.touches ? e.touches[0].clientX - dragPosition : e.clientX - dragPosition;
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const newPosition = currentX - startXRef.current;
    
    const limitedPosition = Math.min(Math.max(newPosition, -100), 100);
    setDragPosition(limitedPosition);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { 
      name: 'Recipes', 
      href: '/recipes',
      sublinks: [
        { name: 'Breakfast', href: '/recipes/breakfast' },
        { name: 'Lunch', href: '/recipes/lunch' },
        { name: 'Dinner', href: '/recipes/dinner' },
      ]
    },
    { name: 'Favorites', href: '/favorites' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    {
      name: 'Account',
      href: '/account',
      sublinks: [
        { name: 'Sign Up', href: '/account/signup' },
        { name: 'Sign In', href: '/account/signin' },
      ]
    },
  ];

  // Combine the position prop from the wrapper with the dragPosition
  const totalPosition = position + dragPosition;

  return (
    <>
      <nav 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/30 shadow-lg transition-all duration-300 ease-in-out"
        style={{ transform: `translateX(${totalPosition}px)` }}
        ref={dragRef}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        {/* Rest of your existing Navbar JSX */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-800">
                RecipeApp
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <div key={link.name} className="relative group">
                    <Link href={link.href} className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                      {link.name}
                    </Link>
                    {link.sublinks && (
                      <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          {link.sublinks.map((sublink) => (
                            <Link key={sublink.name} href={sublink.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              {sublink.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Navigation Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-6 flex flex-col justify-between">
                  <span className={`block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
                  <span className={`block w-full h-0.5 bg-current transition duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                </div>
              </button>
            </div>

            {/* Search Button */}
            <div className="flex items-center ml-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link href={link.href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-50">
                  {link.name}
                </Link>
                {link.sublinks && (
                  <div className="pl-4 space-y-1">
                    {link.sublinks.map((sublink) => (
                      <Link key={sublink.name} href={sublink.href} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50">
                        {sublink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      <div 
        className={`fixed top-16 left-0 right-0 z-40 backdrop-blur-md bg-white/30 shadow-lg transition-all duration-300 ease-in-out ${
          isSubNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full px-4 py-2 rounded-md bg-white/50 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
