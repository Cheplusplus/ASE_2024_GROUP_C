import { useState } from "react";
import { Star } from "lucide-react";

const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

const formatTotalTime = (recipe) => {
  const totalMinutes = (recipe.prepTime || 0) + (recipe.cookTime || 0);
  return formatTime(totalMinutes);
};

const StarRating = ({ rating, onChange, readOnly = false }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={20}
          className={`cursor-pointer ${index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          onClick={() => !readOnly && onChange(index + 1)}
        />
      ))}
    </div>
  );
};

const RecipeDetailCard = ({ recipe, updateRecipeReviews = () => {} }) => {
  const [activeTab, setActiveTab] = useState("ingredients");
  const [selectedImage, setSelectedImage] = useState(recipe.images?.[0] || "");
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
    reviewer: {
      firstName: "",
      lastName: ""
    }
  });
  const [reviews, setReviews] = useState(recipe.reviews || []);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingReviewIndex, setEditingReviewIndex] = useState(null); // Track the index of the review being edited
  const [activeSort, setActiveSort] = useState("dateAsc"); // Sorting state (by dateAsc, dateDesc, timeAsc, timeDesc)

  // Helper function to validate and fix invalid names
  const validateNames = (firstName, lastName) => {
    return {
      firstName: firstName.trim() || "Anonymous", // Use default if empty
      lastName: lastName.trim() || "User", // Use default if empty
    };
  };

  // Helper function to validate and fix invalid date
  const validateDate = (date) => {
    return date && !isNaN(new Date(date).getTime()) ? new Date(date) : new Date(); // Fallback to current date if invalid
  };

  // Sorting reviews logic
  const sortedReviews = [...reviews].sort((a, b) => {
    if (activeSort === "rating") {
      return b.rating - a.rating; // Sort by rating (highest first)
    }
    if (activeSort === "dateAsc") {
      return validateDate(a.date) - validateDate(b.date); // Sort by date (ascending)
    }
    if (activeSort === "dateDesc") {
      return validateDate(b.date) - validateDate(a.date); // Sort by date (descending)
    }
    if (activeSort === "timeAsc") {
      const timeA = (new Date(a.date).getMinutes() + new Date(a.date).getHours() * 60); // Convert to total minutes
      const timeB = (new Date(b.date).getMinutes() + new Date(b.date).getHours() * 60); // Convert to total minutes
      return timeA - timeB; // Sort by time (ascending)
    }
    if (activeSort === "timeDesc") {
      const timeA = (new Date(a.date).getMinutes() + new Date(a.date).getHours() * 60);
      const timeB = (new Date(b.date).getMinutes() + new Date(b.date).getHours() * 60);
      return timeB - timeA; // Sort by time (descending)
    }
    return 0; // Default (no sorting)
  });

  const handleReviewSubmit = () => {
    const { firstName, lastName } = newReview.reviewer;

    // Validate and fix names
    const { firstName: validFirstName, lastName: validLastName } = validateNames(firstName, lastName);

    // Validate the comment field (ensure it's not empty)
    if (!newReview.comment.trim()) {
      setErrorMessage("Please fill in all fields before submitting.");
      return;
    }

    const reviewToAdd = {
      ...newReview,
      reviewer: {
        firstName: validFirstName,
        lastName: validLastName,
      },
      date: new Date().toISOString(),
    };

    let updatedReviews = [...reviews];
    if (editingReviewIndex !== null) {
      updatedReviews[editingReviewIndex] = reviewToAdd;
      setEditingReviewIndex(null);
    } else {
      updatedReviews = [reviewToAdd, ...reviews];
    }

    setReviews(updatedReviews);
    updateRecipeReviews(updatedReviews);

    setNewReview({
      rating: 5,
      comment: "",
      reviewer: {
        firstName: "",
        lastName: ""
      }
    });
    setErrorMessage("");
  };

  const handleEditReview = (index) => {
    const reviewToEdit = reviews[index];
    setNewReview({
      rating: reviewToEdit.rating,
      comment: reviewToEdit.comment,
      reviewer: reviewToEdit.reviewer || { firstName: "", lastName: "" },
    });
    setEditingReviewIndex(index);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Section: Image and Thumbnails */}
      <div className="flex flex-col gap-4">
        <div className="w-full lg:sticky top-0">
          <img
            src={selectedImage}
            alt={recipe.title}
            className="w-full h-[400px] rounded-lg object-cover"
          />
        </div>
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {recipe.images?.map((image, index) => (
            <img
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
        <h1 className="text-3xl font-bold text-gray-800 mb-3">{recipe.title}</h1>
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

        <p className="text-lg italic text-gray-600 mb-6">
          {recipe.description || "Perfect for any occasion"}
        </p>

        {/* Recipe Info */}
        <div className="text-lg text-gray-800 space-y-2">
          <p><strong>Prep Time:</strong> {formatTime(recipe.prepTime || 0)}</p>
          <p><strong>Cook Time:</strong> {formatTime(recipe.cookTime || 0)}</p>
          <p><strong>Total Time:</strong> {formatTotalTime(recipe)}</p>
          <p><strong>Category:</strong> {recipe.category || "N/A"}</p>
          <p><strong>Servings:</strong> {recipe.servings || "N/A"} servings</p>
          <p><strong>Published:</strong> {recipe.published ? new Date(recipe.published).toLocaleDateString() : "N/A"}</p>
        </div>

        {/* Tabs */}
        <ul className="flex justify-between my-6 border-b-2">
          {["ingredients", "instructions", "nutrition", "reviews"].map((tab) => (
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
          {activeTab === "ingredients" && recipe.ingredients && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
              <ul className="list-disc pl-6 text-gray-700">
                {Object.entries(recipe.ingredients).map(([ingredient, quantity], index) => (
                  <li key={index}>
                    <strong>{ingredient}:</strong> {quantity}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === "instructions" && recipe.instructions && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
              <ol className="list-decimal pl-6 text-gray-700">
                {recipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          )}
          {activeTab === "nutrition" && recipe.nutrition && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Nutrition Information</h2>
              <ul className="text-gray-700">
                {Object.entries(recipe.nutrition).map(([key, value], index) => (
                  <li key={index}>
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === "reviews" && (
            <div>
              {/* Review Sort Control */}
              <div className="mb-4 flex items-center gap-3">
                <label htmlFor="sortReviews" className="text-sm font-medium">Sort by:</label>
                <select
                  id="sortReviews"
                  className="p-2 border rounded-md"
                  value={activeSort}
                  onChange={(e) => setActiveSort(e.target.value)}
                >
                  <option value="dateAsc">Date (Oldest First)</option>
                  <option value="dateDesc">Date (Newest First)</option>
                  <option value="timeAsc">Time (Shortest First)</option>
                  <option value="timeDesc">Time (Longest First)</option>
                  <option value="rating">Rating (Highest First)</option>
                </select>
              </div>

              {/* Add/Edit Review Form */}
              <h4 className="text-xl font-semibold mb-2">{editingReviewIndex === null ? "Write a review" : "Edit your review"}</h4>
              <StarRating
                rating={newReview.rating}
                onChange={(rating) => setNewReview({ ...newReview, rating })}
              />
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={newReview.reviewer.firstName}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      reviewer: { ...newReview.reviewer, firstName: e.target.value },
                    })
                  }
                  className="block w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={newReview.reviewer.lastName}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      reviewer: { ...newReview.reviewer, lastName: e.target.value },
                    })
                  }
                  className="block w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Write your review..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="block w-full p-2 border rounded-md"
                />
              </div>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <button
                onClick={handleReviewSubmit}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
              >
                {editingReviewIndex === null ? "Submit Review" : "Update Review"}
              </button>

              {/* Display Reviews */}
              {sortedReviews.length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                <div>
                  {sortedReviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-300 py-4">
                      <div className="flex items-center gap-2">
                        <StarRating rating={review.rating} readOnly />
                        <p className="text-sm text-gray-600">{new Date(review.date).toLocaleDateString()}</p>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                      <p className="font-semibold text-gray-800">
                        {review.reviewer?.firstName || "Anonymous"} {review.reviewer?.lastName || ""}
                      </p>
                      <button
                        onClick={() => handleEditReview(index)}
                        className="text-blue-500 text-sm mt-2"
                      >
                        Edit Review
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailCard;
