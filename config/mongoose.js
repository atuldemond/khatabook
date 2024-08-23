const mongoose = require("mongoose");
const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Connected TO DB");
  } catch (error) {
    console.error("unable to connect to mongoose");
    process.exit(1);
  }
};
module.exports = connectionDB;
