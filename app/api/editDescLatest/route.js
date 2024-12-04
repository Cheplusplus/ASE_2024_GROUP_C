import connectToDatabase from "@/app/lib/connectMongoose";
import EditDesc from "@/app/models/editDesc";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectToDatabase();

  try {
    const recipeId = req.nextUrl.searchParams.get("recipeId"); // Extract recipeId from query params

    if (!recipeId) {
      return NextResponse.json(
        { error: "recipeId query parameter is required" },
        { status: 400 }
      );
    }

    // Find the latest document for the given recipeId
    const latestEdit = await EditDesc.findOne({ recipeId })
      .sort({ updatedAt: -1 }) // Sort by updatedAt in descending order
      .select("username updatedAt") // Only retrieve the username and updatedAt fields
      .exec();

    if (!latestEdit) {
      return NextResponse.json(
        { message: "No edits found for this recipe" },
        { status: 404 }
      );
    }

    // Return only the username and updatedAt
    return NextResponse.json(
      {
        username: latestEdit.username,
        updatedAt: latestEdit.updatedAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching the latest edit:", error);

    return NextResponse.json(
      { error: "Failed to fetch the latest edit" },
      { status: 500 }
    );
  }
}
