import express from "express";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  createBlog,
  updateBlog,
  getAllBlogs,
} from "../controller/blog.controller.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createBlog).get(getAllBlogs);
router.route("/:blogId").put(isAuthenticated, updateBlog);
// router.route("/:blogId").patch()

export default router;
