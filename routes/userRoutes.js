const express = require("express");
const router = express.Router();
const {
  userData,
  createPost,
  getUpdatePost,
  deletepost,
} = require("../controller/userRoutes");
const protect = require("../middleware/protect");

router.get("/userdata", protect, userData);
router.post("/createpost", protect, createPost);
router.post("/getupdatepost", protect, getUpdatePost);
// router.post("/updatepost", updatePost);
// router.get("/viewpost", viewPost);
// router.get("/geteditpost", geteditPost);
// router.post("/editpost", editpost);
router.post("/deletepost", protect, deletepost);
module.exports = router;
