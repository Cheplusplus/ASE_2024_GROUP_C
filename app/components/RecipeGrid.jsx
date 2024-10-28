import React from 'react';
import RecipeCard from './RecipeCard'; // Update this import
import SkeletonGrid from './SkeletonMain';
// import Pagination from './Pagination';
import dynamic from 'next/dynamic';
// import fetchRecipes from '@/lib/fetchRecipes';

const Pagination= dynamic(() => import('./Pagination'), { ssr: false});

const RECIPES_PER_PAGE = 52;

const fetchRecipes = async (skip = 0, limit = RECIPES_PER_PAGE) => {
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  try {
    const response = await fetch(`${url}/api/recipe?skip=${skip}&limit=${limit}`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    const data = await response.json();
    return data.recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return null; // Handle error gracefully
  }
};

const RecipeGrid = async ({ searchParams = 0 }) => {

  const currentPage = parseInt(searchParams.page, 10) || 1;
  const skip = (currentPage - 1) * RECIPES_PER_PAGE;


   // Fetch recipes and total count
   const { recipes, total } = await fetchRecipes(skip, RECIPES_PER_PAGE);

   // Calculate total pages
   const totalPages = Math.ceil(total / RECIPES_PER_PAGE);
 
   // Function to generate page URLs
   const onPageChangeUrl = (page) => `/recipes?page=${page}`;

  
   if (!recipes) {
    return <SkeletonGrid />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Grid Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Recipe Rush
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our collection of easy-to-make recipes that are perfect for any occasion.
        </p>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {recipes.map(recipe => <RecipeCard key={recipe._id} recipe={recipe} />)}
      </div>

      {/* Pagination Controls */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChangeUrl={onPageChangeUrl} />
    </div>
  );
};

export default RecipeGrid;
