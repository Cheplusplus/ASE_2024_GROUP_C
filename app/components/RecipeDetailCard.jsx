import { useState } from "react";
import { Star } from "lucide-react";

// Helper functions
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

  const handleReviewSubmit = () => {
    if (!newReview.reviewer.firstName || !newReview.reviewer.lastName || !newReview.comment) {
      setErrorMessage("Please fill in all fields before submitting.");
      return;
    }

    const reviewToAdd = {
      ...newReview,
      date: new Date().toISOString(),
    };

    let updatedReviews = [...reviews];
    if (editingReviewIndex !== null) {
      // If we are editing an existing review, replace the review at that index
      updatedReviews[editingReviewIndex] = reviewToAdd;
      setEditingReviewIndex(null); // Clear the editing state
    } else {
      // If it's a new review, add it
      updatedReviews = [reviewToAdd, ...reviews];
    }

    setReviews(updatedReviews); // Update local state for immediate render
    updateRecipeReviews(updatedReviews); // Callback to save changes outside if needed

    // Clear form after submission
    setNewReview({
      rating: 5,
      comment: "",
      reviewer: {
        firstName: "",
        lastName: ""
      }
    });
    setErrorMessage(""); // Clear error message if successful
  };

  const handleEditReview = (index) => {
    const reviewToEdit = reviews[index];
    setNewReview({
      rating: reviewToEdit.rating,
      comment: reviewToEdit.comment,
      reviewer: reviewToEdit.reviewer || { firstName: "", lastName: "" },
    });
    setEditingReviewIndex(index); // Set the index to track the review being edited
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
              className={`w-16 h-16 rounded-md cursor-pointer object-cover ${
                selectedImage === image ? "border-2 border-gray-800" : ""
              }`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>

      {/* Right Section: Recipe Details */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">{recipe.title}</h1>
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

        {/* Tabs Content */}
        <div className="mt-6">
          {activeTab === "ingredients" && recipe.ingredients && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
              <ul className="list-disc pl-6 text-gray-700">
                {Object.entries(recipe.ingredients).map(([ingredient, quantity], index) => (
                  <li key={index}>
                    {ingredient}: {quantity}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === "instructions" && recipe.instructions && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
              <ol className="list-decimal pl-6 text-gray-700 space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="pl-2">{instruction}</li>
                ))}
              </ol>
            </div>
          )}
          {activeTab === "nutrition" && recipe.nutrition && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Nutrition Information</h3>
              <ul className="list-disc pl-6 text-gray-700">
                {Object.entries(recipe.nutrition).map(([key, value], index) => (
                  <li key={index}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === "reviews" && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Reviews</h3>

              {/* Review Form */}
              <div className="mb-8">
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
                    placeholder="Your comment here..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    rows="4"
                    className="block w-full p-2 border rounded-md"
                  />
                </div>

                {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}

                <button
                  onClick={handleReviewSubmit}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
                >
                  {editingReviewIndex === null ? "Submit Review" : "Update Review"}
                </button>
              </div>

              {/* Display Reviews */}
              {reviews.length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                <div>
                  {reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-300 py-4">
                      <div className="flex items-center gap-2">
                        <StarRating rating={review.rating} readOnly />
                        <p className="text-sm text-gray-600">{review.date}</p>
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
