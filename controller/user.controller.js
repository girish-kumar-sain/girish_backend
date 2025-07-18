import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        isSuccess: false,
        message: "All fields are required",
      });
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        isSuccess: false,
        message: "Invalid email",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        isSuccess: false,
        message: "Password must be at least 6 character",
      });
    }

    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      return res.status(400).json({
        isSuccess: false,
        message: "Email already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      isSuccess: true,
      message: "Account Created Successfully",
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      isSuccess: false,
      message: "failed to register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(400).json({
        isSuccess: false,
        message: "All fields are required",
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        isSuccess: false,
        message: "Incorrect email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        isSuccess: false,
        message: "Invalid Creadentials",
      });
    }

    const secretKey =
      process.env.SECRET_KEY || "fallback_secret_key_change_in_production";
    const token = await jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1d",
    });
    // Set the token as a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true if using HTTPS
      sameSite: "lax", // or "none" if using cross-site cookies with HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    return res.status(200).json({
      isSuccess: true,
      message: `Welcome back ${user.firstName}`,
      user,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      isSuccess: false,
      message: "failed to Login",
    });
  }
};

export const logout = async (_, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      isSuccess: true,
      message: "Logged out Successfully",
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const {
      firstName,
      lastName,
      occupation,
      bio,
      instagram,
      facebook,
      linkedin,
      github,
    } = req.body;
    const file = req.file;

    // const fileUri=getDataUri(file)

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        isSuccess: false,
        message: "User not found",
      });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (occupation) user.occupation = occupation;
    if (instagram) user.instagram = instagram;
    if (facebook) user.facebook = facebook;
    if (linkedin) user.linkedin = linkedin;
    if (github) user.github = github;
    if (bio) user.bio = bio;

    await user.save();
    return res.status(200).json({
      isSuccess: true,
      message: "profile update Succcessfully",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      isSuccess: false,
      message: "faild to update profile",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      isSuccess: true,
      message: "user list fetched successfully",
      total: users.length,
      users,
    });
  } catch (err) {
    console.error("Error fetching user list:", err);
    res.status(500).json({
      isSuccess: false,
      message: "failed to fetch users",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        isSuccess: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      isSuccess: true,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      isSuccess: false,
      message: "Failed to fetch profile",
    });
  }
};
