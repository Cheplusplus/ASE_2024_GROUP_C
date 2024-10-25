import connectToDatabase from "@/lib/connectMongoose";
import Recipe from "@/models/Recipe";
import { NextResponse } from "next/server";
/**
 * 
 * @param {searchParams} req - This will get
 * @returns 
 */

export async function GET(req) {
  try {
    await connectToDatabase(); // Ensure the database is connected

    const { search } = req.nextUrl.searchParams; // Get the 'search' query parameter
    let query = {};

    // Check if the search parameter is provided and build the query
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } }, // Assuming 'name' is a field in your Recipe model
          { ingredients: { $regex: search, $options: "i" } } // Assuming 'ingredients' is another field
        ]
      };
    }

    // Fetch recipes based on the search query
    const recipes = await Recipe.find(query).limit(50); // Limit to 50 results
    return NextResponse.json({ success: true, recipes }); // Respond with recipes
  } catch (error) {
    console.error("Error searching recipes:", error);
    return NextResponse.json(
      { success: false, message: "Failed to search recipes." },
      { status: 500 } // Return a 500 status code
    );
  }
}
