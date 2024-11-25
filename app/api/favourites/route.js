// app/api/favourites/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import Favourite from '../../models/Favourite';
import Recipe from '../../models/Recipe';
import User from '../../models/user';
import connectToDatabase from '@/app/lib/connectMongoose';

// Add a recipe to favourites
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { recipeId } = await req.json();
    if (!recipeId) {
      return NextResponse.json({ message: "Recipe ID is required" }, { status: 400 });
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
    }
    const existingFavourite = await Favourite.findOne({
      user: user._id,
      recipe: recipeId,
    });
    if (existingFavourite) {
      return NextResponse.json({ message: "Recipe already in favourites" }, { status: 400 });
    }

    const newFavourite = new Favourite({
      user: user._id,
      recipe: recipeId,
    });
    await newFavourite.save();


    const favouritesCount = await Favourite.countDocuments({ user: user._id });

    return NextResponse.json({
      message: "Recipe added to favourites",
      count: favouritesCount,
    }, { status: 201 });
  } catch (error) {
    console.error("Error adding favourite:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}


// Get user's favourites
export async function GET(req) {
  try {
    // Get the server-side session
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to database
    await connectToDatabase();

    // Find the user in the database
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Find favourites and populate recipe details
    const favourites = await Favourite.find({ user: user._id })
      .populate('recipe')
      .sort({ addedAt: -1 });

    // Get favourites count
    const favouritesCount = await Favourite.countDocuments({ user: user._id });

    return NextResponse.json({ 
      favourites: favourites.map(f => f.recipe),
      count: favouritesCount 
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching favourites:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// Remove a recipe from favourites
export async function DELETE(req) {
  try {
    // Get the server-side session
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to database
    await connectToDatabase();

    // Find the user in the database
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Parse the request body
    const { recipeId } = await req.json();

    // Remove the favourite
    const result = await Favourite.findOneAndDelete({ 
      user: user._id, 
      recipe: recipeId 
    });

    if (!result) {
      return NextResponse.json({ message: "Favourite not found" }, { status: 404 });
    }

    // Get the updated favourites count
    const favouritesCount = await Favourite.countDocuments({ user: user._id });

    return NextResponse.json({ 
      message: "Recipe removed from favourites", 
      count: favouritesCount 
    }, { status: 200 });

  } catch (error) {
    console.error("Error removing favourite:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}



















// // Get user's favourites with recipe details
// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     await connectToDatabase();
    
//     // Get user's ID from their email
//     const user = await User.findOne({ email: session.user.email });
//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     // Find all favourites for the user and populate recipe details
//     const favourites = await Favourite.find({ userId: user._id })
//       .populate('recipeId')
//       .sort({ addedAt: -1 });

//     // Transform the data to match the expected format
//     const recipes = favourites.map(fav => fav.recipeId);

//     return NextResponse.json({ favourites: recipes });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// // Add to favourites
// export async function POST(request) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const { recipeId } = await request.json();
//     await connectToDatabase();

//     // Get user's ID from their email
//     const user = await User.findOne({ email: session.user.email });
//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     // Verify recipe exists
//     const recipe = await Recipe.findById(recipeId);
//     if (!recipe) {
//       return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
//     }

//     // Create new favourite
//     await Favourite.create({
//       userId: user._id,
//       recipeId: recipe._id
//     });

//     // Get updated count for response
//     const count = await Favourite.getFavouritesCount(user._id);

//     return NextResponse.json({ message: 'Added to favourites', count });
//   } catch (error) {
//     // Handle duplicate key error gracefully
//     if (error.code === 11000) {
//       return NextResponse.json({ error: 'Recipe already in favourites' }, { status: 400 });
//     }
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// // Remove from favourites
// export async function DELETE(request) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const { recipeId } = await request.json();
//     await connectToDatabase();

//     // Get user's ID from their email
//     const user = await User.findOne({ email: session.user.email });
//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     // Remove the favourite
//     await Favourite.findOneAndDelete({ userId: user._id, recipeId });

//     // Get updated count for response
//     const count = await Favourite.getFavouritesCount(user._id);

//     return NextResponse.json({ message: 'Removed from favourites', count });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// // Get favourites count
// export async function HEAD() {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     await connectToDatabase();
    
//     // Get user's ID from their email
//     const user = await User.findOne({ email: session.user.email });
//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     const count = await Favourite.getFavouritesCount(user._id);
    
//     return NextResponse.json({}, {
//       headers: {
//         'X-Favourites-Count': count.toString()
//       }
//     });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }