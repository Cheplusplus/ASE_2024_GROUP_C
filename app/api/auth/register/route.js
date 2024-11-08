// /app/api/auth/register/route.js
import bcrypt from "bcryptjs";
import connectToDatabase from "@/app/lib/connectMongoose";

export async function POST(req) {
  const { email, password } = await req.json();
  const client = await connectToDatabase();
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    email,
    password: hashedPassword,
  };
  
  await db.collection("users").insertOne(newUser);

  return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
}
