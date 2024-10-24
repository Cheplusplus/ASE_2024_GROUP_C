import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
console.log(process.env.MONGODB_URI)
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'devdb',  // Ensures the correct database is used
      };

      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log('Connected to MongoDB:', mongoose.connection.db.databaseName); // This should log 'devdb'
        return mongoose;
      });
    }

    cached.conn = await cached.promise;
    return cached.conn;
  }


export default connectToDatabase;

