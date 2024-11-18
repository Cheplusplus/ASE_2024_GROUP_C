import { useState } from "react";
import { useSession } from "next-auth/react";

export default function AddReview({ recipeId, onReviewAdded }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { data: session, status } = useSession();
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  // Function to submit a review
  const submitReview = async () => {
    try {
      setError("");
      setSuccess("");
      if (!comment || !rating ) {
        setError("All fields are required.");
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
          reviewerName: session.user.name
        }),
      });

      if (!response.ok) throw new Error("Failed to submit review");

      setSuccess("Review submitted successfully!");
      setComment("");
      setRating(0);
      setReviewerName("");
     // onReviewAdded(); // Refresh the reviews list
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-md shadow-md mt-6">
      <h2 className="text-lg font-bold mb-4">Add a Review</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div className="space-y-4">

        <textarea
          placeholder="Your Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border p-2 rounded-md"
        />

        <div className="flex items-center space-x-2">
          <label className="font-semibold">Rating:</label>
          <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="text-3xl"
          onClick={() => setRating(star)}
        >
          <span className={star <= rating ? "text-yellow-500" : "text-gray-400"}>
            ★
          </span>
        </button>
      ))}
          </div>
        </div>

        <button
          onClick={submitReview}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}
