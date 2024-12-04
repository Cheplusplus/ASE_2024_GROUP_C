import connectToDatabase from "@/app/lib/connectMongoose";
import Review from "@/app/models/reviews";
import { NextResponse } from "next/server";

/**
 * Handles DELETE requests to remove a specific review.
 *
 * @param {import('next/server').NextRequest} req - The request object containing the review ID in the body.
 * @returns {Promise<import('next/server').NextResponse>} - The response object with a success message or an error message.
 *
 * This function connects to the database, validates the request data, and deletes the specified review.
 * If the review ID is missing, it returns a 400 error response.
 * If the deletion is successful, it returns a success message.
 * If there's an error during the process, it returns a 500 error response.
 */
export async function DELETE(req) {
  await connectToDatabase();

  try {
    const { id } = await req.json();

    // Validate
    if (!id) {
      return NextResponse.json(
        { error: "Review ID is required" },
        { status: 400 }
      );
    }

    // Delete the review
    await Review.findByIdAndDelete(id);

    return NextResponse.json({ message: "Review deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
