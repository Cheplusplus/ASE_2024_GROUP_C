'use client'
import React, { createContext, useState, useContext, useEffect } from "react";

// Create a context for both fav count and new reviews
const FavContext = createContext();

// Custom hook to use the combined context
export const useMyContext = () => useContext(FavContext);

// Context provider component
export const FavProvider = ({ children }) => {
  const [updateCount, setUpdateCount] = useState(0); // Favourites count
  const [favouriteRecipes, setFavouriteRecipes] = useState([]); // Favourite recipes
  const [newReviewCount, setNewReviewCount] = useState(0); // New reviews count

  // Fetch favourites count from the server when session changes or on mount
  useEffect(() => {
    const fetchFavouritesCount = async () => {
      try {
        const response = await fetch('/api/favourites');
        if (response.ok) {
          const data = await response.json();
          setUpdateCount(data.count); // Set the fetched favourite count
        }
      } catch (error) {
        console.error('Error fetching favourites count:', error);
      }
    };

    fetchFavouritesCount();
  }, []);

  // Load the favourite recipes from local storage or backend
  useEffect(() => {
    const savedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavouriteRecipes(savedFavourites);
  }, []);

  // Function to update the fav count (increment or decrement)
  const updateFavCount = (increment) => {
    setUpdateCount((prev) => increment ? prev - 1 : prev + 1);
  };

  // Function to add a new review to a favourite recipe
  const addNewReviewToFavourite = (recipeId, review) => {
    const updatedFavourites = favouriteRecipes.map((recipe) =>
      recipe.id === recipeId
        ? { ...recipe, reviews: [...recipe.reviews, review] }
        : recipe
    );
    setFavouriteRecipes(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));

    // Increment the new review count
    setNewReviewCount((prev) => prev + 1);
  };

  return (
    <FavContext.Provider
      value={{
        updateCount,
        newReviewCount,
        favouriteRecipes,
        updateFavCount,
        addNewReviewToFavourite,
      }}
    >
      {children}
    </FavContext.Provider>
  );
};