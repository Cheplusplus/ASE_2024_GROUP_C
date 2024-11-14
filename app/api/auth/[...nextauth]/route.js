import { clientPromise } from "@/app/lib/connectMongoose";
import connectToDatabase from "@/app/lib/connectMongoose";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import User from "@/app/models/user"; // Assuming this is your Mongoose user model

const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // Connect to the database and check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("No user found with this email");
        }
         console.log(user)
        // Verify the password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // If authentication is successful, return the user object
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name
        };
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      // Attach user ID to session
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
};

export const POST = NextAuth(authOptions);
export const GET = NextAuth(authOptions);
