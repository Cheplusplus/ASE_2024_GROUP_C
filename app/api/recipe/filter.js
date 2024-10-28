import connectToDatabase from "@/lib/connectMongoose";
import Recipe from "@/models/Recipe";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDatabase();

    // Get all query parameters
    const { searchParams } = req.nextUrl;
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');
    const search = searchParams.get('search');

    // Build the query object
    let query = {};

    // Add category filter if not 'all'
    if (category && category !== 'all') {
      query.category = category;
    }

    // Add search filter if provided
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { ingredients: { $regex: search, $options: "i" } },
        { instructions: { $regex: search, $options: "i" } }
      ];
    }

    // Build sort object
    let sortQuery = {};
    switch (sort) {
      case 'prep_asc':
        sortQuery = { prepTime: 1 };
        break;
      case 'prep_desc':
        sortQuery = { prepTime: -1 };
        break;
      case 'cook_asc':
        sortQuery = { cookTime: 1 };
        break;
      case 'cook_desc':
        sortQuery = { cookTime: -1 };
        break;
      case 'steps_asc':
        // Sort by the length of the instructions array
        sortQuery = { 'instructions.length': 1 };
        break;
      case 'steps_desc':
        sortQuery = { 'instructions.length': -1 };
        break;
      case 'newest':
        sortQuery = { createdAt: -1 };
        break;
      case 'oldest':
        sortQuery = { createdAt: 1 };
        break;
      case 'name_asc':
        sortQuery = { name: 1 };
        break;
      case 'name_desc':
        sortQuery = { name: -1 };
        break;
      default:
        // Default sorting (you can modify this based on your needs)
        sortQuery = { createdAt: -1 };
    }

    // Execute the query with pagination
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 50;
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalRecipes = await Recipe.countDocuments(query);

    // Fetch recipes with all applied filters and sorting
    const recipes = await Recipe.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .lean() // Convert documents to plain objects for better performance
      .exec();

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalRecipes / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      success: true,
      recipes,
      pagination: {
        currentPage: page,
        totalPages,
        totalRecipes,
        hasNextPage,
        hasPrevPage,
        limit
      }
    });

  } catch (error) {
    console.error("Error filtering/sorting recipes:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to filter/sort recipes.",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// Helper function to validate and parse number inputs
function parseNumericParam(value, defaultValue) {
  const parsed = parseInt(value);
  return !isNaN(parsed) && parsed > 0 ? parsed : defaultValue;
}