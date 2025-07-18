import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUrl =
      process.env.MONGO_URL || "mongodb://localhost:27017/blog_app";
    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected Successfully");
  } catch (err) {
    console.log("MongoDB connection error", err.message);
    console.log(
      "Please make sure MongoDB is running and create a .env file with MONGO_URL"
    );
  }
};

export default connectDB;
