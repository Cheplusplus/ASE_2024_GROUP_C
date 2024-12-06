import connectToDatabase from '@/app/lib/connectMongoose';
// pages/api/categories.js
import { NextResponse } from 'next/server';
import Categories from "@/app/models/categories";

/**
 * GET /api/categories
 *
 * Fetches the list of categories from the database and returns it to the client.
 *
 * @returns {NextResponse} A JSON response containing the list of categories.
 * @throws {Error} If there is an error fetching the categories from the database.
 */
export async function GET() {
    // Connect to MongoDB
    await connectToDatabase();
    try {
      // Fetch the categories document
      const categoryDoc = await Categories.findOne({});
      if (!categoryDoc) {
        return NextResponse.json({ message: "Categories not found" }, { status: 404 },{
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
      // Send back the categories array
      return NextResponse.json({ categories: categoryDoc.categories }, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 },{
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  }