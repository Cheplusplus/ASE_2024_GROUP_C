'use client'
import React, { createContext, useState, useContext, useEffect } from "react";

const ShoppingListContext = createContext();

export const ShoppingListContextProvider = ({ children }) => {
  const [shoppingListCount, setShoppingListCount] = useState(0);

  // Fetch shopping list count when the component mounts
  useEffect(() => {
    const fetchShoppingListCount = async () => {
      try {
        // Get the user ID from the session or localStorage
        const user = localStorage.getItem('userId');

        if (user) {
          const response = await fetch(`/api/shopping-list?user=${user}`);
          if (response.ok) {
            const items = await response.json();
            setShoppingListCount(items.length);
          }
        }
      } catch (error) {
        console.error('Error fetching shopping list count:', error);
      }
    };

    fetchShoppingListCount();
  }, []);

  // Method to update shopping list count
  const updateShoppingListCount = (items) => {
      setShoppingListCount(items.length);
    };

  // Method to reset shopping list count to zero
  const resetShoppingListCount = () => {
    setShoppingListCount(0);
  };

  return (
    <ShoppingListContext.Provider 
      value={{ 
        shoppingListCount, 
        updateShoppingListCount, 
        resetShoppingListCount 
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

// Custom hook to use the shopping list context
export const useShoppingListContext = () => {
  return useContext(ShoppingListContext);
};