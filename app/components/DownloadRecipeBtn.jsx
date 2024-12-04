import React from "react";
import { useEffect, useState } from "react";
import { Download } from "lucide-react";

const DownloadRecipeBtn = ({ id }) => {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(false)
 
  useEffect(() => {
    const downloadedRecipes =
      JSON.parse(localStorage.getItem("downloadedRecipes")) || [];
    setIsDownloaded(downloadedRecipes.some((r) => r._id === id));
  }, [id]);

  const downloadRecipe = async (e) => {
    e.preventDefault()
   
    const downloadedRecipes =
      JSON.parse(localStorage.getItem("downloadedRecipes")) || [];

    // Check if the recipe is already downloaded
    if (isDownloaded) {
      const updatedRecipes = downloadedRecipes.filter(
        (r) => r._id !== recipe._id
      );
      localStorage.setItem("downloadedRecipes", JSON.stringify(updatedRecipes));
      setIsDownloaded(false);
      alert("Recipe removed from offline downloads.");
      return;
    }

    // Proceed to download if not already downloaded
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      const messageChannel = new MessageChannel();

      messageChannel.port1.onmessage = (event) => {
        if (event.data.success) {
          downloadedRecipes.push(recipe);
          localStorage.setItem(
            "downloadedRecipes",
            JSON.stringify(downloadedRecipes)
          );
          setIsDownloaded(true);
          alert("Recipe is now available offline!");
          return;
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
  return (
    <div
      className="bg-white/50 p-1 right-2 top-12 rounded-full absolute z-10 hover:bg-white/75 transition-all"
      onClick={downloadRecipe}
    //   disabled={isDownloaded}
    >
     {isDownloaded ? (
              <Download className="text-red-600 w-5 h-5"  />
            ) : (
              <Download className="text-gray-600 w-5 h-5" />
            )}
    </div>
  );
};

export default DownloadRecipeBtn;
