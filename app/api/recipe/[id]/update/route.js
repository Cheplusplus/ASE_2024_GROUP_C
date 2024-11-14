// app/api/recipes/[id]/update.js

import connectToDatabase from "@/app/lib/connectMongoose";
import Recipe from "@/app/models/Recipe";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params; // Recipe ID from the URL
  const { description } = await req.json(); // New description from the request body

  await connectToDatabase();
  console.log('update desc')
  try {
    const result = await Recipe.findByIdAndUpdate(id, { description }, { new: true });

    if (result) {
      return NextResponse.json({ message: "Recipe updated successfully", recipe: result });
    } else {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
