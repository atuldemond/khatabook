const express = require("express");
const { homePage, aboutPage, servicePage } = require("../controller/homePage");
const router = express.Router();

router.get("/", homePage);
router.get("/about", aboutPage);
router.get("/service", servicePage);

module.exports = router;
