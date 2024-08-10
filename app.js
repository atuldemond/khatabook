const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.port || 3000;
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const csrf = require("csurf");
const { body, validationResult } = require("express-validator");
const cors = require("cors");

const homeRoutes = require("./routes/homeRoutes");
const databaseRoutes = require("./routes/databaseRoutes");
const userRoutes = require("./routes/userRoutes");
const connectionDB = require("./config/mongoose");
const userModel = require("./models/userModel");

// Database connection
connectionDB();

// Security middlewares
app.use(helmet()); // Adds security-related headers

// CORS configuration
const corsOptions = {
  origin: "http://localhost:1234",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allow all methods
  credentials: true, // Allow cookies and authentication headers
};
app.use(cors(corsOptions));

// Session configuration

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CSRF protection
// const csrfProtection = csrf({ cookie: true });
// app.use(csrfProtection);

// Routes
app.use("/", homeRoutes);
app.use("/database", databaseRoutes);
app.use("/user", userRoutes);

// Input validation example
app.post(
  "/user",
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Handle the request if valid
  }
);

app.all("*", (req, res) => {
  res.status(404).send("You are on the wrong page");
});

app.listen(PORT, () => {
  console.log(`Server is running on port 3000 ${PORT}`);
});
