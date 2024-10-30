import React from 'react';
import RecipeCard from './RecipeCard';
import SkeletonGrid from './SkeletonMain';
import Paginate from './Paginate';

/**
 * Fetches recipes from the API, using the skip parameter for pagination.
 * 
 * @async
 * @function fetchRecipes
 * @param {number} [skip=0] - The number of recipes to skip for pagination.
 * @returns {Promise<Array>} - A promise that resolves to an array of recipe objects.
 * @throws Will throw an error if the network request fails.
 */

const fetchRecipes = async (search = '', skip= 0) => {
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  try {
    const response = await fetch(`${url}/api/recipe/?search=${(search)}&skip=${skip}`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    
    const data = await response.json();
    console.log(`Fetching recipes with skip=${skip},`); // Debug log
    return { recipes: data.recipes, total: data.total };
  } catch (error) {
    console.error('Error fetching recipes1:', error);
    throw error;
  }
};

const RecipeGrid = async ({ search , skip }) => {
  
  const recipes = await fetchRecipes(search || '', skip);
  
  if (!recipes || recipes.length === 0) {
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
        {recipes.recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
      <Paginate skip={skip}/>
    </div>
  );
};

export default RecipeGrid;


