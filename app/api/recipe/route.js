import connectToDatabase from "@/lib/connectMongoose";
import Recipe from "@/models/Recipe";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDatabase(); // Ensure the database is connected
    console.log('123')
    const {searchParams} = new URL(req.url);
    console.log(searchParams)
    const search = searchParams.get('search'); // Get search, category, and sort parameters
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');
    let query = {};
    console.log(search)
    // Build the query based on the search parameter
    // if (search) {
    //   query.$or = [
    //     { title: { $regex: search} }, // Assuming 'name' is a field in your Recipe model
    //     { ingredients: { $regex: search} } // Assuming 'ingredients' is another field
    //   ];
    // }

    if(search){
      query.title =  { $regex: search,$options: 'i'} 
    }

    // Filter by category if provided
    if (category && category !== 'all') {
      query.category = category;
    }

    // Define the sorting options based on the sort parameter
    let sortOptions = {};
    switch (sort) {
      case 'prep_asc':
        sortOptions.prep = 1;
        break;
      case 'prep_desc':
        sortOptions.prep = -1;
        break;
      case 'cook_asc':
        sortOptions.cook = 1;
        break;
      case 'cook_desc':
        sortOptions.cook = -1;
        break;
      case 'steps_asc':
        sortOptions.instructions = 1; // Assuming 'instructions' is an array in your model
        break;
      case 'steps_desc':
        sortOptions.instructions = -1;
        break;
      case 'newest':
        sortOptions.createdAt = -1;
        break;
      case 'oldest':
        sortOptions.createdAt = 1;
        break;
      default:
        break;
    }

    // Fetch recipes with the built query and sort options, limited to 50 results
    const recipes = await Recipe.find(query).sort(sortOptions).limit(50); // Fixed variable name here
    return NextResponse.json({ success: true, recipes }); // Use 'recipes' here as well
  } catch (error) {
    console.error("Error searching recipes:", error);
    return NextResponse.json(
      { success: false, message: "Failed to search recipes." },
      { status: 500 } // Return a 500 status code
    );
  }
}
