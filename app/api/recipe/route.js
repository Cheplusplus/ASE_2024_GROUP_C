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

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const skip = parseInt(searchParams.get('skip'), 10 ) || 0
    const limit = parseInt(searchParams.get('limit'), 10) || 52
    let query ={};

    // Check if the search parameter is provided and build the query
    if (search) {
      query.$or = [
        { title:{$regex:search}},  //Assuming 'name' is a field in your Recipe model
        { ingredients:{$regex:search}} //Assuming 'ingredients' is another field
      ];
    }

    if(search){
      query.title = {$regex:search,$options: 'i'}
    };

    // Fetch recipes based on the search query
    const recipes = await Recipe.find(query).skip(skip).limit(limit); // Limit to 52 results
    return NextResponse.json({ success: true, recipes }); // Respond with recipes
  } catch (error) {
    console.error("Error searching recipes:", error);
    return NextResponse.json(
      { success: false, message: "Failed to search recipes." },
      { status: 500 } // Return a 500 status code
    );
  }
}
