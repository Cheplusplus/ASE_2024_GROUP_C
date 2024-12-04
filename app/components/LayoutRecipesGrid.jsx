"use client";

import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

const LayoutRecipesGrid = () => {
  const [recipes, setRecipes] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipesAndFavourites = async () => {
      const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

      try {
        // Fetch favourites
        const favResponse = await fetch(`${url}/api/favourites`);
        if (!favResponse.ok) throw new Error("Failed to fetch favourites");
        const favData = await favResponse.json();
        setFavourites(favData.favourites || []);

        // Fetch recipes
        const recipeResponse = await fetch(`${url}/api/recipe?limit=8`, {
          cache: "force-cache",
          headers: { "Content-Type": "application/json" },
        });
        if (!recipeResponse.ok) throw new Error("Failed to fetch recipes");
        const recipeData = await recipeResponse.json();
        setRecipes(recipeData.recipes || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipesAndFavourites();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-gray-500 bg-gray-50 px-6 py-4 rounded-lg shadow-sm">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-red-500 bg-red-50 px-6 py-4 rounded-lg shadow-sm">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-8">
      {recipes.length === 0 ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-gray-500 bg-gray-50 px-6 py-4 rounded-lg shadow-sm">
            No recipes found matching your criteria
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} fav={favourites} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LayoutRecipesGrid;
