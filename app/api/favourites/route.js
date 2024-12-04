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



















