import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
