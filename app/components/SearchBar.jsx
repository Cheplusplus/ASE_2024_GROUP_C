"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * A search bar component for searching recipes by title with highlighted matches.
 *
 * @param {{ isOpen: boolean, onClose: () => void }} props
 * @prop {boolean} isOpen - Whether the search bar should be shown.
 * @prop {() => void} onClose - Called when the search bar should be closed.
 *
 * @returns {JSX.Element} The rendered search bar component.
 */
const SearchBar = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const router = useRouter();

  // Clear search when closing search overlay
  useEffect(() => {
    if(searchQuery.trim().length >= 3) {
      const debounceTimeout = setTimeout(()=> {
        fetchSuggestions(searchQuery);
        // Auto-submit search after 300ms of no typing
        router.push(`/all?search=${encodeURIComponent(searchQuery)}`);
        setHasSearched(true);
      }, 300);
      return () => clearTimeout(debounceTimeout);
    } else {
      setSearchResults([]);
      setHasSearched(false);
      // Reset the URL when the search query is cleared
      // if (searchQuery.trim().length === 0) {
      //   router.push(`/` || , undefined, { shallow: true });
      // }
    }
  }, [ searchQuery ]);

useEffect(() => {
  const debounceTimeout = setTimeout(() => {
    debounceSearch();
  }, 500); 
  
  return () => clearTimeout(debounceTimeout);
}, [searchQuery, debounceSearch]);

 /**
  * handles changes to the search input
  * resets search status and updates query state
  */
   const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setHasSearched(false);
  };

   /**
   * Highlights matching text within search results
   * @param {string} text - The full text to search within
   * @param {string} query - The search query to highlight
   * @returns {JSX.Element} Text with highlighted matches
   */
  const highlightMatch = (text, query) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, index) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="bg-yellow-200 font-semibold">{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  /**
   * Fetches search suggestions from the server and updates the search results.
   *
   * @param {string} query - The search query to fetch suggestions for.
   *
   * @returns {Promise<void>} - Resolves when the search results have been fetched.
   */
  const fetchSuggestions = async (query) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/recipe/?search=${encodeURIComponent(query)}&limit=10`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data.success) {
        setSearchResults(data.recipes);
        setHasSearched(true); // Set hasSearched to true after fetching results
      } else {
        console.error('Search failed:', data.message);
        setSearchResults([]);
        setHasSearched(true); // Also set hasSearched when search fails
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
      setHasSearched(true); // Also set hasSearched on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (title) => {
    const debounceTimeout = setTimeout(()=> {
      router.push(`/all?search=${encodeURIComponent(title)}`);
      onClose();
    }, 500)
    return ()=> clearTimeout(debounceTimeout)
  };

  return (
    <div 
      className={`fixed top-16 left-0 right-0 z-40 backdrop-blur-md bg-white/30 shadow-lg transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="relative">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search recipes by title..."
              className="w-full px-4 py-2 rounded-md bg-white/50 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
              autoFocus={isOpen}
            />
            <button
              onClick={() => {
                setHasSearched(true); // Set hasSearched when search button is clicked
                handleSuggestionClick(searchQuery);
              }}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
          
          {isLoading && (
            <div className="absolute right-3 top-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="absolute w-full mt-2 bg-white rounded-md shadow-lg max-h-64 overflow-y-auto">
              {searchResults.map((recipe) => (
                <Link
                  key={recipe._id}
                  onClick={()=>handleSuggestionClick(recipe.title)}
                  href={`/`}
                  className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-150"
                >
                  <div className="text-gray-900 font-medium">
                    {highlightMatch(recipe.title, searchQuery)}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Show "No recipes found" message when hasSearched is true and there are no results */}
          {hasSearched && !isLoading && searchResults.length === 0 && searchQuery.trim() !== '' && (
            <div className="absolute w-full mt-2 bg-white rounded-md shadow-lg p-4 text-center text-gray-600">
              No recipes found matching {searchQuery}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;