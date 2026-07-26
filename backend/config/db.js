const mongoose = require("mongoose");

async function connectDB() {
  try {
    // Attempt to connect to the database string in .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB is successfully connected!");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
    process.exit(1); // Stop the server if the database fails to connect
  }
}

module.exports = connectDB;