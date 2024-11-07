"use client";
import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState([]);

  // Load favourites from local storage on initial render
  useEffect(() => {
    const storedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(storedFavourites);
  }, []);

  // Save favourites to local storage when the list changes
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  // Handler for adding a recipe to favourites
  const addFavourite = (recipe) => {
    if (!favourites.find(fav => fav._id === recipe._id)) {
      setFavourites([...favourites, recipe]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Favourites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favourites.length > 0 ? (
          favourites.map(recipe => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              onAddToFavourites={() => addFavourite(recipe)}
            />
          ))
        ) : (
          <p className="text-gray-500">You have no favourite recipes yet. Start adding some!</p>
        )}
      </div>
    </div>
  );
};

export default FavouritesPage;
