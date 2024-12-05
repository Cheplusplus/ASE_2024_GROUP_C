
import connectToDatabase from "@/app/lib/connectMongoose";
import Recipe from "@/app/models/Recipe";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';  // Add this line to handle dynamic rendering

/**
 * Handles GET requests to /api/recipe
 *
 * @param {import('next/server').NextApiRequest} req - The request object
 * @returns {import('next/server').NextApiResponse} - The response object
 *
 * This API endpoint returns a list of recipes matching the search query, category, tags, ingredients, and number of steps.
 * The response includes the count of matching recipes if a search query, category, tags, ingredients, or number of steps is provided.
 * The response is paginated, with a default limit of 50 recipes per page.
 * The response is sorted by the specified sort option, which can be one of the following:
 * - "prep_asc" (ascending by prep time)
 * - "prep_desc" (descending by prep time)
 * - "cook_asc" (ascending by cook time)
 * - "cook_desc" (descending by cook time)
 * - "steps_asc" (ascending by number of steps)
 * - "steps_desc" (descending by number of steps)
 * - "newest" (newest recipes first)
 * - "oldest" (oldest recipes first)
 * 
 * If the search parameter is provided, the query is built with a regex search on the title.
 * If the category parameter is provided, the query is filtered by category.
 * If the tags parameter is provided, the query is filtered by tags.
 * If the ingredients parameter is provided, the query is filtered by ingredients.
 * If the numSteps parameter is provided, the query is filtered by number of steps.
 * If the sortOption parameter is provided, the recipes are sorted accordingly.
 * 
 * The response returns a JSON object with the following properties:
 *   - success: a boolean indicating if the search was successful.
 *   - recipes: an array of recipe objects matching the search criteria.
 *   - count: the count of recipes matching the search criteria, only if the search parameter is provided.
 *   - message: an error message if the search failed.
 * 
 * @example
 * /api/recipe?search=chicken&category=Main+Course&tags=gluten-free&numSteps=5&sortOption=prep_asc
 */
export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const skip = parseInt(searchParams.get("skip"), 10) || 0;
    const limit = parseInt(searchParams.get("limit"), 10) || 50;
    let query = {};
    const category = searchParams.get("category");
    const sort = searchParams.get("sortOption");
    const tags = searchParams.get("tags");
    const ingredients = searchParams.get("ingredients");
    const numSteps = parseInt(searchParams.get("numSteps"), 10); // Convert numSteps to integer

    // Build the query based on the search parameter
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // Filter by category if provided
    if (category && category !== "All Categories") {
      query.category = category;
    }

    // Filter by tags if provided
    if (tags && tags.length > 0) {
      query.tags = { $all: tags.split(",") }; // Matches all selected tags
    }

    // Filter by ingredients if provided
    if (ingredients && ingredients.length > 0) {
      const ingredientsArray = ingredients.split(","); // Assuming ingredients are comma-separated in the query
      query["$and"] = ingredientsArray.map((ingredient) => ({
        [`ingredients.${ingredient}`]: { $exists: true },
      }));
    }

    // Filter by number of steps if provided
    if (numSteps) {
      query.instructions = { $size: numSteps };
    }

    // Define the sorting options based on the sort parameter
    let sortOptions = {};
    switch (sort) {
      case "prep_asc":
        sortOptions.prep = 1;
        break;
      case "prep_desc":
        sortOptions.prep = -1;
        break;
      case "cook_asc":
        sortOptions.cook = 1;
        break;
      case "cook_desc":
        sortOptions.cook = -1;
        break;
      case "steps_asc":
        sortOptions.instructions = 1;
        break;
      case "steps_desc":
        sortOptions.instructions = -1;
        break;
      case "newest":
        sortOptions.createdAt = -1;
        break;
      case "oldest":
        sortOptions.createdAt = 1;
        break;
      default:
        break;
    }
    // Fetch recipes with the built query and sort options, limited to 50 results
    const recipes = await Recipe.find(query)
      .sort(sortOptions)
      .limit(limit)
      .skip(skip)

   
   // Get the count of recipes matching the search or category filter
    let count;
    if (
      search ||
      (category && category !== "All Categories" && category !== "all")
    ) {
      count = recipes.length;
    }

    return NextResponse.json({ success: true, recipes, count }, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error("Error searching recipes:", error);
    return NextResponse.json(
      { success: false, message: "Failed to search recipes." },
      { status: 500 }
    );
  }
}



