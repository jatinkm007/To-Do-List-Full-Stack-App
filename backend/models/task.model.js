const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // simplified from array formatting
      trim: true
    },
    description: {
      type: String,
      trim: true,
      default: ""
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true // Automatically gives us createdAt and updatedAt
  }
);

module.exports = mongoose.model("Task", taskSchema);