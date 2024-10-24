"use client";

import { useRouter } from "next/navigation";
import RecipeSkeleton from "../../components/RecipeDetailSkeleton";
import RecipeDetailCard from "../../components/RecipeDetailCard";
import { useEffect, useState } from "react";

export default function RecipeDetail({ params }) {
  const { id } = params;
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async (id) => {
      try {
        const response = await fetch(`/api/recipe/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }
        const data = await response.json();
        setRecipe(data.recipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe(id);
    }
  }, [id]);

  if (loading) {
    return <RecipeSkeleton />;
  }

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto mt-10 font-sans">
      <button
        onClick={() => router.back()}
        className="text-gray-600 hover:text-gray-900 mb-4 flex items-center"
      >
        ← Back
      </button>

      <RecipeDetailCard recipe={recipe} />
    </div>
  );
}
