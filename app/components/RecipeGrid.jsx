import React from 'react';
import RecipeCard from './RecipeCard';
import SkeletonGrid from './SkeletonMain';
import Pagination from './Pagination';

const RECIPES_PER_PAGE = 52;

// Fetch recipes from the API
async function fetchRecipes(currentPage) {
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const skip = (currentPage - 1) * RECIPES_PER_PAGE;
  
  try {
    // Make sure to include skip in the URL
    const response = await fetch(
      `${url}/api/recipe?skip=${skip}&limit=${RECIPES_PER_PAGE}`,
      { 
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    
    const data = await response.json();
    console.log(`Fetching recipes with skip=${skip}, page=${currentPage}`); // Debug log
    return { recipes: data.recipes, total: data.total };
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return { recipes: null, total: 0 };
  }
}

const RecipeGrid = async ({ skip }) => {
  
  
  // Fetch recipes with current page
  const { recipes, total } = await fetchRecipes(currentPage);
  const totalPages = Math.ceil(total / RECIPES_PER_PAGE);

  if (!recipes) {
    return <SkeletonGrid />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Recipe Rush</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our collection of easy-to-make recipes that are perfect for any occasion.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default RecipeGrid;


