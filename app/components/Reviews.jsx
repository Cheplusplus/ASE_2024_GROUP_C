import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function RecipeReviews({ recipeId, reviewUpdateKey }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(0);
  const { data: session } = useSession();
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const response = await fetch(`${url}/api/getReviews?recipeId=${recipeId}`);
      if (!response.ok) throw new Error("Failed to fetch reviews");
      const data = await response.json();
      setReviews(data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a review
  const deleteReview = async (id) => {
    try {
      const response = await fetch(`${url}/api/deleteReview`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to delete review");
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  // Start editing a review
  const startEditReview = (review) => {
    setEditingReviewId(review._id);
    setEditComment(review.comment);
    setEditRating(review.rating);
  };

  // Submit edited review
  const submitEditReview = async () => {
    try {
      const response = await fetch(`${url}/api/editReview`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingReviewId, comment: editComment, rating: editRating }),
      });
      if (!response.ok) throw new Error("Failed to edit review");

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
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [recipeId, reviewUpdateKey]);

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4 text-black dark:text-gray-400">Reviews</h2>
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) =>
            editingReviewId === review._id ? (
              <div key={review._id} className="border-b pb-4 bg-white dark:bg-gray-700 p-4 rounded-md">
                <textarea
                  className="w-full border p-2 rounded-md mb-2 bg-white dark:bg-gray-700"
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
                  className="bg-gray-300 dark:bg-gray-600 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div
                key={review._id}
                className="border-b pb-4 text-black dark:text-gray-400 p-4 rounded-md"
              >
                <p className="font-semibold text-gray-500 dark:text-gray-300">{review.reviewerName}</p>
                <p className="text-yellow-500">{`★`.repeat(review.rating)}</p>
                <p className="text-gray-500 dark:text-gray-400">{review.comment}</p>
                {session?.user?.name === review.reviewerName && (
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
