const connectionDB = require("../config/mongoose");
const userModel = require("../models/userModel");
const generateToken = require("../utils/genrateToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.userData = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user._id)
      .select("posts email name");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user: {
        id: user._id, // Added user ID
        email: user.email,
        name: user.name,
        posts: user.posts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching user data",
      error: error.message,
    });
  }
};

module.exports.createPost = async (req, res) => {
  try {
    const { userId, title, description } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const newPost = {
      title,
      content: description,
    };

    user.posts.push(newPost);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the post",
      error: error.message,
    });
  }
};

module.exports.getUpdatePost = async (req, res) => {
  try {
    const { userId, postId, title, content } = req.body;

    // Check if the user exists and matches the logged-in user
    const user = await userModel.findById(userId);
    if (!user || user.email !== req.user.email) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: User not found or doesn't match logged-in user",
      });
    }

    // Find the post by ID and update it
    const postIndex = user.posts.findIndex(
      (post) => post._id.toString() === postId
    );
    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    user.posts[postIndex].title = title;
    user.posts[postIndex].content = content;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      updatedPost: user.posts[postIndex],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the post",
      error: error.message,
    });
  }
};

module.exports.deletepost = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    // Check if the user exists and matches the logged-in user
    const user = await userModel.findById(userId);
    if (!user || user.email !== req.user.email) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: User not found or doesn't match logged-in user",
      });
    }

    // Find the post by ID and remove it
    const postIndex = user.posts.findIndex(
      (post) => post._id.toString() === postId
    );
    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Remove the post from the array
    user.posts.splice(postIndex, 1);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the post",
      error: error.message,
    });
  }
};
