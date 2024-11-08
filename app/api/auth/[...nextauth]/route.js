import { clientPromise } from "@/app/lib/connectMongoose";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import credentialsProvider from "next-auth/providers/credentials";



const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      credentialsProvider({

      })
    ],
    secret: process.env.NEXTAUTH_SECRET,
  };

export const POST = NextAuth(authOptions);
export const GET = NextAuth(authOptions);
