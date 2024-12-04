// pages/api/auth/register.js
import bcrypt from "bcrypt";
import User from "@/app/models/user"; // Assuming your User model is here
import connectToDatabase from "@/app/lib/connectMongoose";
import { NextResponse } from "next/server";

/**
 * Handles the POST request to the /api/auth/register endpoint.
 *
 * Expects a JSON payload with the following structure:
 * {
 *   "email": string,
 *   "password": string,
 *   "name": string
 * }
 *
 * Checks if the email is already in use, hashes the password, creates a new
 * User document, and saves it to the database. Returns a 201 response with a
 * success message if the registration is successful, or a 400 response with an
 * error message if the email is already in use.
 */
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
   // console.log(existingUser)
    return NextResponse.json({ error: "Email already in use" }, { status: 400 });
  }
  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  //console.log(User.schema.paths);

  // Create and save the new user
  const newUser = new User({
    email,
    password: hashedPassword,
    name,
  });

  await newUser.validate(); // Check validation errors
  await newUser.save();
  // Return success response
  return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
}
