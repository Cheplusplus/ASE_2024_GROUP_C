import connectToDatabase from "@/app/lib/connectMongoose";
import Review from "@/app/models/reviews";
import { NextResponse } from "next/server";

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
