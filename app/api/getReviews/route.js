import connectToDatabase from "@/app/lib/connectMongoose";
import Review from "@/app/models/review";
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

    // Return reviews in response
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);

    // Return error response
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
