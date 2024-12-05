"use client";

import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { DeleteIcon, TrashIcon } from "lucide-react";

/**
 * @function Downloads
 * @description The Downloads component displays a list of recipes that have been downloaded for offline use.
 * It retrieves the downloaded recipes from the local storage and sets them in the component state.
 * If no recipes are downloaded, it displays a message indicating that no recipes are available.
 * Each downloaded recipe is displayed as a link to its detail page.
 */
const Downloads = () => {
  const [downloadedRecipes, setDownloadedRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch downloaded recipes from localStorage
    const recipes = JSON.parse(localStorage.getItem("downloadedRecipes")) || [];
    setDownloadedRecipes(recipes);
    setFilteredRecipes(recipes); // Initialize filtered recipes
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter recipes based on title
    const filtered = downloadedRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(term)
    );
    setFilteredRecipes(filtered);
  };

  const HandleClearDownloads =()=> {
    localStorage.removeItem('downloadedRecipes')
    setDownloadedRecipes([])
    setFilteredRecipes([])

  }

  return (
    <div className="pt-8  mx-auto font-sans">
      <div className=" px-[8%] 2xl:px-[16%] pb-5">
        <h1 className=" text-2xl font-bold mb-4">Downloaded Recipes</h1>
        {/* Search input */}
        <div className=" mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search recipes by title..."
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
          onClick={HandleClearDownloads}
            className=" p-2 bg-red-500 text-white rounded hover:bg-red-600"
            title="Clear Downloaded Recipes"
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      {filteredRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div className="grid max-w-7xl grid-cols-2 mx-auto lg:px-8 px-4 sm:px-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Downloads;
