// app/components/RecipeGrid.jsx
import React from "react";
import RecipeCard from "./RecipeCard"; // Update this import
import Paginate from "./Paginate";
import FilterSortComponent from "./FilterSort";

const RecipeGrid = async ({ searchParams }) => {
  const category = searchParams?.category || "";
  const tags = searchParams?.tags ? searchParams.tags.split(",") : [];
  const numSteps = parseInt(searchParams?.numSteps) || "";
  const ingredients = searchParams?.ingredients || "";
  const sortOption = searchParams?.sortOption || "";
  const skip = parseInt(searchParams.skip, 10) || 0;
  const search = searchParams.search || "";
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  try {
    
    const res = await fetch(`${url}/api/recipe?search=${search}&skip=${skip}&category=${category}&tags=${tags.join(',')}&numSteps=${numSteps}&ingredients=${ingredients}&sortOption=${sortOption}`,{cache:'force-cache'},{
    headers: { 'Content-Type': 'application/json' }
  });
  console.log(res.status,'stats')
    if (!res.ok) throw new Error('Failed to fetch recipes');
    const recipes = await res.json();
   // console.log(recipes)
    let categories;
    let fav;

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