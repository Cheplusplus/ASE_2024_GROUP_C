"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AddReview from "./AddReview";
import { FaStar } from "react-icons/fa"; // Importing the star icon from Font Awesome
import { useRouter } from "next/navigation";
import RecipeReviews from "./Reviews";

const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

const RecipeDetailCard = ({ recipe, id }) => {
  const [description, setDescription] = useState(recipe.description);
  const [activeTab, setActiveTab] = useState("ingredients");
  const [selectedImage, setSelectedImage] = useState(recipe.images?.[0]);
  const [openTextArea, setOpenTextArea] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [reviewUpdateKey, setReviewUpdateKey] = useState(0);

  const totalTime = (recipe.prep || 0) + (recipe.cook || 0);
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  // Set document title
  useEffect(() => {
    document.title = `${recipe.title} | Recipe Details`;
  }, [recipe.title]);

  const handleReviewAdded = () => {
    console.log("rerender");
    setReviewUpdateKey((prevKey) => prevKey + 1);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${url}/api/recipe/${id}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });

      if (response.ok) {
        setMessage("Recipe updated successfully!");
      } else {
        setMessage("Failed to update recipe.");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }

      setOpenTextArea(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while updating.");
      setOpenTextArea(false);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  const readInstructions = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = recipe.instructions?.join(". ") || "No instructions available.";
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.pitch = 1;

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Speech synthesis is not supported in this browser.");
    }
  };

  return (
    <div className="grid items-start grid-cols-1 md:grid-cols-2 gap-6">
      <div className="w-full lg:sticky top-0 flex flex-col gap-3">
        <div className="w-full">
          <Image
            src={selectedImage || "/fallback-image.jpg"}
            alt={recipe.title || "Recipe Image"}
            width={540}
            height={403}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {recipe.images?.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              width={64}
              height={64}
              className={`rounded-md cursor-pointer object-cover ${
                selectedImage === image ? "border-2 border-blue-500" : "border border-gray-300 dark:border-gray-700"
              }`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">{recipe.title}</h1>

        <div className="flex flex-wrap gap-2 my-4">
          {recipe.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-lg italic text-gray-600 dark:text-gray-300 mb-6">
          Discover how to make this delicious {recipe.title}.{" "}
          {recipe.description || "for any occasion"}.
        </p>
        <span className="text-lg italic text-gray-600 dark:text-gray-300 mb-6">
          {description || "any occasion"}
          <br/>
          {openTextArea ? (
            <div className="flex-1">
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" 
              />
              <button onClick={handleUpdate} className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p>{description}</p>
              <button
                onClick={() => setOpenTextArea(true)}
                className="text-blue-500 underline"
              >
                Edit Description
              </button>
            </div>
          )}
        </span>

        {message && <div className="bg-green-200 p-2 rounded-md">{message}</div>}
        <div>
          <div className="my-3">
            <h2 className="font-medium text-xl mb-3">Ingredients</h2>
            <ul className="list-disc pl-6">
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="my-3">
            <h2 className="font-medium text-xl mb-3">Instructions</h2>
            <ol className="list-decimal pl-6">
              {recipe.instructions?.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>

          <div className="my-6">
            <h2 className="font-medium text-xl mb-3">Time</h2>
            <p>{formatTime(totalTime)}</p>
          </div>

          <RecipeReviews recipeId={recipe.id} key={reviewUpdateKey} />
          <AddReview recipeId={recipe.id} onReviewAdded={handleReviewAdded} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailCard;
