import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

<<<<<<< HEAD
=======
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
>>>>>>> a90a2b080a3cc58cfa751cf04e994691e9ebd8ce
export default function AddReview({ recipeId, onAdd }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [pendingReview, setPendingReview] = useState(null); // For offline submission
  const { data: session } = useSession();
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      if (pendingReview) {
        retryPendingReview();
      }
    };
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [pendingReview]);

  // Function to submit a review
  const submitReview = async () => {
    if (!session) {
      setError("You must be logged in to submit a review.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    if (!comment || !rating) {
      setError("All fields are required.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    const reviewData = {
      recipeId,
      comment,
      rating,
      reviewerName: session.user.name,
    };

    if (isOffline) {
      setSuccess("Review saved locally. Will submit when online.");
      setPendingReview(reviewData);
      setComment("");
      setRating(0);
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch(`${url}/api/addReview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) throw new Error("Failed to submit review");

      setSuccess("Review submitted successfully!");
      setComment("");
      setRating(0);
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

  // Retry pending review when back online
  const retryPendingReview = async () => {
    if (!pendingReview) return;

    try {
      const response = await fetch(`${url}/api/addReview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pendingReview),
      });

      if (!response.ok) throw new Error("Failed to submit pending review");

      setSuccess("Pending review submitted successfully!");
      setPendingReview(null);
      onAdd();
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (error) {
      console.error("Error submitting pending review:", error);
      setError("Failed to submit pending review. Will retry when online.");
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-md shadow-md mt-6">
      <h2 className="text-lg font-bold mb-4">Add a Review</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      {isOffline && <p className="text-orange-500">You are offline. Reviews will be submitted when back online.</p>}

      <textarea
        placeholder="Your Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border p-2 rounded-md"
      />

      <div className="flex items-center space-x-2">
        <label className="font-semibold">Rating:</label>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="text-3xl"
            onClick={() => setRating(star)}
          >
            <span
              className={star <= rating ? "text-yellow-500" : "text-gray-400"}
            >
              ★
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={submitReview}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Submit Review
      </button>
    </div>
  );
}
