import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import Favourite from '../../../models/Favourite';
import Recipe from '../../../models/Recipe';
import User from '../../../models/user';
import connectToDatabase from '@/app/lib/connectMongoose';
import { setCORSHeaders } from '@/app/lib/corsMiddleware';

// Add a recipe to favourites
export async function POST(req) {
  const res = new NextResponse();
  setCORSHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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
  const res = new NextResponse();
  setCORSHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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

    const favourites = await Favourite.find({ user: user._id })
      .populate('recipe')
      .sort({ addedAt: -1 });

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
  const res = new NextResponse();
  setCORSHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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

    const result = await Favourite.findOneAndDelete({ 
      user: user._id, 
      recipe: recipeId 
    });

    if (!result) {
      return NextResponse.json({ message: "Favourite not found" }, { status: 404 });
    }

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


















