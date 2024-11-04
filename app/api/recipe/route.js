import connectToDatabase from "@/app/lib/connectMongoose";
import Recipe from "@/app/models/Recipe";

export async function GET(req) {
  try {
    await connectToDatabase();
    console.log("Route accessed");

    const { query } = req;
    const search = query?.search;
    const skip = parseInt(query?.skip, 10) || 0;
    const limit = parseInt(query?.limit, 10) || 50;
    const category = query?.category;
    const sort = query?.sortOption;
    const tags = query?.tags;
    const ingredients = query?.ingredients;
    const numSteps = parseInt(query?.numSteps, 10);

    let queryFilter = {};

    if (search) {
      queryFilter.title = { $regex: search, $options: "i" };
    }

    if (category && category !== "All Categories") {
      queryFilter.category = category;
    }

    if (tags) {
      queryFilter.tags = { $all: tags.split(",") };
    }

    if (ingredients) {
      const ingredientsArray = ingredients.split(",");
      queryFilter["$and"] = ingredientsArray.map((ingredient) => ({
        [`ingredients.${ingredient}`]: { $exists: true },
      }));
    }

    if (numSteps) {
      queryFilter.instructions = { $size: numSteps };
    }

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

    console.log("Finding recipes...");
    const recipes = await Recipe.find(queryFilter)
      .sort(sortOptions)
      .limit(limit)
      .skip(skip);

    const count = recipes.length;
    console.log(recipes[0]);

    // Create a response with custom headers using the Response constructor
    return new Response(JSON.stringify({ success: true, recipes, count }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error searching recipes:", error);

    // Handle errors with a 500 status and custom response
    return new Response(
      JSON.stringify({ success: false, message: "Failed to search recipes." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
