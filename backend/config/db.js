import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const MONGO_URL = process.env.MONGO_URL;
    await mongoose.connect(MONGO_URL);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.log("❌ Error in DB connection:", error);
  }
};
