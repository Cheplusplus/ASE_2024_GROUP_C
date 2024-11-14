"use client"

import { useState, useEffect } from "react";
import Image from 'next/image';

const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

const RecipeDetailCard = ({ recipe, id }) => {
  const [description, setDescription] = useState(recipe.description);
  const [activeTab, setActiveTab] = useState("ingredients");
  const [selectedImage, setSelectedImage] = useState(recipe.images[0]);
  const [openTextArea, setOpenTextArea] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Update the document title when the component mounts or recipe changes
    document.title = `${recipe.title} | Recipe Details`;
  }, [recipe.title]);

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  console.log(openTextArea)
  const handleUpdate = async () => {
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    console.log('123')
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

      setOpenTextArea(false);
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while updating.");
      setOpenTextArea(false)
    }
  };
  
  return (
    <div className="grid items-start grid-cols-1 md:grid-cols-2 gap-6">
      <div className="w-full lg:sticky top-0 flex flex-col gap-3">
        <div className="w-full">
        <Image
          src={selectedImage}
          alt={recipe.title}
          width={540}
          height={403}
          className="rounded-lg object-cover"
        />
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {recipe.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              width={64}
              height={64}
              className={`rounded-md cursor-pointer object-cover ${
                selectedImage === image ? "border-2 border-gray-800" : ""
              }`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2 text-gray-800">{recipe.title}</h1>

        <div className="flex flex-wrap gap-2 my-4">
          {recipe.tags &&
            recipe.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
              >
                {tag}
              </span>
            ))}
        </div>

        <span className="text-lg italic text-gray-600 mb-6">
          {description || "any occasion"}
          <br/>
          {console.log(openTextArea,'false')}
         {openTextArea?
            <div className="flex-1">
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                className="block p-2.5 w-[300px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Type here..."
              />
              <button 
                onClick={()=>{handleUpdate();setOpenTextArea(false)}} 
                className='w-20 bg-green-400 rounded hover:bg-green-500 text-black font-bold m-2'
              >
                Submit
              </button>
              <button 
                onClick={()=>{setOpenTextArea(false)}} 
                className='w-20 bg-red-400 rounded hover:bg-red-500 text-black font-bold m-2'
              >
                Close
              </button>
            </div>
          :<button 
            onClick={()=>setOpenTextArea(true)} 
            className='w-12 mb-4 bg-blue-400 rounded hover:bg-blue-500 text-black font-bold'
          >
            Edit
          </button>}
        </span>

        <div className="text-lg text-gray-800 space-y-2">
          <p>
            <strong>Prep Time:</strong> {formatTime(recipe.prep)}
          </p>
          <p>
            <strong>Cook Time:</strong> {formatTime(recipe.cook)}
          </p>
          <p>
            <strong>Category:</strong> {recipe.category}
          </p>
          <p>
            <strong>Servings:</strong> {recipe.servings} servings
          </p>
          <p>
            <strong>Published:</strong>{" "}
            {new Date(recipe.published).toLocaleDateString()}
          </p>
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
                {Object.entries(recipe.ingredients).map(
                  ([ingredient, quantity], index) => (
                    <li key={index}>
                      {ingredient}: {quantity}
                    </li>
                  )
                )}
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
  );
};

export default RecipeDetailCard;