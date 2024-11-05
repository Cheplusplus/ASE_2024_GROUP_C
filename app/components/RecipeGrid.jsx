// app/components/RecipeGrid.jsx
import React from "react";
import RecipeCard from "./RecipeCard"; // Update this import
import Paginate from "./Paginate";
import SkeletonGrid from "./SkeletonMain";
import FilterSortComponent from "./FilterSort";
import { getCategories ,getRecipes } from "../lib/api";

const RecipeGrid = async ({ searchParams }) => {
  const category = searchParams?.category || "";
  const tags = searchParams?.tags ? searchParams.tags.split(",") : [];
  const numSteps = parseInt(searchParams?.numSteps) || "";
  const ingredients = searchParams?.ingredients || "";
  const sortOption = searchParams?.sortOption || "";
  const skip = parseInt(searchParams.skip, 10) || 0;
  const search = searchParams.search || "";

  try {
    // Fetch recipes and categories based on URL parameters

    // const recipeData = await getRecipes({
    //       category,
    //       tags,
    //       numSteps,
    //       ingredients,
    //       sortOption,
    //       skip,
    //       search,
    //     });
    //     console.log(recipeData[0],'slide 123')
    // const categoriesData = await getCategories()
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    console.log(url)
    const res = await fetch(`${url}/api/recipe?search=${search}&skip=${skip}&category=${category}&tags=${tags.join(',')}&numSteps=${numSteps}&ingredients=${ingredients}&sortOption=${sortOption}`,{cache:'no-store'},{
    headers: { 'Content-Type': 'application/json' }
  });
    console.log(res)
    if (!res.ok) throw new Error('Failed to fetch recipes');
    const recipes = await res.json();
    let categories;

      const response = await fetch(`${url}/api/categories`);
    
      if (response.ok != true) throw new Error(`HTTP error! Status: ${response.status}`);
    
       categories = await response.json();
      console.log(categories, 'categories');
   
     
    return (
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-8">
        {/* Pass categories to FilterSortComponent */}
        <FilterSortComponent
          categories={categories.categories}
          search={search}
          count1={recipes.count}
        />

        {recipes.recipes.length === 0 ? 
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-gray-500 bg-gray-50 px-6 py-4 rounded-lg shadow-sm">
              No recipes found matching your criteria
            </div>
          </div>
         : 
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
            {recipes.recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        }
        <Paginate skip={skip} />
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-red-500 bg-red-50 px-6 py-4 rounded-lg shadow-sm">
          Error: {error.message}
        </div>
      </div>
    );
  }
};

export default RecipeGrid;
