import "colors"
import "dotenv/config";
import mongoose from "mongoose";

import { MONGO_URI } from "../constants/env-keys";

const mongodbConnection = MONGO_URI;
let isConnected = false;

export const connectDB = async() =>{
  if(isConnected) return;

  try{
    const connect = await mongoose.connect(mongodbConnection);
    isConnected = true;
    console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.underline);
  }
  catch(error){
    console.error("MongoDB connection error:", error);
    throw error;
  }
}