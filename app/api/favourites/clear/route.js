import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import Favourite from '../../../models/Favourite';
import User from '../../../models/user';
import connectToDatabase from '@/app/lib/connectMongoose';

// Clear all favourites for the logged-in user
export async function DELETE(req) {
  if (req.method === 'OPTIONS') {
    return NextResponse.json({}, { status: 200 });
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

    // Delete all favourites for the user
    await Favourite.deleteMany({ user: user._id });

    return NextResponse.json({ 
      message: "All favourites cleared", 
      count: 0 
    }, { status: 200 });
  } catch (error) {
    console.error("Error clearing favourites:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}