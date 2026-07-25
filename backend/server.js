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

async function startServer() {
  try {
    await connectDB();

    app.listen(port, function () {
      console.log("Server running on http://localhost:" + port);
    });
  } catch (error) {
    console.error("Server could not start:", error.message);
    process.exit(1);
  }
}

startServer();


// Keep local development working
if (process.env.NODE_ENV !== 'production') {
  app.listen(5000, () => console.log("Server running on port 5000"));
}

// Required for Vercel serverless deployment
module.exports = app;