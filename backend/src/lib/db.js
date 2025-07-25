import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${con.connection.host}`);
    } catch (error) {
        console.log("Error in connecting to mongoDB",error);
        process.exit(1); // 1 means failure 
    }
}