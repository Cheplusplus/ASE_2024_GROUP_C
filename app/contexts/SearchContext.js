'use client'
import React, { createContext, useState, useContext } from 'react';

// Create a Context
const SearchContext = createContext();

// Create a Provider Component
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use the context
export const useSearch = () => {
  return useContext(SearchContext);
};
