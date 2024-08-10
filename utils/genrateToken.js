const jwt = require("jsonwebtoken");

const genrateToken = (data) => {
  console.log(data);
  return jwt.sign(data, process.env.JWT_SECRET);
};

module.exports = genrateToken;
