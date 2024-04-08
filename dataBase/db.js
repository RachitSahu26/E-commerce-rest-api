import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToMongo = async () => {
  try {
    const mongoURI = process.env.MONGO_URL;
   
    mongoose.connect(mongoURI,);

    console.log("---***Database Connected Successfully***---");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};
