import connectToDatabase from "@/app/lib/connectMongoose";
import Recipe from "@/app/models/Recipe";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDatabase();

    const recipes = await Recipe.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "recipeId",
          as: "reviews",
        },
      },
      {
        $addFields: {
          averageRating: { $avg: "$reviews.rating" },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
      {
        $limit: 10,
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
