import { Blog } from "../models/blog.js";

export const createBlog = async (req, res) => {
  try {
    console.log("POST /api/v1/blog - Creating blog");
    console.log("Request body:", req.body);

    // Check if req.body exists
    if (!req.body) {
      console.log("No request body found");
      return res.status(400).json({
        isSuccess: false,
        message: "Request body is required",
      });
    }

    const { title, category, subtitle, description } = req.body;
    if (!title || !category) {
      return res.status(400).json({
        isSuccess: false,
        message: "Blog title and category is required",
      });
    }
    const blog = await Blog.create({
      title,
      category,
      subtitle,
      description,
      author: req.id,
    });
    return res.status(201).json({
      isSuccess: true,
      message: "Blog Created Successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      isSuccess: false,
      message: "failed to create blog",
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const { title, subtitle, description, category } = req.body;
    const file = req.file;

    let blog = await Blog.findById(blogId).populate("author");
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found!",
      });
    }

    const updateData = {
      title,
      subtitle,
      description,
      category,
      author: req.id,
    };
    blog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true });

    res.status(200).json({
      isSuccess: true,
      message: "Blog updated Successfully",
      blog,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      isSuccess: false,
      message: "Error updating blog",
    });
  }
};

// Fetch all blogs
export const getAllBlogs = async (req, res) => {
  try {
    console.log("GET /api/v1/blog - Fetching all blogs");
    const blogs = await Blog.find();
    console.log(`Found ${blogs.length} blogs`);
    res.status(200).json({
      isSuccess: true,
      blogs,
    });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({
      isSuccess: false,
      message: "Failed to fetch blogs",
    });
  }
};
