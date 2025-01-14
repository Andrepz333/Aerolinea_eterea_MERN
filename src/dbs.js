import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";


export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed');
        process.exit(1);
    }
}
   