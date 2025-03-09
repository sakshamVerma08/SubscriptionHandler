import mongoose from "mongoose";
import {DB_URI, NODE_ENV} from "../config/env.js";

if (!DB_URI) {
  throw new Error("Please define the mongodb url inside .env file");
}

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to DB in ${NODE_ENV} mode`)
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    process.exit({ code: 1 });
  }
};

export default connectToDB;
