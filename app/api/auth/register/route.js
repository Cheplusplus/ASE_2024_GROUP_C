import { NextResponse } from 'next/server';
import User from '@/app/models/users';
import connectToDatabase from '@/app/lib/connectMongoose';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    
    await connectToDatabase();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create({
      email,
      password,
    });

    // Send verification email
    const verificationLink = `${process.env.NEXTAUTH_URL}/verify-email?email=${email}`;
    await transporter.sendMail({
      from: process.env.EMAIL_SERVER_USER,
      to: email,
      subject: 'Verify your email',
      html: `
        <h1>Welcome to Recipe Rush!</h1>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verificationLink}">Verify Email</a>
      `,
    });

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}