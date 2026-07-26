const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const connectDB = require("./config/db");
const taskRoutes = require("./routes/task.routes");

const app = express();
const port = process.env.PORT || 5000;

// Allow frontend to connect without complex Regex rules
app.use(cors()); 

// Parse incoming JSON data from requests
app.use(express.json());

// Simple test route to check if server is up
app.get("/", (req, res) => {
  res.status(200).json({ message: "Todo API is running fine." });
});

// Hook up the task routes
app.use("/api/tasks", taskRoutes);

// Basic 404 Catch-all for unknown routes (replaces the complex error middleware)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// Connect to DB first, then start listening
connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server running on port " + port);
  });
}).catch((err) => {
  console.log("Failed to connect to database:", err);
});