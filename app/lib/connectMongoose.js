// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";


if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = { serverApi: { version: "1" }, dbName: "devdb" }; // Specify dbName here

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export { clientPromise };
// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.


const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// Store separate cached connections for each database
let cachedConnections = {};

async function connectToDatabase(dbName = "devdb") {
  // Check if we already have a cached connection for the specified dbName
  if (cachedConnections[dbName]) {
    console.log(`Using cached MongoDB connection for database: ${dbName}`);
    return cachedConnections[dbName];
  }

  // Create a new connection for the specified dbName if not cached
  const newConnection = await mongoose
    .createConnection(MONGODB_URI, { dbName })
    .asPromise()
    .then((connection) => {
      console.log(`Connected to MongoDB database: ${dbName}`);
      return connection;
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
      throw error;
    });

  // Cache the new connection and return it
  cachedConnections[dbName] = newConnection;
  return newConnection;
}

export default connectToDatabase;

