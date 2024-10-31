import { connectToDatabaseCate } from "@/lib/connectToCategoriesDB";
// pages/api/categories.js
import { NextResponse } from 'next/server';
import Categories from "@/models/categories";

export async function GET() {
    // Connect to MongoDB
    await connectToDatabaseCate();
    console.log('123')
    try {
     // console.log('123concate')
      // Fetch the categories document
      const categoryDoc = await Categories.findOne({});
      
      if (!categoryDoc) {
        return NextResponse.json({ message: "Categories not found" }, { status: 404 });
      }
     // console.log(categoryDoc.categories)
      // Send back the categories array
      return NextResponse.json({ categories: categoryDoc.categories }, { status: 200 });
    } catch (error) {
      console.error("Error fetching categories:", error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  }