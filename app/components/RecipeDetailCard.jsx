"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';  // Importing the star icon from Font Awesome

const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

const RecipeDetailCard = ({ recipe, id }) => {
  const [description, setDescription] = useState(recipe.description);
  const [activeTab, setActiveTab] = useState("ingredients");
  const [selectedImage, setSelectedImage] = useState(recipe.images?.[0]);
  const [userReview, setUserReview] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);  // For star hover effect
  const [savedReviews, setSavedReviews] = useState([]);

  const totalTime = (recipe.prep || 0) + (recipe.cook || 0);

  // Load saved reviews from localStorage when the component mounts
  useEffect(() => {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    
    setSavedReviews(reviews);
  }, []);

  // Save a new review
  const handleSaveReview = () => {
    if (!reviewerName || !userReview || !starRating) return; // Ensure all fields are filled

    const newReview = {
      name: reviewerName,
      rating: starRating,
      text: userReview,
      date: new Date().toLocaleDateString(),
    };
    const updatedReviews = [...savedReviews, newReview];
    setSavedReviews(updatedReviews);
    setReviewerName("");
    setUserReview("");
    setStarRating(0);

    // Save updated reviews in localStorage
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
  };

  return (
    <div className="grid items-start grid-cols-1 md:grid-cols-2 gap-6">
      <div className="w-full lg:sticky top-0 flex flex-col gap-3">
        <div className="w-full">
          <Image
            src={selectedImage || '/fallback-image.jpg'}
            alt={recipe.title || 'Recipe Image'}
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
          {recipe.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-lg italic text-gray-600 mb-6">
          Discover how to make this delicious {recipe.title}.{" "}
          {recipe.description || "for any occasion"}.
        </p>

        <div className="text-lg text-gray-800 space-y-2">
          <p><strong>Prep Time:</strong> {formatTime(recipe.prep || 0)}</p>
          <p><strong>Cook Time:</strong> {formatTime(recipe.cook || 0)}</p>
          <p><strong>Category:</strong> {recipe.category || "Uncategorized"}</p>
          <p><strong>Servings:</strong> {recipe.servings || "N/A"} servings</p>
          <p><strong>Published:</strong> {recipe.published ? new Date(recipe.published).toLocaleDateString() : "N/A"}</p>
        </div>

        <ul className="grid grid-cols-3 mt-10 border-b-2">
          {["ingredients", "instructions", "nutrition"].map((tab) => (
            <li
              key={tab}
              className={`text-gray-800 font-semibold text-base text-center py-3 cursor-pointer ${
                activeTab === tab ? "border-b-2 border-gray-800" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </li>
          ))}
        </ul>

        <div className="mt-6">
          {activeTab === "ingredients" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
              <ul className="list-disc pl-6 text-gray-700">
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
              <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
              <ul className="list-disc pl-6 text-gray-700">
                {recipe.instructions?.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === "nutrition" && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Nutrition Information</h3>
              <ul className="list-disc pl-6 text-gray-700">
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

        {/* Review Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">User Reviews</h3>
          <ul className="space-y-4 mb-4">
            {savedReviews.map((review, index) => (
              <li key={index} className="mb-2">
                <div className="flex items-center space-x-2">
                  <strong>{review.name}</strong>
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar key={i} color={i < review.rating ? "#ffc107" : "#e4e5e9"} />
                    ))}
                  </div>
                </div>
                <p>{review.text}</p>
                <span className="text-sm text-gray-500">({review.date})</span>
              </li>
            ))}
          </ul>

          <input
            type="text"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            placeholder="Your name"
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
          <div className="flex space-x-1 mb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                color={i < (hoverRating || starRating) ? "#ffc107" : "#e4e5e9"}
                onMouseEnter={() => setHoverRating(i + 1)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setStarRating(i + 1)}
                className="cursor-pointer"
              />
            ))}
          </div>
          <textarea
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
            placeholder="Write your review"
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          ></textarea>
          <button
            onClick={handleSaveReview}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailCard;