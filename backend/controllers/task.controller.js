const Task = require("../models/task.model");

// Get all tasks from database
async function getTasks(req, res) {
  try {
    const search = req.query.search;
    let filter = {};

    // If user typed in the search box, look in title or description
    if (search) {
      filter = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } }
        ]
      };
    }

    // Fetch tasks and sort newest first
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    
    // Return standard JSON matching the frontend expectation
    res.status(200).json({ tasks: tasks });
  } catch (error) {
    console.log("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error while getting tasks." });
  }
}

// Add a new task
async function createTask(req, res) {
  try {
    const { title, description } = req.body;

    // Basic human-readable validation
    if (!title || title.length < 2) {
      return res.status(400).json({ message: "Title must be at least 2 characters long." });
    }

    const newTask = await Task.create({
      title: title,
      description: description || "" // default to empty string if undefined
    });

    res.status(201).json({ task: newTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not create the task." });
  }
}

// Edit a task's title and description
async function updateTask(req, res) {
  try {
    const taskId = req.params.id;
    const { title, description } = req.body;

    if (!title || title.length < 2) {
      return res.status(400).json({ message: "Title must be at least 2 characters long." });
    }

    // findByIdAndUpdate is much simpler for beginners to use
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title: title, description: description },
      { new: true } // This tells Mongoose to return the updated object, not the old one
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json({ task: updatedTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating the task." });
  }
}

// Flip the completed status
async function updateTaskStatus(req, res) {
  try {
    const taskId = req.params.id;
    
    // We only care about the completed boolean here
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { completed: req.body.completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json({ task: updatedTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating task status." });
  }
}

// Delete task from DB
async function deleteTask(req, res) {
  try {
    const taskId = req.params.id;
    
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json({ message: "Task successfully deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting task." });
  }
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask
};