import { clientPromise } from "@/app/lib/connectMongoose";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import credentialsProvider from "next-auth/providers/credentials";



async function fetchUserByEmail(email) {
    const client = await connectToDatabase();
    const db = client.db();
    const user = await db.collection("users").findOne({ email });
    return user;
  }
  
  function validatePassword(user, inputPassword) {
    return bcrypt.compareSync(inputPassword, user.password);
  }

const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      credentialsProvider({
        name: 'Credentials',
        credentials: {
            email: {label: 'Email', type: 'email'},
            password: {label: 'Password', type: 'password'}
        },
        async authorize(credentials) {
            const { email, password } = credentials;
    
            // Fetch user from your MongoDB database
            const user = await fetchUserByEmail(email);
    
            if (user && validatePassword(user, password)) {
              // Return user object if credentials are valid
              return user;
            } else {
              // If no user or invalid password, return null
              return null;
            }
          }
      }),
      
    ],
    secret: process.env.NEXTAUTH_SECRET,
  };

export const POST = NextAuth(authOptions);
export const GET = NextAuth(authOptions);
