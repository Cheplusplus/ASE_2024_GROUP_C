import connectToDatabase from "@/app/lib/connectMongoose";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/app/models/user";

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
  const connection = await connectToDatabase();

  // Define or retrieve the User model for the specified database
  const User1 =
    databaseName === "test"
      ? connection.models.User || connection.model("User", testUserSchema, "users")
      : connection.models.User || connection.model("User", devUserSchema, "users");

  try {
    // Find user by email in the specified database
    const user = await User1.findOne({ email: userEmail });
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
export async function PUT(req) {
  const url = new URL(req.url);
  const currentEmail = url.searchParams.get("email"); // Current email to identify the user
  const { name, email } = await req.json(); // Extract updated name and email from the body

  if (!currentEmail || (!name && !email)) {
    return NextResponse.json(
      { message: "Current email, and at least one field to update, are required" },
      { status: 400 }
    );
  }

  try {
    // Find user by current email and update their name and email
    const updatedUser = await User.findOneAndUpdate(
      { email: currentEmail }, // Match user by current email
      { ...(name && { name }), ...(email && { email }) }, // Update name and/or email if provided
      { new: true } // Return the updated user document
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    // Handle potential unique constraint errors on email
    if (error.code === 11000 && error.keyPattern.email) {
      return NextResponse.json(
        { message: "Email already in use by another user" },
        { status: 409 }
      );
    }

    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Error updating user data" },
      { status: 500 }
    );
  }
}
