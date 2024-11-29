// app/components/RecipeGrid.jsx
import React from "react";
import RecipeCard from "./RecipeCard"; // Update this import
import Paginate from "./Paginate";
import FilterSortComponent from "./FilterSort";


/**
 * RecipeGrid renders a grid of recipes matching the given search criteria.
 * 
 *It fetches the recipes from the API using the given search parameters and
 * displays them in a responsive grid. It also renders a FilterSortComponent
 * at the top with the categories and a Paginate component at the bottom.
 * 
 * RecipeGrid takes a searchParams object as a prop, which is expected to contain
 * the following properties:
 * 
 *
 * - category: The category to filter recipes by.
 * - tags: A comma-separated list of tags to filter recipes by.
 * - numSteps: The minimum number of steps required in the recipe.
 * - ingredients: A comma-separated list of ingredients required in the recipe.
 * - sortOption: The sorting option to apply to the recipes.
 * - skip: The number of recipes to skip in the API query.
 * - search: The search query string to filter recipes by.
 *
 * RecipeGrid fetches the recipes from the API and renders a FilterSortComponent
 * with the categories, search query, and count of recipes found. If no recipes
 * are found, RecipeGrid displays a message indicating so. Otherwise, it renders
 * a grid of RecipeCard components, each displaying a single recipe. Finally,
 * RecipeGrid renders a Paginate component to allow the user to navigate to the
 * previous or next page of recipes.
 * 
 * @param {object} searchParams - The search parameters passed down from the parent component.
 * @returns {ReactElement} - The rendered RecipeGrid component.
 */
const RecipeGrid = async ({ searchParams }) => {
  const category = searchParams?.category || "";
  const tags = searchParams?.tags ? searchParams.tags.split(",") : [];
  const numSteps = parseInt(searchParams?.numSteps) || "";
  const ingredients = searchParams?.ingredients || "";
  const sortOption = searchParams?.sortOption || "";
  const skip = parseInt(searchParams.skip, 10) || 0;
  const search = searchParams.search || "";

  try {
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${url}/api/recipe?search=${search}&skip=${skip}&category=${category}&tags=${tags.join(',')}&numSteps=${numSteps}&ingredients=${ingredients}&sortOption=${sortOption}`,{cache:'force-cache'},{
    headers: { 'Content-Type': 'application/json' }
  });
  console.log(res.status,'stats')
    if (!res.ok) throw new Error('Failed to fetch recipes');
    const recipes = await res.json();
   // console.log(recipes)
    let categories;

      const response = await fetch(`${url}/api/categories`, {cache: 'force-cache'});
      console.log(response.status,'status')
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
       categories = await response.json();
   
     
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
