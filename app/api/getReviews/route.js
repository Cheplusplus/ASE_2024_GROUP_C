import connectToDatabase from "@/app/lib/connectMongoose";
import Review from "@/app/models/reviews";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectToDatabase();

  try {
    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const recipeId = searchParams.get("recipeId");

    // Validate that recipeId is provided
    if (!recipeId) {
      return NextResponse.json(
        { error: "recipeId query parameter is required" },
        { status: 400 }
      );
    }

    // Fetch reviews for the given recipeId
    const reviews = await Review.find({ recipeId });

    // Calculate statistics
    const calculateStats = (reviews) => {
      if (!reviews.length) {
        return { averageRating: 0, numberOfComments: 0 };
      }

      const numberOfComments = reviews.length;
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = Math.round(totalRating / numberOfComments);

      return { averageRating, numberOfComments };
    };

    const stats = calculateStats(reviews);

    // Set appropriate CORS headers
    const response = NextResponse.json({ reviews, stats }, { status: 200 });
    response.headers.set("Access-Control-Allow-Origin", "https://staging-ase-2024-group-c.vercel.app");
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
  } catch (error) {
    console.error("Error fetching reviews:", error);

    // Return error response
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  const response = NextResponse.json(null, { status: 204 });
  response.headers.set("Access-Control-Allow-Origin", "https://staging-ase-2024-group-c.vercel.app");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
