import connectToDatabase from "@/app/lib/connectMongoose";
import Review from "@/app/models/reviews";
import { NextResponse } from "next/server";

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
