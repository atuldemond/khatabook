const connectionDB = require("../config/mongoose");
const userModel = require("../models/userModel");
const generateToken = require("../utils/genrateToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.createUser = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    // Check if user with the same email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "You are already registered. Please login.",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with hashed password
    let user = await userModel.create({
      username,
      name,
      email,
      password: hashedPassword,
    });

    // Generate token using the utility function
    const token = generateToken({ email: user.email });

    // Set cookie
    res.cookie("token", token, {
      // httpOnly: true, // Removed httpOnly flag
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Remove password from user object before sending response
    user.password = undefined;

    res.status(201).json({
      success: true,
      message: "User Created",
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "User creation failed",
      error: error.message,
    });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken({ email });
    res.cookie("token", token, {
      // httpOnly: true, // Removed httpOnly flag
      secure: process.env.NODE_ENV === "production", // Only set secure flag in production
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      // sameSite: "none", // Ensures the cookie is sent in cross-site requests
    });

    // Remove password from user object before sending response
    // Remove sensitive information from user object
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userWithoutPassword,
      token: token, // Send token in the response
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred during login",
      error: err.message,
    });
  }
};
module.exports.logoutUser = (req, res) => {
  res.clearCookie("token", {
    // httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    domain: process.env.DOMAIN || undefined,
  });

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};
module.exports.getUserProfile = (req, res) => {
  console.log(req.user);
  res.status(200).send("we got your cookie and app dekh sakte ho profile");
};
