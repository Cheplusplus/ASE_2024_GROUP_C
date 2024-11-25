import React from 'react'
import RecipeCard from './RecipeCard';

const LayoutRecipesGrid = async() => {
    try {
        const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const res = await fetch(`${url}/api/recipe?limit=8`,{cache:'no-store'},{
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(res.status,'stats')
        if (!res.ok) throw new Error('Failed to fetch recipes');
        const recipes = await res.json();
    
        return (
          <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-8">
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
}

export default LayoutRecipesGrid
