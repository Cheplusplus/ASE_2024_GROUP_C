import connectToDatabase from "../../../lib/connectMongoose";
import Recipe from "../../../models/Recipe";
import { NextResponse } from "next/server";

export async function GET(req) {
  console.log('cjsd csdcdsc')
  try {
    let db = await connectToDatabase();
    console.log('mdcakmdcma')
    const recipes = await Recipe.find({}).limit(50);
    //console.log(recipes)
    return NextResponse.json({ recipes });
  } catch (error) {
    console.error(error);
  }
}
