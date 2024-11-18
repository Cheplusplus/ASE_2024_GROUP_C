import connectToDatabase from "@/app/lib/connectMongoose";
import Review from "@/app/models/reviews";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDatabase();

  try {
    const { recipeId, comment, rating, reviewerName } = await req.json();

    // Validate request data
    if ( !comment || !rating ) {
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
