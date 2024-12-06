"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AddReview from "./Addreview";
import { useRouter } from "next/navigation";
import RecipeReviews from "./Reviews";
import InstructionReader from "./ReadInstructions";
import RecipeTips from "./AskAI";
import ShoppingListButton from "./ShoppingListButton";
import { useSession } from "next-auth/react";

const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

const RecipeDetailCard = ({ recipe, id, allergens = [] }) => {
  const [description, setDescription] = useState(recipe.description);
  const [activeTab, setActiveTab] = useState("ingredients");
  const [selectedImage, setSelectedImage] = useState(recipe.images?.[0]);
  const [openTextArea, setOpenTextArea] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [reviewUpdateKey, setReviewUpdateKey] = useState(0);
  const { data: session } = useSession();
  const [latest, setLatest] = useState(null);

  const totalTime = (recipe.prep || 0) + (recipe.cook || 0);
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  // Determine recipe's allergens
  const recipeAllergens = allergens.filter((allergen) =>
    Object.keys(recipe.ingredients || {}).some((ingredient) =>
      ingredient.toLowerCase().includes(allergen.toLowerCase())
    )
  );

  // Set document title
  useEffect(() => {
    document.title = `${recipe.title} | Recipe Details`;
  }, [recipe.title]);

  useEffect(() => {
    const handleUpdate = async () => {
      const response = await fetch(`${url}/api/editDescLatest?recipeId=${id}`);
      if (!response.ok) {
        setLatest(null);
      } else {
        const data = await response.json();
        setLatest(data);
      }
    };

    handleUpdate();
  }, [id, url]);

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

      await fetch(`${url}/api/editDesc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: session.user.name, recipeId: id }),
      });

      setOpenTextArea(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while updating.");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  return (
    <div className="grid items-start grid-cols-1 md:grid-cols-2 gap-6">
      <div className="w-full lg:sticky top-0 flex flex-col gap-3">
        <div className="w-full relative h-[300px] md:h-[403px]">
          <Image
            src={selectedImage || "/fallback-image.jpg"}
            alt={recipe.title || "Recipe Image"}
            fill
            priority={true}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {recipe.images?.map((image, index) => (
            <div
              key={index}
              className={`relative w-16 h-16 rounded-md overflow-hidden cursor-pointer ${
                selectedImage === image ? "border-2 border-gray-800" : ""
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-400">
            {recipe.title}
          </h1>

          <ShoppingListButton
            ingredients={recipe.ingredients}
            recipeName={recipe.title}
          />
        </div>

        <div className="flex flex-wrap gap-2 my-4">
          {recipe.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full dark:text-gray-400 dark:bg-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>

        {recipeAllergens.length > 0 && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-700 mb-2">
              🍽️ Dietary Awareness
            </h3>
            <p className="text-yellow-800 mb-2">
              This recipe contains ingredients that may trigger common allergies:
            </p>
            <ul className="list-disc pl-6 text-yellow-900">
              {recipeAllergens.map((allergen, index) => (
                <li key={index} className="font-medium">
                  {allergen}
                </li>
              ))}
            </ul>
            <p className="text-sm text-yellow-600 mt-2 italic">
              Always check ingredient labels and consult with guests about dietary restrictions.
            </p>
          </div>
        )}

        <p className="text-lg italic text-gray-600 mb-6">
          Discover how to make this delicious {recipe.title}.{" "}
          {recipe.description || "for any occasion"}.
        </p>
        {latest && (
          <p className="text-sm text-gray-500 mt-2">
            Last edited by {latest.username} on{" "}
            {new Date(latest.updatedAt).toLocaleDateString()}
          </p>
        )}

        {openTextArea ? (
          <div className="flex-1">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block p-2.5 w-[300px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Type here..."
            />
            <button
              onClick={handleUpdate}
              className="w-20 bg-green-400 rounded hover:bg-green-500 text-black font-bold m-2"
            >
              Submit
            </button>
            <button
              onClick={() => setOpenTextArea(false)}
              className="w-20 bg-red-400 rounded hover:bg-red-500 text-black font-bold m-2"
            >
              Close
            </button>
          </div>
        ) : (
          session && (
            <button
              onClick={() => setOpenTextArea(true)}
              className="w-12 mb-4 bg-blue-400 rounded hover:bg-blue-500 text-black font-bold"
            >
              Edit
            </button>
          )
        )}

        <div className="text-lg text-gray-800 space-y-2">
          <p className="dark:text-gray-400">
            <strong>Prep Time:</strong> {formatTime(recipe.prep || 0)}
          </p>
          <p className="dark:text-gray-400">
            <strong>Cook Time:</strong> {formatTime(recipe.cook || 0)}
          </p>
          <p className="dark:text-gray-400">
            <strong>Category:</strong> {recipe.category || "Uncategorized"}
          </p>
          <p className="dark:text-gray-400">
            <strong>Servings:</strong> {recipe.servings || "N/A"} servings
          </p>
          <p className="dark:text-gray-400">
            <strong>Published:</strong>{" "}
            {recipe.published
              ? new Date(recipe.published).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        <ul className="grid grid-cols-3 mt-10 border-b-2 dark:text-gray-400 text-gray-">
          {["ingredients", "instructions", "nutrition"].map((tab) => (
            <li
              key={tab}
              className={`text-gray-300 font-semibold text-base text-center py-3 cursor-pointer ${
                activeTab === tab ? "border-b-4 border-black" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          {activeTab === "ingredients" && (
            <ul className="list-disc list-inside">
              {Object.entries(recipe.ingredients || {}).map(([name, amount], i) => (
                <li key={i}>
                  <span className="capitalize">{name}</span>: {amount}
                </li>
              ))}
            </ul>
          )}
          {activeTab === "instructions" && (
            <InstructionReader instructions={recipe.instructions} />
          )}
          {activeTab === "nutrition" && (
            <ul>
              {Object.entries(recipe.nutrition || {}).map(([name, value], i) => (
                <li key={i}>
                  <strong>{name}</strong>: {value}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-8">
          <div className="dark:bg-gray-700">
            <RecipeReviews recipeId={id} reviewUpdateKey={reviewUpdateKey} />
          </div>

          {/* Add Review Form */}
          <div className="mt-6 dark:bg-gray-700 p-4 rounded-md">
            <AddReview recipeId={id} onAdd={handleReviewAdded} />
          </div>

          <RecipeTips recipe={recipe.ingredients} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailCard;
