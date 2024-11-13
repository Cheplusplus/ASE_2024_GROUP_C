// pages/api/auth/register.js
import bcrypt from "bcrypt";
import User from "@/app/models/user"; // Assuming your User model is here
import connectToDatabase from "@/app/lib/connectMongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDatabase();

  // Log to confirm request received
  console.log("signup123");

  // Parse JSON from the request body
  const { email, password, name } = await req.json();
  console.log(email, password, name);

  // Check if the email is already in use
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log(existingUser)
    return NextResponse.json({ error: "Email already in use" }, { status: 400 });
  }
 console.log(existingUser)
  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create and save the new user
  const newUser = new User({
    email,
    password: hashedPassword,
    name,
  });

  await newUser.save();

  // Return success response
  return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
}
