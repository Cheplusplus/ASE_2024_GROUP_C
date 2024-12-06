import { useState } from "react";
import { useSession } from "next-auth/react";

/**
 * Component for adding a review to a recipe.
 *
 * @param {Object} props
 * @param {string} props.recipeId - The ID of the recipe for which the review is being added.
 * @param {function} props.onAdd - Callback function to be called upon successful review submission.
 *
 * This component allows users to submit a review for a recipe, including a comment and a rating.
 * The user must be authenticated to submit a review. On successful submission, the input fields
 * are cleared and a success message is displayed. In case of an error, an error message is shown.
 */
export default function AddReview({ recipeId, onAdd }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { data: session } = useSession();
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  // Function to submit a review
  const submitReview = async () => {
    if (!session) {
      setError("You must be logged in to submit a review.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    try {
      setError("");
      setSuccess("");
      if (!comment || !rating) {
        setError("All fields are required.");
        setTimeout(() => {
          setError("");
        }, 2000);
        return;
      }

      const response = await fetch(`${url}/api/addReview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeId,
          comment,
          rating,
          reviewerName: session.user.name,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit review");

      setSuccess("Review submitted successfully!");

      setComment("");
      setRating(1);
      onAdd();
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("Failed to submit review. Please try again.");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 text-black dark:text-white rounded-md shadow-md mt-6">
      <h2 className="text-lg font-bold mb-4 text-black dark:text-gray-400">Add a Review</h2>
      {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
      {success && <p className="text-green-500 dark:text-green-400">{success}</p>}

      <textarea
        placeholder="Your Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border p-2 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
      />

      <div className="flex items-center space-x-2">
        <label className="font-semibold text-black dark:text-gray-400">Rating:</label>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="text-3xl"
            onClick={() => setRating(star)}
          >
            <span className={star <= rating ? "text-yellow-500" : "text-gray-400 dark:text-gray-600"}>
              ★
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={submitReview}
        className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-md mt-4 text-black dark:text-gray-400"
      >
        Submit Review
      </button>
    </div>
  );
}
