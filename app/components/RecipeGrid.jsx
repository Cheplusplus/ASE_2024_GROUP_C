"use client";

import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import Paginate from "./Paginate";
import FilterSortComponent from "./FilterSort";

const RecipeGrid = ({ searchParams }) => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const category = searchParams?.category || "";
  const tags = searchParams?.tags ? searchParams.tags.split(",") : [];
  const numSteps = parseInt(searchParams?.numSteps) || "";
  const ingredients = searchParams?.ingredients || "";
  const sortOption = searchParams?.sortOption || "";
  const skip = parseInt(searchParams.skip, 10) || 0;
  const search = searchParams.search || "";
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch recipes
        const recipeResponse = await fetch(
          `${url}/api/recipe?search=${search}&skip=${skip}&category=${category}&tags=${tags.join(
            ","
          )}&numSteps=${numSteps}&ingredients=${ingredients}&sortOption=${sortOption}`,
          { cache: "force-cache" }
        );
        if (!recipeResponse.ok) throw new Error("Failed to fetch recipes");
        const recipeData = await recipeResponse.json();
        setRecipes(recipeData.recipes || []);

        // Fetch categories
        const categoryResponse = await fetch(`${url}/api/categories`, {
          cache: "force-cache",
        });
        if (!categoryResponse.ok)
          throw new Error(`HTTP error! Status: ${categoryResponse.status}`);
        const categoryData = await categoryResponse.json();
        setCategories(categoryData.categories || []);

      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, skip, category, tags, numSteps, ingredients, sortOption, url]);

  useEffect(()=>{
    const fetchFavs = async ()=>{
            // Fetch favourites
            const favResponse = await fetch(`${url}/api/favourites`, {
              cache: "no-cache",
            });
            if (!favResponse.ok) throw new Error("Failed to fetch favourites");
            const favData = await favResponse.json();
            setFavourites(favData.favourites || []);
          }

          fetchFavs()

  },[])

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
      {/* Pass categories to FilterSortComponent */}
      <FilterSortComponent
        categories={categories}
        search={search}
        count1={recipes.length}
      />

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
      <Paginate skip={skip} />
    </div>
  );
};

export default RecipeGrid;
