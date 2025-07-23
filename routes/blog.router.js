import express from "express";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  createBlog,
  updateBlog,
  getAllBlogs,
} from "../controller/blog.controller.js";

const router = express.Router();

// Logging middleware for POST /
// router.post(
//   "/",
//   (req, res, next) => {
//     console.log("POST /api/v1/blog route hit");
//     next();
//   },
//   isAuthenticated,
//   createBlog
// );
router.post("/create", createBlog);
router.get("/get", getAllBlogs);
router.route("/:blogId").put(isAuthenticated, updateBlog);
// router.route(":/blogId").patch()

export default router;
