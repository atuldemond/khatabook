const mongoose = require("mongoose");
const connectionDB = async () => {
 
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB:', err.message));

};
module.exports = connectionDB;
const mongoose = require('mongoose');
