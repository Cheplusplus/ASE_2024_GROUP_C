"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

/**
 * @function Downloads
 * @description The Downloads component displays a list of recipes that have been downloaded for offline use.
 * It retrieves the downloaded recipes from the local storage and sets them in the component state.
 * If no recipes are downloaded, it displays a message indicating that no recipes are available.
 * Each downloaded recipe is displayed as a link to its detail page.
 */
const Downloads = () => {
  const [downloadedRecipes, setDownloadedRecipes] = useState([]);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem("downloadedRecipes")) || [];
    setDownloadedRecipes(recipes);
  }, []);

  return (
    <div className="pt-8 max-w-6xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">Downloaded Recipes</h1>
      {downloadedRecipes.length === 0 ? (
        <p>No recipes downloaded yet.</p>
      ) : (
        <ul>
          {downloadedRecipes.map((recipe) => (
            <li key={recipe.id}>
              <Link href={`/recipes/${recipe._id}`}>
                <h1 className="text-blue-500 underline">{recipe.title}</h1>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Downloads;

