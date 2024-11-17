import { useState, useEffect } from "react";

export default function RecipeReviews({ recipeId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch reviews
  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?recipeId=${recipeId}`);
      if (!response.ok) throw new Error("Failed to fetch reviews");
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, [recipeId]);

  return (
    <div className="p-4 bg-gray-50 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">Reviews</h2>
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="border-b pb-4">
              <p className="font-semibold">{review.reviewerName}</p>
              <p className="text-yellow-500">{`⭐️`.repeat(review.rating)}</p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
