import connectToDatabase from "@/app/lib/connectMongoose";
import Review from "@/app/models/reviews";
import { NextResponse } from "next/server";
import { setCORSHeaders } from "@/app/lib/corsMiddleware";

export async function PATCH(req) {
  const res = new NextResponse();
  setCORSHeaders(res);

  // Handle OPTIONS preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  await connectToDatabase();

  try {
    const { id, comment, rating } = await req.json();

    // Validate request data
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

    // Return the updated review
    return NextResponse.json(updatedReview, { status: 200 });
  } catch (error) {
    console.error("Error editing review:", error);

    // Return error response
    return NextResponse.json(
      { error: "Failed to edit review" },
      { status: 500 }
    );
  }
}
