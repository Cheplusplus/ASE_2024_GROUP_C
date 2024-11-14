"use client";

import { useRouter } from "next/navigation";
import RecipeSkeleton from "../../components/RecipeDetailSkeleton";
import RecipeDetailCard from "../../components/RecipeDetailCard";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link"; // Import Link for navigation

export default function RecipeDetail({ params }) {
  const { id } = params;
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const fetchRecipe = async (id) => {
      try {
        const response = await fetch(`/api/recipe/${id}`);
        console.log(response)
        if (!response.ok) {
          throw new Error(`Failed to fetch recipe: ${response.statusText}`);
        }
        const data = await response.json();
        setRecipe(data.recipe);

        const res = await fetch(`/api/categories`)
        if(!res.ok){
          console.log(res.status,'failed')
        }
        let cate = await res.json();
        console.log(cate)
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError("Failed to load recipe. Please try again later.");
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

  if (error) {
    return (
      <div className="text-center text-red-500 relative mt-40">
        <p>{error}</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Go back to Home Page
        </Link>
      </div>
    );
  }

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  return (
    <>
      {/* Dynamic meta tags for SEO */}
      <Head>
        <title>{recipe.title} - Recipe Rush</title>
        <meta name="description" content={recipe.description} />
        <meta property="og:title" content={recipe.title} />
        <meta property="og:description" content={recipe.description} />
        <meta property="og:url" content={`https://recipe-rush.vercel.app/recipes/${id}`} />
        {recipe.images && <meta property="og:image" content={recipe.images[0]} />}

        {/* Structured Data for Recipe */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Recipe",
            name: recipe.title,
            description: recipe.description,
            image: recipe.images ? recipe.images[0] : "",
            recipeIngredient: recipe.ingredients,
            recipeInstructions: recipe.instructions,
            author: {
              "@type": "Person",
              name: recipe.author || "Recipe Rush"
            }
          })}
        </script>
      </Head>

      <div className="p-6 max-w-6xl mx-auto font-sans">
        {/* Main heading for SEO */}
        <h1 className="text-3xl font-bold">{recipe.title}</h1>
        
        <button
          onClick={(e) => {e.preventDefault();router.back()}}
          className="text-gray-600 hover:text-gray-900 mb-4 flex items-center"
        >
          ← Back
        </button>

        {/* RecipeDetailCard should ensure alt text is included for images */}
        <RecipeDetailCard recipe={recipe}  id={id}/>
      </div>
    </>
  );
}



