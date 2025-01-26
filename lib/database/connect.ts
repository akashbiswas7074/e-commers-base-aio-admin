import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}
export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URL) throw new Error("Missing MONGODB_URL");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
<<<<<<< HEAD
      dbName: "e-com-aio",
=======
      dbName: "vibecart",
>>>>>>> 28d37c057b27d30a9479d13d5bba58c3984c68a6
      bufferCommands: false,
    });
  cached.conn = await cached.promise;
  return cached.conn;
};
