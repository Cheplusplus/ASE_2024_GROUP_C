import connectToDatabase from "@/app/lib/connectMongoose";
import Recipe from "@/app/models/Recipe";
import { NextResponse } from "next/server";

/**
 * Handles GET requests to /api/10Recipes
 *
 * Returns the top 10 recipes by their average rating, along with their average rating and number of reviews.
 *
 * @returns {NextResponse} - A JSON response containing an array of recipe objects. Each recipe object contains the following properties:
 *   - averageRating: The average rating of the recipe, calculated as the mean of all the ratings in the reviews.
 *   - _id: The ID of the recipe.
 *   - title: The title of the recipe.
 *   - reviews: An array of review objects associated with the recipe.
 *     - rating: The rating of the review, an integer between 1 and 5.
 *     - comment: The comment associated with the review.
 *     - reviewerName: The name of the reviewer.
 *     - createdAt: The date and time the review was created.
 */
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
