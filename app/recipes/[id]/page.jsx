"use client";

import { useRouter } from "next/navigation";
import RecipeSkeleton from "../../components/RecipeDetailSkeleton";
import RecipeDetailCard from "../../components/RecipeDetailCard";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../components/ui/dialog";

export default function RecipeDetail({ params }) {
  const { id } = params;
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false); // For error dialog
  const [dialogMessage, setDialogMessage] = useState(""); // Error message for dialog

  useEffect(() => {
    const fetchRecipe = async (id) => {
      try {
        const response = await fetch(`/api/recipe/${id}`);
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

  const handleTextToSpeech = () => {
    if (!recipe || !recipe.instructions) {
      setDialogMessage("No instructions available for this recipe.");
      setDialogOpen(true);
      return;
    }

    try {
      const speech = new SpeechSynthesisUtterance(recipe.instructions.join(". "));
      speech.onerror = () => {
        setDialogMessage("Text-to-Speech feature failed.");
        setDialogOpen(true);
      };
      window.speechSynthesis.speak(speech);
    } catch (err) {
      console.error("Error using Text-to-Speech:", err);
      setDialogMessage("Text-to-Speech feature failed.");
      setDialogOpen(true);
    }
  };

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
      </Head>

      <div className="p-6 max-w-6xl mx-auto font-sans">
        <button
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
          className="text-gray-200 hover:text-gray-500 mb-4 flex items-center"
        >
          ← Back
        </button>

        <RecipeDetailCard recipe={recipe} id={id} />

        <button
          onClick={handleTextToSpeech}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Read Instructions
        </button>
      </div>

      {/* Error Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
