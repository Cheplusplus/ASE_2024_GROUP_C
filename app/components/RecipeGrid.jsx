"use client"
import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import SkeletonGrid from './SkeletonMain';
import FilterSort from './FilterSort';

const RecipeGrid = () => {
  const [recipes, setRecipes] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/recipe', { cache: "no-store" });
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data.recipes);
        setFilteredRecipes(data.recipes);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const handleFilterSort = (updatedRecipes) => {
    setFilteredRecipes(updatedRecipes);
  };

  if (isLoading) return <SkeletonGrid />;
  if (error) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-red-500 bg-red-50 px-6 py-4 rounded-lg shadow-sm">
        Error: {error}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FilterSort recipes={recipes} onFilterSort={handleFilterSort} />
      
      {filteredRecipes?.length === 0 ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-gray-500 bg-gray-50 px-6 py-4 rounded-lg shadow-sm">
            No recipes found matching your criteria
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRecipes?.map(recipe => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeGrid;