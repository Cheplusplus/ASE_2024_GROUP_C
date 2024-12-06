// app/api/recipes/[id]/update.js

import connectToDatabase from "@/app/lib/connectMongoose";
import Recipe from "@/app/models/Recipe";
import { NextResponse } from "next/server";

/**
 * Updates a recipe with the given ID.
 * @param {Object} req - The request object.
 * @param {Object} { params } - The URL parameters.
 * @param {String} params.id - The ID of the recipe to update.
 * @param {Object} req.body - The new description of the recipe.
 * @returns {Promise<NextResponse>} - The response object.
 * @throws {Error} - If there is an error updating the recipe.
 */
export async function PUT(req, { params }) {
  const { id } = params; // Recipe ID from the URL
  const { description } = await req.json(); // New description from the request body

  await connectToDatabase();
  try {
    const result = await Recipe.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    );

    if (result) {
      return NextResponse.json({
        message: "Recipe updated successfully",
        recipe: result,
      });
    } else {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
