import connectToDatabase from "@/lib/connectMongoose";
import Recipe from "@/models/Recipe";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDatabase(); // Ensure the database is connected

    const { search, page = 1, limit = 10 } = req.nextUrl.searchParams; // Get query parameters
    let query = {};

    // Build the search query if the search parameter is provided
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { ingredients: { $regex: search, $options: "i" } }
        ]
      };
    }

    // Calculate pagination values
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const recipes = await Recipe.find(query).skip(skip).limit(parseInt(limit)); // Apply skip and limit for pagination

    // Get the total count for the query to calculate total pages
    const totalRecipes = await Recipe.countDocuments(query);
    const totalPages = Math.ceil(totalRecipes / limit);

    return NextResponse.json({
      success: true,
      recipes,
      pagination: {
        totalRecipes,
        currentPage: parseInt(page),
        totalPages,
        limit: parseInt(limit),
      }
    });
  } catch (error) {
    console.error("Error searching recipes:", error);
    return NextResponse.json(
      { success: false, message: "Failed to search recipes." },
      { status: 500 }
    );
  }
}
