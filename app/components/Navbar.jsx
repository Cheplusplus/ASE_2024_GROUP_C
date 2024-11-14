'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import { signOut } from 'next-auth/react';

/**
 * The main navigation component for the app.
 * @returns {JSX.Element} The rendered navbar component.
 */
const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSublinks, setOpenSublinks] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in, for example, by checking a token in localStorage
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleSublinkToggle = (linkName) => {
    setOpenSublinks((prev) => ({
      ...prev,
      [linkName]: !prev[linkName],
    }));
  };

  const handleLogout = (e) => {
     e.preventDefault();
    // Clear the session (for example, removing the token)
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    router.push('/'); // Redirect to the homepage
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
        { name: 'Sign Up', href: '/sign-up' },
        { name: 'Sign In', href: '/sign-in' },
        { name: 'Profile', href: '/profile' }
      ]
    },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="md:hidden">
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
              
              <Link href="/" className="text-2xl font-bold text-gray-800">
                Recipe Rush
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <div key={link.name} className="relative">
                    <button 
                      onClick={() => {
                        if (link.name === 'Home' && pathname !== '/') {
                          window.location.href = '/';
                        } else {
                          handleSublinkToggle(link.name);
                        }
                      }}
                      className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                    >
                      {link.name}
                    </button>
                    {link.sublinks && openSublinks[link.name] && (
                      <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          {link.sublinks.map((sublink) => (
                            <Link key={sublink.name} href={sublink.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              {sublink.name}
                            </Link>
                            
                          ))}
                          <button onClick={() => signOut()}>Sign Out</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {isLoggedIn && (
                  <button
                    onClick={(e)=>handleLogout(e)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-center">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none ${isSearchOpen ? 'bg-gray-100' : ''}`}
                aria-label="Toggle search"
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
                <button 
                  onClick={() => {
                    if (link.name === 'Home' && pathname !== '/') {
                      window.location.href = '/';
                    } else {
                      handleSublinkToggle(link.name);
                    }
                  }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-50 focus:outline-none"
                >
                  {link.name}
                </button>
                {link.sublinks && openSublinks[link.name] && (
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

      {/* SearchBar Component */}
      <SearchBar 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;
