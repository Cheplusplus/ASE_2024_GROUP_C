"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AddReview from "./Addreview";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import RecipeReviews from "./Reviews";

// Helper function to format time
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
  const [reviewUpdateKey, setReviewUpdateKey] = useState(0);
  const router = useRouter();

  const totalTime = (recipe.prep || 0) + (recipe.cook || 0);
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  // Set document title
  useEffect(() => {
    document.title = `${recipe.title} | Recipe Details`;
  }, [recipe.title]);

  const handleReviewAdded = () => {
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
      }

      setTimeout(() => {
        setMessage("");
      }, 2000);

      setOpenTextArea(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while updating.");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      setOpenTextArea(false);
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
      {/* Left Section: Images */}
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

      {/* Right Section: Details */}
      <div>
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">{recipe.title}</h1>

        {/* Tags */}
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
                className="block p-2.5 w-[300px] text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type here..."
              />
              <button onClick={()=>{handleUpdate();setOpenTextArea(false)}} className='w-20 bg-green-400 hover:bg-green-500 text-black dark:text-white font-bold m-2 rounded'>Submit</button>
              <button onClick={()=>{setOpenTextArea(false)}} className='w-20 bg-red-400 hover:bg-red-500 text-black dark:text-white font-bold m-2 rounded'>Close</button>
            </div>
          ) : (
            <button onClick={()=>setOpenTextArea(true)} className='w-12 mb-4 bg-blue-400 hover:bg-blue-500 text-black dark:text-white font-bold rounded'>Edit</button>
          )}
        </span>

        <div className="text-lg text-gray-800 dark:text-gray-200 space-y-2">
          <p><strong>Prep Time:</strong> {formatTime(recipe.prep || 0)}</p>
          <p><strong>Cook Time:</strong> {formatTime(recipe.cook || 0)}</p>
          <p><strong>Category:</strong> {recipe.category || "Uncategorized"}</p>
          <p><strong>Servings:</strong> {recipe.servings || "N/A"} servings</p>
          <p><strong>Published:</strong> {recipe.published ? new Date(recipe.published).toLocaleDateString() : "N/A"}</p>
        </div>

        <ul className="grid grid-cols-3 mt-10 border-b-2 border-gray-200 dark:border-gray-700">
          {["ingredients", "instructions", "nutrition"].map((tab) => (
            <li
              key={tab}
              className={`text-gray-800 dark:text-gray-200 font-semibold text-base text-center py-3 cursor-pointer ${
                activeTab === tab ? "border-b-2 border-gray-800 dark:border-gray-200" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </li>
          ))}
        </ul>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "ingredients" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Ingredients</h2>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                {Object.entries(recipe.ingredients || {}).map(
                  ([ingredient, quantity], index) => (
                    <li key={index}>
                      {ingredient}: {quantity}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
          {activeTab === "instructions" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Instructions</h2>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                {recipe.instructions?.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
              <button
                onClick={readInstructions}
                className="w-fit p-2 bg-green-400 rounded hover:bg-green-500 text-black font-bold m-2"
              >
                Read Instructions
              </button>
            </div>
          )}
          {activeTab === "nutrition" && (
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Nutrition Information</h3>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>Calories: {recipe.nutrition?.calories || "N/A"}</li>
                <li>Fat: {recipe.nutrition?.fat || "N/A"}g</li>
                <li>Saturated Fat: {recipe.nutrition?.saturated || "N/A"}g</li>
                <li>Sodium: {recipe.nutrition?.sodium || "N/A"}mg</li>
                <li>Carbohydrates: {recipe.nutrition?.carbohydrates || "N/A"}g</li>
                <li>Fiber: {recipe.nutrition?.fiber || "N/A"}g</li>
                <li>Sugar: {recipe.nutrition?.sugar || "N/A"}g</li>
                <li>Protein: {recipe.nutrition?.protein || "N/A"}g</li>
              </ul>
            </div>
          )}
        </div>

        <div className="mt-8">
          <RecipeReviews recipeId={id} reviewUpdateKey={reviewUpdateKey} />
          <AddReview recipeId={id} onAdd={handleReviewAdded} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailCard;
