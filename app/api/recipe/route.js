// import connectToDatabase from "@/lib/connectMongoose";
// import Recipe from "@/models/Recipe";
// import { NextResponse } from "next/server";  

// // Helper function to normalize ingredient text
// const normalizeIngredient = (ingredient) => {
//   return ingredient
//     .toLowerCase()
//     .replace(/\d+(\.\d+)?/g, '') // Remove numbers
//     .replace(/\s*(cup|tbsp|tsp|oz|gram|kg|ml|g|lb|pound|ounce)s?\b/gi, '') // Remove measurements
//     .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // Remove punctuation
//     .replace(/\s+/g, ' ') // Normalize spaces
//     .trim();
// };

// export async function GET(req) {
//   try {
//     await connectToDatabase();
    
//     const { searchParams } = new URL(req.url);
//     const search = searchParams.get('search');
//     const category = searchParams.get('category');
//     const sort = searchParams.get('sort');
//     const ingredients = searchParams.get('ingredients');

//     let query = {};
    
//     // Handle text search
//     if (search) {
//       query.title = { $regex: search, $options: 'i' };
//     }

//     // Handle ingredient search
//     if (ingredients) {
//       const ingredientTerms = ingredients
//         .split(',')
//         .map(term => term.trim())
//         .filter(term => term.length > 0)
//         .map(normalizeIngredient);

//       if (ingredientTerms.length > 0) {
//         // Create a compound query for ingredients
//         query.ingredients = {
//           $all: ingredientTerms.map(term => ({
//             $elemMatch: {
//               $regex: term,
//               $options: 'i'
//             }
//           }))
//         };
//       }
//     }

//     // Handle category filter
//     if (category && category !== 'all') {
//       query.category = category;
//     }

//     // Define sort options
//     let sortOptions = {};
//     switch (sort) {
//       case 'prep_asc':
//         sortOptions.prepTime = 1;
//         break;
//       case 'prep_desc':
//         sortOptions.prepTime = -1;
//         break;
//       case 'cook_asc':
//         sortOptions.cookTime = 1;
//         break;
//       case 'cook_desc':
//         sortOptions.cookTime = -1;
//         break;
//       case 'steps_asc':
//         sortOptions['instructions.length'] = 1;
//         break;
//       case 'steps_desc':
//         sortOptions['instructions.length'] = -1;
//         break;
//       case 'newest':
//         sortOptions.createdAt = -1;
//         break;
//       case 'oldest':
//         sortOptions.createdAt = 1;
//         break;
//       default:
//         sortOptions.createdAt = -1; // Default sort by newest
//         break;
//     }

//     console.log('Query:', JSON.stringify(query, null, 2));
//     console.log('Sort:', JSON.stringify(sortOptions, null, 2));

//     // Execute the query with aggregation pipeline for better sorting of array lengths
//     let aggregationPipeline = [
//       { $match: query },
//       {
//         $addFields: {
//           instructionsCount: { $size: { $ifNull: ['$instructions', []] } }
//         }
//       }
//     ];

//     // Add sort stage
//     if (sort === 'steps_asc' || sort === 'steps_desc') {
//       aggregationPipeline.push({
//         $sort: {
//           instructionsCount: sort === 'steps_asc' ? 1 : -1
//         }
//       });
//     } else {
//       aggregationPipeline.push({ $sort: sortOptions });
//     }

//     // Add limit
//     aggregationPipeline.push({ $limit: 50 });

//     const recipes = await Recipe.aggregate(aggregationPipeline);
//     console.log(recipes[0])
//     return NextResponse.json({
//       success: true,
//       recipes,
//       metadata: {
//         total: recipes.length,
//         query: query,
//         sort: sortOptions
//       }
//     });

//   } catch (error) {
//     console.error("Error searching recipes:", error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         message: "Failed to search recipes.",
//         error: error.message 
//       },
//       { status: 500 }
//     );
//   }
// }

import connectToDatabase from "@/lib/connectMongoose";
import Recipe from "@/models/Recipe";
import { NextResponse } from "next/server";
/**
 * 
 * @param {searchParams} req - This will get
 * @returns 
 */

export async function GET(req) {
  try {
    await connectToDatabase();
    console.log('route')
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const skip = parseInt(searchParams.get('skip'), 10 ) || 0
    const limit = parseInt(searchParams.get('limit'), 10) || 50
    let query ={};
    const category = searchParams.get('category');
    const sort = searchParams.get('sortOption');
    const tags = searchParams.get('tags');
    const ingredients = searchParams.get('ingredients');
    const numSteps = parseInt(searchParams.get('numSteps'), 10); // Convert numSteps to integer
   console.log('1234f')
    

    // Build the query based on the search parameter
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Filter by category if provided
    if (category && category !== 'All Categories') {
      query.category = category;
    }

    // Filter by tags if provided
    if (tags && tags.length > 0) {
      query.tags = { $all: tags.split(',') }; // Matches all selected tags
    }

    // Filter by ingredients if provided
    if (ingredients && ingredients.length > 0) {
      const ingredientsArray = ingredients.split(','); // Assuming ingredients are comma-separated in the query
      query['$and'] = ingredientsArray.map(ingredient => ({
        [`ingredients.${ingredient}`]: { $exists: true }
      }));
    }

    // Filter by number of steps if provided
    if (numSteps) {
      query.instructions = { $size: numSteps };
    }

    // Define the sorting options based on the sort parameter
    let sortOptions = {};
    switch (sort) {
      case 'prep_asc':
        sortOptions.prep = 1;
        break;
      case 'prep_desc':
        sortOptions.prep = -1;
        break;
      case 'cook_asc':
        sortOptions.cook = 1;
        break;
      case 'cook_desc':
        sortOptions.cook = -1;
        break;
      case 'steps_asc':
        sortOptions.instructions = 1;
        break;
      case 'steps_desc':
        sortOptions.instructions = -1;
        break;
      case 'newest':
        sortOptions.createdAt = -1;
        break;
      case 'oldest':
        sortOptions.createdAt = 1;
        break;
      default:
        break;
    }
   console.log(query,'query')
    // Fetch recipes with the built query and sort options, limited to 50 results
    const recipes = await Recipe.find(query).sort(sortOptions).limit(limit).skip(skip);

   //console.log(recipes)
    // Get the count of recipes matching the search or category filter
    let count;
    if (search || (category && category !== 'All Categories' && category !== 'all')) {
      count = recipes.length;
    }

    return NextResponse.json({ success: true, recipes, count });

  } catch (error) {
    console.error("Error searching recipes:", error);
    return NextResponse.json(
      { success: false, message: "Failed to search recipes." },
      { status: 500 }
    );
  }
}

