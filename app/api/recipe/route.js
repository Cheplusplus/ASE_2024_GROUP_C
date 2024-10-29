import connectToDatabase from "@/lib/connectMongoose";
import Recipe from "@/models/Recipe";
import { NextResponse } from "next/server";  

// Helper function to normalize ingredient text
const normalizeIngredient = (ingredient) => {
  return ingredient
    .toLowerCase()
    .replace(/\d+(\.\d+)?/g, '') // Remove numbers
    .replace(/\s*(cup|tbsp|tsp|oz|gram|kg|ml|g|lb|pound|ounce)s?\b/gi, '') // Remove measurements
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // Remove punctuation
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
};

export async function GET(req) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');
    const ingredients = searchParams.get('ingredients');

    let query = {};
    
    // Handle text search
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Handle ingredient search
    if (ingredients) {
      const ingredientTerms = ingredients
        .split(',')
        .map(term => term.trim())
        .filter(term => term.length > 0)
        .map(normalizeIngredient);

      if (ingredientTerms.length > 0) {
        // Create a compound query for ingredients
        query.ingredients = {
          $all: ingredientTerms.map(term => ({
            $elemMatch: {
              $regex: term,
              $options: 'i'
            }
          }))
        };
      }
    }

    // Handle category filter
    if (category && category !== 'all') {
      query.category = category;
    }

    // Define sort options
    let sortOptions = {};
    switch (sort) {
      case 'prep_asc':
        sortOptions.prepTime = 1;
        break;
      case 'prep_desc':
        sortOptions.prepTime = -1;
        break;
      case 'cook_asc':
        sortOptions.cookTime = 1;
        break;
      case 'cook_desc':
        sortOptions.cookTime = -1;
        break;
      case 'steps_asc':
        sortOptions['instructions.length'] = 1;
        break;
      case 'steps_desc':
        sortOptions['instructions.length'] = -1;
        break;
      case 'newest':
        sortOptions.createdAt = -1;
        break;
      case 'oldest':
        sortOptions.createdAt = 1;
        break;
      default:
        sortOptions.createdAt = -1; // Default sort by newest
        break;
    }

    console.log('Query:', JSON.stringify(query, null, 2));
    console.log('Sort:', JSON.stringify(sortOptions, null, 2));

    // Execute the query with aggregation pipeline for better sorting of array lengths
    let aggregationPipeline = [
      { $match: query },
      {
        $addFields: {
          instructionsCount: { $size: { $ifNull: ['$instructions', []] } }
        }
      }
    ];

    // Add sort stage
    if (sort === 'steps_asc' || sort === 'steps_desc') {
      aggregationPipeline.push({
        $sort: {
          instructionsCount: sort === 'steps_asc' ? 1 : -1
        }
      });
    } else {
      aggregationPipeline.push({ $sort: sortOptions });
    }

    // Add limit
    aggregationPipeline.push({ $limit: 50 });

    const recipes = await Recipe.aggregate(aggregationPipeline);
    console.log(recipes[0])
    return NextResponse.json({
      success: true,
      recipes,
      metadata: {
        total: recipes.length,
        query: query,
        sort: sortOptions
      }
    });

  } catch (error) {
    console.error("Error searching recipes:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to search recipes.",
        error: error.message 
      },
      { status: 500 }
    );
  }
}