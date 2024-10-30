import RecipeCard from './RecipeCard';
import SkeletonGrid from './SkeletonMain';
import FilterSortComponent from './FilterSort';
import { getRecipes, getCategories } from '../../lib/api';

const RecipeGrid = async ({ searchParams }) => {
  const category = searchParams?.category || '';
  const tags = searchParams?.tags ? searchParams.tags.split(',') : [];
  const numSteps = parseInt(searchParams?.numSteps) || '';
  const ingredients = searchParams?.ingredients || '';
  const sortOption = searchParams?.sortOption || '';

  try {
    // Fetch recipes and categories based on URL parameters
    const [recipeData, categoryData] = await Promise.all([
      getRecipes({
        category,
        tags,
        numSteps,
        ingredients,
        sortOption,
      }),
      getCategories(),
    ]);

    const recipes = recipeData.recipes;
    const categories = categoryData;

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Pass categories to FilterSortComponent */}
        <FilterSortComponent categories={categories} />

        {recipes.length === 0 ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-gray-500 bg-gray-50 px-6 py-4 rounded-lg shadow-sm">
              No recipes found matching your criteria
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
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
