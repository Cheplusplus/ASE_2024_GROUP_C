// app/api/favourites/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import Favourite from '../../models/Favourite';
import Recipe from '../../models/Recipe';
import User from '../../models/user';
import connectToDatabase from '@/app/lib/connectMongoose';

// Get user's favourites with recipe details
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    
    // Get user's ID from their email
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find all favourites for the user and populate recipe details
    const favourites = await Favourite.find({ userId: user._id })
      .populate('recipeId')
      .sort({ addedAt: -1 });

    // Transform the data to match the expected format
    const recipes = favourites.map(fav => fav.recipeId);

    return NextResponse.json({ favourites: recipes });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Add to favourites
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { recipeId } = await request.json();
    await connectToDatabase();

    // Get user's ID from their email
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify recipe exists
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    // Create new favourite
    await Favourite.create({
      userId: user._id,
      recipeId: recipe._id
    });

    // Get updated count for response
    const count = await Favourite.getFavouritesCount(user._id);

    return NextResponse.json({ message: 'Added to favourites', count });
  } catch (error) {
    // Handle duplicate key error gracefully
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Recipe already in favourites' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Remove from favourites
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { recipeId } = await request.json();
    await connectToDatabase();

    // Get user's ID from their email
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Remove the favourite
    await Favourite.findOneAndDelete({ userId: user._id, recipeId });

    // Get updated count for response
    const count = await Favourite.getFavouritesCount(user._id);

    return NextResponse.json({ message: 'Removed from favourites', count });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get favourites count
export async function HEAD() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    
    // Get user's ID from their email
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const count = await Favourite.getFavouritesCount(user._id);
    
    return NextResponse.json({}, {
      headers: {
        'X-Favourites-Count': count.toString()
      }
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}