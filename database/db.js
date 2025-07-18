import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected Successfuly");
  } catch (err) {
    console.log("MongoDB connection error", err.message);
  }
};

export default connectDB;
