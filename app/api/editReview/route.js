import connectToDatabase from "@/app/lib/connectMongoose";
import Review from "@/app/models/reviews";
import { NextResponse } from "next/server";

/**
 * Handles PATCH requests to update an existing review.
 *
 * @param {import('next/server').NextRequest} req - The request object containing the review details in the body.
 * @returns {Promise<import('next/server').NextResponse>} - The response object containing the updated review or an error message.
 *
 * This function connects to the database, validates the request data, and updates the specified review.
 * If any required fields are missing, it returns a 400 error response.
 * If the update is successful, it returns the updated review.
 * If there's an error during the process, it returns a 500 error response.
 */
export async function PATCH(req) {
  await connectToDatabase();

  try {
    const { id, comment, rating } = await req.json();

    // Validate
    if (!id || !comment || !rating) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Update the review
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { comment, rating },
      { new: true }
    );

    return NextResponse.json(updatedReview, { status: 200 });
  } catch (error) {
    console.error("Error editing review:", error);
    return NextResponse.json({ error: "Failed to edit review" }, { status: 500 });
  }
}
