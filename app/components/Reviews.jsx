import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

<<<<<<< HEAD
export default function RecipeReviews({ recipeId, reviewUpdateKey }) {
=======

/**
 * RecipeReviews component displays and manages user reviews for a specific recipe.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.recipeId - The ID of the recipe whose reviews are displayed.
 * @param {string} props.reviewUpdateKey - Key to trigger re-fetching of reviews when changed.
 * @returns {ReactElement} A ReactElement representing the RecipeReviews component.
 *
 * This component fetches, displays, edits, and deletes reviews associated with a recipe.
 * Users who are authenticated and own a review can edit or delete their reviews.
 * The component manages loading state and error handling for fetching and updating reviews.
 */
export default function RecipeReviews({ recipeId,reviewUpdateKey}) {
>>>>>>> a90a2b080a3cc58cfa751cf04e994691e9ebd8ce
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(0);
  const [error, setError] = useState(null); // For user-friendly error messages
  const { data: session } = useSession();
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  // Fetch reviews
  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${url}/api/getReviews?recipeId=${recipeId}`);
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || "Failed to fetch reviews");
      }
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Failed to load reviews. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a review (authenticated user)
  const deleteReview = async (id) => {
    setError(null);
    try {
      const response = await fetch(`${url}/api/deleteReview`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || "Failed to delete review");
      }
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
      setError("Failed to delete review. Please try again later.");
    }
  };

  // Start editing a review
  const startEditReview = (review) => {
    setEditingReviewId(review._id);
    setEditComment(review.comment);
    setEditRating(review.rating);
  };

  // Submit edited review (authenticated user)
  const submitEditReview = async () => {
    setError(null);
    try {
      const response = await fetch(`${url}/api/editReview`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingReviewId,
          comment: editComment,
          rating: editRating,
        }),
      });
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || "Failed to edit review");
      }
      const updatedReview = await response.json();
      setReviews(
        reviews.map((review) =>
          review._id === updatedReview._id ? updatedReview : review
        )
      );
      setEditingReviewId(null);
      setEditComment("");
      setEditRating(0);
    } catch (error) {
      console.error("Error editing review:", error);
      setError("Failed to submit your changes. Please try again.");
    }
  };

  // Fetch reviews on component mount or when dependencies change
  useEffect(() => {
    fetchReviews();
  }, [recipeId, reviewUpdateKey]);

  return (
    <div className="p-4 bg-gray-50 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">Reviews</h2>
      {error && <p className="text-red-500">{error}</p>} {/* Error display */}
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) =>
            editingReviewId === review._id ? (
              <div key={review._id} className="border-b pb-4">
                <textarea
                  className="w-full border p-2 rounded-md mb-2"
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                />
                <div className="flex space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEditRating(star)}
                    >
                      <span
                        className={
                          star <= editRating
                            ? "text-yellow-500 text-2xl"
                            : "text-gray-400 text-2xl"
                        }
                      >
                        ★
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={submitEditReview}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingReviewId(null)}
                  className="bg-gray-300 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div key={review._id} className="border-b pb-4">
                <p className="font-semibold">{review.reviewerName}</p>
                <p className="text-yellow-500">{`★`.repeat(review.rating)}</p>
                <p>{review.comment}</p>
                {session?.user?.name === review.reviewerName && ( // Check ownership
                  <div className="flex space-x-4 mt-2">
                    <button
                      onClick={() => startEditReview(review)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteReview(review._id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
