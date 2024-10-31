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
    const limit = parseInt(searchParams.get('limit'), 10) || 50
    let query ={};


    if(search){
      query.title = {$regex:search,$options: 'i'}
    };

    // Fetch recipes based on the search query
    const recipes = await Recipe.find(query).skip(skip).limit(limit).lean();
    const total = await Recipe.countDocuments() // Limit to 52 results
    return NextResponse.json({ success: true, recipes , total}); // Respond with recipes
  } catch (error) {
    console.error("Error searching recipes:", error);
    return NextResponse.json(
      { success: false, message: "Failed to search recipes." },
      { status: 500 } // Return a 500 status code
    );
  }
}
