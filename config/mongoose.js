const mongoose = require("mongoose");
const connectionDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://atuldemond:3oXRQuxdtP8AnsNJ@khatabook.fvh9rot.mongodb.net/?retryWrites=true&w=majority&appName=khatabook"
    );
    console.log("Connected TO DB");
  } catch (error) {
    console.error("unable to connect to mongoose");
    process.exit(1);
  }
};
module.exports = connectionDB;
