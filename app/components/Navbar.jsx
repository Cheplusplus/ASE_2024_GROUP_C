"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import { signOut } from "next-auth/react";
import { ThemeToggle } from "./ThemeToggle";
import { useSession } from "next-auth/react";
import { Heart } from "lucide-react";
import { Download } from "lucide-react";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import { useMyContext2 } from "./favCountContext";
import { useMyContext } from "./favContext"; // Import context for tracking new reviews

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
  const [newReviewNotification, setNewReviewNotification] = useState(false); // New state for notifications
  const pathname = usePathname();
  const router = useRouter();
  const { updateCount } = useMyContext2();
  const { favouriteRecipes, newReviewCount } = useMyContext(); // Use context for favourite recipes and new reviews

  const { data: session } = useSession();

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
    window.addEventListener("storage", updateShoppingListCount);

    // Add custom event listener
    window.addEventListener("shopping-list-updated", updateShoppingListCount);

    return () => {
      window.removeEventListener("storage", updateShoppingListCount);
      window.removeEventListener(
        "shopping-list-updated",
        updateShoppingListCount
      );
    };
  }, []);

  useEffect(() => {
    // Check for new reviews in the favourite recipes context
    if (newReviewCount > 0) {
      setNewReviewNotification(true); // Show notification if there's a new review
    }
  }, [newReviewCount]);

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

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Recipes",
      href: "/recipes",
    },
    {
      name: "Favourites",
      href: "/favourites",
      badge: session?.user ? favouriteRecipes.length : null, // Show badge if authenticated
    },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
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
      icon: <ShoppingCartIcon className="inline-block mr-2" />,
    },
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

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
                      className={`block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? "rotate-45 translate-y-2.5" : ""}`}
                    />
                    <span
                      className={`block w-full h-0.5 bg-current transition duration-300 ease-in-out ${isMobileMenuOpen ? "opacity-0" : ""}`}
                    />
                    <span
                      className={`block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
                    />
                  </div>
                </button>
              </div>

              <div className="relative left-[42%] w-full">
                <Link href="/">
                  <Image
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
              <Link href="/favourites" className="hidden md:block relative p-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Heart />
                {updateCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {updateCount}
                  </span>
                )}
              </Link>

              {/* New Review Notification */}
              {newReviewNotification && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  New Review Added to Your Favourites!
                </div>
              )}

              <Link href={"/downloads"} className="hidden md:block relative p-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Download />
              </Link>
              <Link href="/shopping-list" className="hidden md:block relative p-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
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
                className={`p-2 rounded-md relative text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none ${isSearchOpen ? "bg-gray-100 dark:bg-gray-700" : ""} transition-colors duration-200`}
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
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;