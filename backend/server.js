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

// Connect to the database
connectDB().then(() => {
  console.log("Database connection initialized.");
}).catch(error => {
  console.error("Database connection failed:", error.message);
});

// Keep local development working (runs ONLY once)
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => console.log("Server running on port " + port));
}

// Required for Vercel serverless deployment
module.exports = app;