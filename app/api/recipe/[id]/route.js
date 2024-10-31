import connectToDatabase from "@/app/lib/connectMongoose";
import Recipe from "@/app/models/Recipe";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

/**
 *
 * @param {*} req
 * @param {id} param1 - This Will get the exact recipe id from database
 * @returns - The recipe object by its Id
 */

export async function GET(req, { params }) {
  try {
    let { id } = params;
    console.log(id)
    // id = new mongoose.Types.ObjectId();
    console.log(id)
    await connectToDatabase();
    const recipe = await Recipe.findOne({ _id: id });

    return NextResponse.json({ recipe }, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
