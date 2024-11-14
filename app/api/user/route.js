import connectToDatabase from "@/app/lib/connectMongoose";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Define user schemas for both databases
const testUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
  emailVerified: String,
});

const devUserSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
});

// Fetch user profile
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("user");
  const db = searchParams.get("db"); // specify 'test' or 'devdb' here

  // Determine which database to connect to
  const databaseName = db === "test" ? "test" : "devdb";
  const connection = await connectToDatabase(databaseName);

  // Define or retrieve the User model for the specified database
  const User =
    databaseName === "test"
      ? connection.models.User || connection.model("User", testUserSchema, "users")
      : connection.models.User || connection.model("User", devUserSchema, "users");

  try {
    // Find user by email in the specified database
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ message: "Error fetching user data" }, { status: 500 });
  }
}

// Update user profile
export async function POST(req) {
  await connectToDatabase();

  const { name, email, username } = await req.json();
  const url = new URL(req.url);
  const user = url.searchParams.get("id");
  const session = await getSession({ req });

  // Ensure the user is updating their own profile
  if (!session || session.user.id !== id) {
    return NextResponse.json(
      { message: "Forbidden: Cannot update another user's profile" },
      { status: 403 }
    );
  }

  try {
    const user1 = await User.findByIdAndUpdate(
      user,
      { name, email, username },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user1, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating user data" }, { status: 500 });
  }
}
