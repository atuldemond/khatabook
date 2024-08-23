const mongoose = require("mongoose");
const connectionDB = async () => {
 
mongoose.connect("mongodb+srv://atuldemond:3oXRQuxdtP8AnsNJ@khatabook.fvh9rot.mongodb.net/?retryWrites=true&w=majority&appName=khatabook")
.then(() => console.log('Connected to MongoDB, its will for gloabl'))
.catch(err => console.error('Failed to connect to MongoDB:', err.message));

};
module.exports = connectionDB;

