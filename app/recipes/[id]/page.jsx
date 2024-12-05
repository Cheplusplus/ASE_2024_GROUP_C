"use client";

import { useRouter } from "next/navigation";
import RecipeSkeleton from "../../components/RecipeDetailSkeleton";
import RecipeDetailCard from "../../components/RecipeDetailCard";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

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
          className="text-gray-200 hover:text-gray-500 mb-4 flex items-center"
        >
          ← Back
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
