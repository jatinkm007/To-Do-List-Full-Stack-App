const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const taskRoutes = require("./routes/task.routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    // Make sure you add CLIENT_URL to your Render Environment Variables 
    // and set it to your deployed Vercel frontend URL
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);
app.use(express.json());

app.get("/", function (req, res) {
  res.status(200).json({ message: "Todo API is running." });
});

app.use("/api/tasks", taskRoutes);
app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

// Connect to the database and start the server
connectDB().then(() => {
  console.log("Database connection initialized.");
  
  // Render requires the app to listen on '0.0.0.0'
  app.listen(port, '0.0.0.0', () => {
    console.log("Server running on port " + port);
  });
}).catch(error => {
  console.error("Database connection failed:", error.message);
});