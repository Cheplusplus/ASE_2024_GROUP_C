import connectToDatabase from "@/app/lib/connectMongoose";
import Review from "@/app/models/reviews";
import { NextResponse } from "next/server";
import { setCORSHeaders } from "@/app/lib/corsMiddleware";

/**
 * Handles POST requests to add a review for a recipe.
 *
 * @param {import('next/server').NextRequest} req - The request object containing the review details in the body.
 * @returns {Promise<import('next/server').NextResponse>} - The response object containing the created review or an error message.
 *
 * This function connects to the database, validates the request data, and creates a new review document.
 * If any required fields are missing, it returns a 400 error response.
 * If the review is successfully created, it returns the review document.
 * If there's an error during the process, it returns a 500 error response.
 */
export async function POST(req) {
  const res = new NextResponse();
  setCORSHeaders(res);

  // Handle OPTIONS preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  await connectToDatabase();

  try {
    const { recipeId, comment, rating, reviewerName } = await req.json();

    // Validate request data
    if (!comment || !rating) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create a new review document
    const newReview = new Review({ recipeId, comment, rating, reviewerName });
    const savedReview = await newReview.save();

    // Return success response
    return NextResponse.json(savedReview, { status: 201 });
  } catch (error) {
    console.error("Error saving review:", error);

    // Return error response
    return NextResponse.json(
      { error: "Failed to add review" },
      { status: 500 }
    );
  }
}

