const express = require("express");
const router = express.Router();

const connectionDB = require("../config/mongoose");
require("dotenv").config();
const userModel = require("../models/userModel");
const {
  createUser,
  loginUser,
  logoutUser,
  getUserProfile,
} = require("../controller/databaseCont");
const protect = require("../middleware/protect");

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);

module.exports = router;
