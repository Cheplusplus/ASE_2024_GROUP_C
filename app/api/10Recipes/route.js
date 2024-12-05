import connectToDatabase from "@/app/lib/connectMongoose";
import Recipe from "@/app/models/Recipe";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDatabase();

    const recipes = await Recipe.aggregate([
      {
        $lookup: {
          from: "reviews", // Assuming the reviews collection
          localField: "_id",
          foreignField: "recipeId",
          as: "reviews",
        },
      },
      {
        $addFields: {
          comment: { $size: "$reviews" }, // Count the number of comments
        },
      },
      {
        $sort: { comment: -1 }, // Sort by number of comments, descending
      },
      {
        $limit: 10, // Limit to the top 10 recipes
      },
    ]);

    return NextResponse.json({ success: true, recipes });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch recipes." },
      { status: 500 }
    );
  }
}
