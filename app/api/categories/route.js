import connectToDatabase from '@/app/lib/connectMongoose';
// pages/api/categories.js
import { NextResponse } from 'next/server';
import Categories from "@/app/models/categories";

export async function GET() {
    // Connect to MongoDB
    await connectToDatabase();
    console.log('123concatea')
    try {
      console.log('123concate')
      // Fetch the categories document
      const categoryDoc = await Categories.findOne({});
      console.log('123concate2')
      if (!categoryDoc) {
        return NextResponse.json({ message: "Categories not found" }, { status: 404 });
      }
      //console.log(categoryDoc.categories)
      // Send back the categories array
      return NextResponse.json({ categories: categoryDoc.categories }, { status: 200 }, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  }