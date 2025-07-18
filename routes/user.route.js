import express from "express";
import {
  login,
  register,
  logout,
  updateProfile,
  getAllUsers,
  getProfile,
} from "../controller/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").put(isAuthenticated, updateProfile);
router.route("/profile").get(isAuthenticated, getProfile);
router.route("/all-users").get(getAllUsers);

export default router;
