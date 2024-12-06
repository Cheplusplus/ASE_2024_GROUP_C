"use client";

import { useRouter } from "next/navigation";
import RecipeSkeleton from "../../components/RecipeDetailSkeleton";
import RecipeDetailCard from "../../components/RecipeDetailCard";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * The RecipeDetail component renders a page displaying the details of a recipe
 * given the id of the recipe as a parameter. It fetches the recipe from the API
 * and renders a RecipeDetailCard component with the recipe data. If the recipe
 * is not found, it renders a message indicating so. It also renders a button
 * allowing the user to download the recipe for offline use, if the browser
 * supports service workers. If the recipe is already downloaded, the button is
 * disabled and displays "Downloaded".
 *
 * @param {{ params: { id: string } }} props - The id of the recipe to fetch and
 * display.
 */
export default function RecipeDetail({ params }) {
  const { id } = params;
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    const downloadedRecipes =
      JSON.parse(localStorage.getItem("downloadedRecipes")) || [];
    setIsDownloaded(downloadedRecipes.some((r) => r._id === id));
  }, [id]);

  const downloadRecipe = async () => {
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      const messageChannel = new MessageChannel();

      messageChannel.port1.onmessage = (event) => {
        if (event.data.success) {
          const downloadedRecipes =
            JSON.parse(localStorage.getItem("downloadedRecipes")) || [];
          downloadedRecipes.push(recipe);
          localStorage.setItem(
            "downloadedRecipes",
            JSON.stringify(downloadedRecipes)
          );
          setIsDownloaded(true);
          alert("Recipe is now available offline!");
        } else {
          alert("Failed to download recipe for offline use.");
        }
      };

      navigator.serviceWorker.controller.postMessage(
        {
          type: "CACHE_RECIPE",
          recipeUrl: `/api/recipe/${id}`,
        },
        [messageChannel.port2]
      );
    } else {
      alert("Offline functionality is not supported.");
    }
  };

  useEffect(() => {
    const fetchRecipe = async (id) => {
      try {
        const response = await fetch(`/api/recipe/${id}`, {
          cache: "force-cache",
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch recipe: ${response.statusText}`);
        }
        const data = await response.json();
        setRecipe(data.recipe);
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
      <div className="text-center my-10">
        <p className="text-red-600">{error}</p>
        <Link href="/" className="text-blue-500 underline">
          Go back to Home Page
        </Link>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center my-10">
        <p className="text-gray-600">Recipe not found</p>
        <Link href="/" className="text-blue-500 underline">
          Go back to Home Page
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{recipe.title} - Recipe Rush</title>
        <meta name="description" content={recipe.description} />
        <meta property="og:title" content={recipe.title} />
        <meta property="og:description" content={recipe.description} />
        <meta
          property="og:url"
          content={`https://recipe-rush.vercel.app/recipes/${id}`}
        />
        {recipe.images && (
          <meta property="og:image" content={recipe.images[0]} />
        )}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Recipe",
            name: recipe.title,
            description: recipe.description,
            image: recipe.images ? recipe.images[0] : "",
            recipeIngredient: recipe.ingredients,
            recipeInstructions: recipe.instructions,
            author: { "@type": "Person", name: recipe.author || "Recipe Rush" },
          })}
        </script>
      </Head>
      <div className="p-6 max-w-6xl mx-auto font-sans pt-16">
      <button
  onClick={(e) => {
    e.preventDefault();
    router.back();
  }}
  className="flex items-center group text-gray-700 dark:text-gray-300 
    hover:text-[#26442a] dark:hover:text-[#26442a] 
    transition-all duration-300 
    bg-white/10 dark:bg-gray-700/20 
    hover:bg-[#26442a]/10 
    px-4 py-2 
    rounded-full 
    shadow-sm 
    hover:shadow-md 
    transform 
    hover:-translate-x-2 
    hover:scale-105 
    mb-4"
>
  <ArrowLeft 
    className="mr-2 
      transition-transform 
      group-hover:-translate-x-1 
      group-hover:scale-110 
      text-[#26442a] 
      dark:text-green-500" 
    strokeWidth={2.5} 
  />
  <span className="font-semibold text-sm uppercase tracking-wider">
    Back
  </span>
</button>
        <button
          onClick={downloadRecipe}
          // disabled={isDownloaded}
          className="btn btn-primary"
        >
          {isDownloaded ? "Downloaded" : "Download for Offline Use"}
        </button>
        <RecipeDetailCard recipe={recipe} id={id} />
      </div>
    </>
  );
}
