"use client";

import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { DeleteIcon, TrashIcon, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * @function Downloads
 * @description The Downloads component displays a list of recipes that have been downloaded for offline use.
 * It retrieves the downloaded recipes from the local storage and sets them in the component state.
 * If no recipes are downloaded, it displays a message indicating that no recipes are available.
 * Each downloaded recipe is displayed as a link to its detail page.
 */import Loading from "./loading";

const Downloads = () => {
  const [downloadedRecipes, setDownloadedRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      const recipes = JSON.parse(localStorage.getItem("downloadedRecipes")) || [];
      setDownloadedRecipes(recipes);
      setFilteredRecipes(recipes);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

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

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  return (
    <div> 
      <button 
            onClick={(e) => { e.preventDefault(); router.back(); }} 
            className="mt-6 ml-6 flex items-center group text-gray-700 dark:text-gray-300 hover:text-[#26442a] dark:hover:text-[#26442a] transition-all duration-300 bg-white/10 dark:bg-gray-700/20 hover:bg-[#26442a]/10 px-4 py-2 rounded-full shadow-sm hover:shadow-md transform hover:-translate-x-2 hover:scale-105 mr-4"
          >
            <ArrowLeft 
              className="mr-2 transition-transform group-hover:-translate-x-1 group-hover:scale-110 text-[#26442a] dark:text-green-500" 
              strokeWidth={2.5} 
            />
            <span className="font-semibold text-sm uppercase tracking-wider">Back</span>
          </button>
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
    </div>
  );
};

export default Downloads;