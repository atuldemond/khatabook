const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Simple length check
        return v.length >= 5;
      },
      message: (props) => `${props.value} is not valid`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Basic email validation
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: (props) => `${props.value} is not valid`,
    },
  },
  posts: [
    {
      // Assuming post schema here, replace with actual post schema details
      title: String,
      content: String,
      completed: {
        type: Boolean,
        default: false,
      },
      date: {
        type: Date,
        default: Date.now,
        get: function (date) {
          const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
          const day = String(date.getDate()).padStart(2, "0"); // Get day and add leading zero if necessary
          const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-based, so add 1) and add leading zero if necessary
          return `${year}-${day}-${month}`; // Format as YY-DD-MM
        },
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
