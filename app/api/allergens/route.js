import connectToDatabase from '@/app/lib/connectMongoose';
// pages/api/categories.js
import { NextResponse } from 'next/server';
import Allergens from '@/app/models/allergens';

export async function GET() {
    // Connect to MongoDB
    await connectToDatabase();
    try {
      // Fetch the allergens document
      const allergenDoc = await Allergens.findOne({});
      if (!allergenDoc) {
        return NextResponse.json({ message: "Allergens not found" }, { status: 404 },{
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
      // Send back the categories array
      return NextResponse.json({ allergens: allergenDoc.allergens }, {
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