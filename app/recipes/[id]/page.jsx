"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RecipeSkeleton from "../../components/RecipeDetailSkeleton";

const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

const RecipeDetail = ({ params }) => {
  const { id } = params;
  const router = useRouter();

  const [recipe, setRecipe] = useState(null);
  const [activeTab, setActiveTab] = useState("ingredients");

  
  console.log("Recipe ID from params:", id); 

  useEffect(() => {
    const getRecipe = async () => {
      try {
        if (!id) {
          console.error("No ID found in params");
          return;
        }
        const response = await fetch(`/api/recipe/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }
        const data = await response.json();
        console.log(data.recipe, 'data')
        setRecipe(data.recipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    getRecipe();
  }, [id]);

  if (!recipe) {
    return <RecipeSkeleton />;
  }

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans">
      <button
        onClick={() => router.back()}
        className="text-gray-600 hover:text-gray-900 mb-4 flex items-center"
      >
        ← Back
      </button>

      <div className="grid items-start grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full lg:sticky top-0 flex gap-3">
          <img
            src={recipe.images[0]}
            alt={recipe.title}
            className="w-3/4 rounded-lg object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800">{recipe.title}</h1>

          <p className="text-lg italic text-gray-600 mb-6">
            Discover how to make this delicious {recipe.title}.
            {recipe.description || "any occasion"}.
          </p>

          <div className="text-lg text-gray-800 space-y-2">
            <p>
              <strong>Prep Time:</strong> {formatTime(recipe.prep)}
            </p>
            <p>
              <strong>Cook Time:</strong> {formatTime(recipe.cook)}
            </p>
            <p><strong>Category:</strong> {recipe.category}</p>
            <p>
              <strong>Servings:</strong> {recipe.servings} servings
            </p>
            <p><strong>Published:</strong> {new Date(recipe.published).toLocaleDateString()}</p>
          </div>

          <ul className="grid grid-cols-3 mt-10 border-b-2">
            <li
              className={`text-gray-800 font-semibold text-base text-center py-3 cursor-pointer ${
                activeTab === "ingredients" ? "border-b-2 border-gray-800" : ""
              }`}
              onClick={() => setActiveTab("ingredients")}
            >
              Ingredients
            </li>
            <li
              className={`text-gray-800 font-semibold text-base text-center py-3 cursor-pointer ${
                activeTab === "instructions" ? "border-b-2 border-gray-800" : ""
              }`}
              onClick={() => setActiveTab("instructions")}
            >
              Instructions
            </li>
            <li
              className={`text-gray-800 font-semibold text-base text-center py-3 cursor-pointer ${
                activeTab === "nutrition" ? "border-b-2 border-gray-800" : ""
              }`}
              onClick={() => setActiveTab("nutrition")}
            >
              Nutrition
            </li>
          </ul>

          <div className="mt-6">
            {activeTab === "ingredients" ? (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                <ul className="list-disc pl-6 text-gray-700">
                  {Object.entries(recipe.ingredients).map(([ingredient, quantity], index) => (
                    <li key={index}>
                    {ingredient}: {quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ) : activeTab === "instructions" ? (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                <ul className="list-disc pl-6 text-gray-700">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="recipe-nutrition">
                <h3 className="text-2xl font-semibold mb-4">Nutrition Information</h3>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Calories: {recipe.nutrition.calories}</li>
                  <li>Fat: {recipe.nutrition.fat}g</li>
                  <li>Saturated Fat: {recipe.nutrition.saturated}g</li>
                  <li>Sodium: {recipe.nutrition.sodium}mg</li>
                  <li>Carbohydrates: {recipe.nutrition.carbohydrates}g</li>
                  <li>Fiber: {recipe.nutrition.fiber}g</li>
                  <li>Sugar: {recipe.nutrition.sugar}g</li>
                  <li>Protein: {recipe.nutrition.protein}g</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
