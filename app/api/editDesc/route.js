import connectToDatabase from "@/app/lib/connectMongoose";
import EditDesc from "@/app/models/editDesc";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDatabase();

  try {
    const { recipeId, username } = await req.json();

    // Upsert the document: update if it exists, create if it doesn't
    const updatedEdit = await EditDesc.findOneAndUpdate(
      { recipeId, username }, // Find document by recipeId and username
      { recipeId, username }, // Update these fields (if applicable)
      { new: true, upsert: true, setDefaultsOnInsert: true } // Create new if not found
    );

    // Return success response
    return NextResponse.json(updatedEdit, { status: 201 });
  } catch (error) {
    console.error("Error saving edit info:", error);

    // Return error response
    return NextResponse.json(
      { error: "Failed to save edit info" },
      { status: 500 }
    );
  }
}
