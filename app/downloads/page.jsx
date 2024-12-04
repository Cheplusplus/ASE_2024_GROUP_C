"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import RecipeCard from "../components/RecipeCard";

const Downloads = () => {
  const [downloadedRecipes, setDownloadedRecipes] = useState([]);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem("downloadedRecipes")) || [];
    setDownloadedRecipes(recipes);
  }, []);

  return (
    <div className="pt-8  mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">Downloaded Recipes</h1>
      {downloadedRecipes.length === 0 ? (
        <p>No recipes downloaded yet.</p>
      ) : (
        <div className="grid max-w-7xl grid-cols-2 mx-auto lg:px-8 px-4 sm:px-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2  md:gap-6">
          {downloadedRecipes.map((recipe) => (
            // <div key={recipe._id}>
            //   <Link href={`/recipes/${recipe._id}`}>
            //     <h1 className="text-blue-500 underline">{recipe.title}</h1>
            //   </Link>
            // </div>
            <RecipeCard key={recipe._id} recipe={recipe} />
           
          ))}
        </div>
      )}
    </div>
  );
};

export default Downloads;
