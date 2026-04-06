
import mongoose from "mongoose";
import { config } from "../config/config.js";

async function connectDB(){
    try {
        await mongoose.connect(config.MONGODB_URI)
        console.log("database connected")
    } catch (error) {
        console.log("database not connected:", error)
    }
}

export default connectDB