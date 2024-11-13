import connectToDatabase from "@/app/lib/connectMongoose";
import User from "@/app/models/User";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

// Fetch user profile
export async function GET(req, { params }) {
  await connectToDatabase();

  const url = new URL(req.url);
  const {id} = params;
  console.log('slide123',id)
  const session = await getSession({ req });

  // If no session, return unauthorized
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching user data" }, { status: 500 });
  }
}

// Update user profile
export async function POST(req, { params }) {
  await connectToDatabase();

  const { name, email, username } = await req.json();
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const session = await getSession({ req });

  // Ensure the user is updating their own profile
  if (!session || session.user.id !== id) {
    return NextResponse.json(
      { message: "Forbidden: Cannot update another user's profile" },
      { status: 403 }
    );
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, username },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating user data" }, { status: 500 });
  }
}
