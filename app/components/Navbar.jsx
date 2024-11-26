'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import { signOut } from 'next-auth/react';
import { ThemeToggle } from './ThemeToggle';
import { useSession } from 'next-auth/react';

import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
/**
 * The main navigation component for the app.
 * @returns {JSX.Element} The rendered navbar component.
 */
const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSublinks, setOpenSublinks] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shoppingListCount, setShoppingListCount] = useState(0);
  const pathname = usePathname();
  const router = useRouter(); 

  const { data: session } = useSession();
  const [favouritesCount, setFavouritesCount] = useState(0);

   // Update shopping list count
   useEffect(() => {
    const updateShoppingListCount = () => {
      const storedItems = localStorage.getItem("shoppingList");
      const items = storedItems ? JSON.parse(storedItems) : [];
      setShoppingListCount(items.length);
    };

    // Initial count
    updateShoppingListCount();

    // Listen for storage changes
    window.addEventListener('storage', updateShoppingListCount);

    // Add custom event listener
    window.addEventListener('shopping-list-updated', updateShoppingListCount);

    return () => {
      window.removeEventListener('storage', updateShoppingListCount);
      window.removeEventListener('shopping-list-updated', updateShoppingListCount);
    };
  }, []);

  useEffect(() => {
    // Check if user is logged in, for example, by checking a token in localStorage
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleSublinkToggle = (linkName) => {
    setOpenSublinks((prev) => ({
      ...prev,
      [linkName]: !prev[linkName],
    }));
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    await signOut({ callbackUrl: "/" });
    // Clear cookies manually to ensure no stale sessions
    document.cookie = "next-auth.session-token=; Max-Age=0; path=/";
    document.cookie = "next-auth.callback-url=; Max-Age=0; path=/";
    document.cookie = "next-auth.csrf-token=; Max-Age=0; path=/";
    router.push("/"); // Redirect to sign-in page
  };

  // Fetch favourites count when session changes
  useEffect(() => {
    const fetchFavouritesCount = async () => {
      if (status === 'authenticated') {
        try {
          const response = await fetch('/api/favourites');
          if (response.ok) {
            const data = await response.json();
            setFavouritesCount(data.count);
          }
        } catch (error) {
          console.error('Error fetching favourites count:', error);
        }
      } else {
        setFavouritesCount(0);
      }
    };

    fetchFavouritesCount();
  }, [status]);

  // Listen for favourites updates from other components
  useEffect(() => {
    const handleFavouritesUpdate = (e) => {
      setFavouritesCount(e.detail.count);
    };

    document.addEventListener('favouritesUpdated', handleFavouritesUpdate);

    return () => {
      document.removeEventListener('favouritesUpdated', handleFavouritesUpdate);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Recipes",
      href: "/recipes",
    },
    { name: 'Favourites', href: '/favourites', badge: status === 'authenticated' ? favouritesCount : null},
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    {
      name: "Account",
      href: "/account",
      sublinks: [
        { name: "Sign Up", href: "/sign-up" },
        { name: "Sign In", href: "/sign-in" },
        { name: "Profile", href: "/profile" },
      ],
    },
    {
      name: "Shopping List",
      href: "/shopping-list",
      icon: <ShoppingCartIcon className="inline-block mr-2" />
    }
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const favouritesLink = navLinks.find(link => link.name === 'Favourites');
  if (favouritesLink && status === 'authenticated') {
    favouritesLink.badge = favouritesCount;
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/30 dark:bg-gray-900/30 shadow-lg transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile and Logo */}

            <div className="flex items-center  w-full md:w-auto md:justify-start">
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-md text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none"
                  aria-label="Toggle menu"
                >
                  <div className="w-6 h-6 flex flex-col justify-between">
                    <span
                      className={`block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${
                        isMobileMenuOpen ? "rotate-45 translate-y-2.5" : ""
                      }`}
                    />
                    <span
                      className={`block w-full h-0.5 bg-current transition duration-300 ease-in-out ${
                        isMobileMenuOpen ? "opacity-0" : ""
                      }`}
                    />
                    <span
                      className={`block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${
                        isMobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                      }`}
                    />
                  </div>
                </button>
              </div>

              <div className="relative left-[42%] w-full">
                <Link
                  style={{ width: "auto", height: "auto" }}
                  href="/"
                  // className="font-bold text-gray-800 dark:text-gray-200"
                >
                  <Image
                    style={{
                      objectFit:"cover",
                      width: "auto",
                      height: "auto",
                    }}
                    priority={true}
                    src="/rush.png"
                    quality={100}
                    alt="logo"
                    width={50}
                    height={50}
                  />
                </Link>
              </div>
            </div>

            {/* Shopping cart, Theme Toggle and Search */}
            <div className="flex items-center ">
            <Link href="/favorites" className="relative" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
                {favouritesCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {favouritesCount}
                  </span>
                )}
            </Link>
             <Link href="/shopping-list" className="relative p-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <ShoppingCartIcon />
            {shoppingListCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {shoppingListCount}
                  </span>
                )}
          </Link> 
          <ThemeToggle />
              
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-md relative text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none ${
                  isSearchOpen ? "bg-gray-100 dark:bg-gray-700" : ""
                } transition-colors duration-200`}
                aria-label="Toggle search"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              {session ? (
                <div className="relative">
                  <div className="h-8 w-8 md:h-10 md:w-10" onClick={toggleMenu}>
                    {session.user.image ? (
                      <img
                        className="h-full w-full rounded-full object-cover object-center"
                        src={session.user.image}
                        alt=""
                      />
                    ) : (
                      <div className="h-full hover:bg-slate-100 w-full flex text-center items-center justify-center rounded-full object-cover object-center">
                        <p className="font-semibold text-xl">
                          {session.user.name.charAt(0)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="h-8 w-8 md:h-10 md:w-10" onClick={toggleMenu}>
                    <div className="h-full bg-slate-100 w-full flex text-center items-center justify-center rounded-full object-cover object-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
              
              {/**Drop Down Menu */}
              {menuOpen && (
                <ul className="space-y-1 absolute top-14  right-4 md:right-auto bg-white mt-2">
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-2 rounded-lg hover:bg-gray-400 px-4 py-2 text-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5 opacity-75"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>

                      <span className="text-sm font-medium"> Settings </span>
                    </a>
                  </li>

                  <li>
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                      <summary className="group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-5 opacity-75"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>

                          <span className="text-sm font-medium"> Account </span>
                        </div>

                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </summary>

                      <ul className="mt-2 space-y-1 px-4">
                        <Link
                          href="/profile"
                          className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                          Profile
                        </Link>

                        {session ? (
                          <button
                            onClick={() => signOut()}
                            className="w-full rounded-lg px-4 py-2 text-sm font-medium text-red-600 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                          >
                            Logout
                          </button>
                        ) : (
                          <Link
                            href="/sign-in"
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          >
                            Sign In
                          </Link>
                        )}
                      </ul>
                    </details>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-screen" : "max-h-0"
          } overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-200`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <div key={link.name}>
                <button
                  onClick={() => {
                    if (link.name === "Home" && pathname !== "/") {
                      window.location.href = "/";
                    } else {
                      handleSublinkToggle(link.name);
                    }
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none transition-colors duration-200"
                >
                  {link.name}
                </button>
                {link.sublinks && openSublinks[link.name] && (
                  <div className="pl-4 space-y-1">
                    {link.sublinks.map((sublink) => (
                      <Link
                        key={sublink.name}
                        href={sublink.href}
                        className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                      >
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
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
