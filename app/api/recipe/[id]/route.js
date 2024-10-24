<<<<<<< HEAD
import connectToDatabase from "@/lib/connectMongoose";
import Recipe from "@/models/Recipe";
=======
import connectToDatabase from "../../../../lib/connectMongoose";
import Recipe from "../../../../models/Recipe";
>>>>>>> 6ba9c9d561279271507ca3a6ad94c3d498d55f2b
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
    const recipe = await Recipe.findOne({_id: id}).lean();
    console.log(recipe,'123456789df')
    return NextResponse.json({ recipe }, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
