const mongoose = require("mongoose");
const taskService = require("../services/task.service");

function validTaskId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

async function getTasks(req, res, next) {
  try {
    const search = cleanText(req.query.search);
    const tasks = await taskService.getAllTasks(search);

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks: tasks
    });
  } catch (error) {
    next(error);
  }
}

async function createTask(req, res, next) {
  try {
    const title = cleanText(req.body.title);
    const description = cleanText(req.body.description);

    if (title.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Title must contain at least 2 characters."
      });
    }

    const task = await taskService.createTask(title, description);

    res.status(201).json({
      success: true,
      message: "Task created successfully.",
      task: task
    });
  } catch (error) {
    next(error);
  }
}

async function updateTask(req, res, next) {
  try {
    const id = req.params.id;

    if (!validTaskId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task id format."
      });
    }

    const title = cleanText(req.body.title);
    const description = cleanText(req.body.description);

    if (title.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Title must contain at least 2 characters."
      });
    }

    const task = await taskService.updateTask(id, title, description);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found."
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      task: task
    });
  } catch (error) {
    next(error);
  }
}

async function updateTaskStatus(req, res, next) {
  try {
    const id = req.params.id;

    if (!validTaskId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task id format."
      });
    }

    if (typeof req.body.completed !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Completed must be true or false."
      });
    }

    const task = await taskService.updateStatus(id, req.body.completed);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found."
      });
    }

    res.status(200).json({
      success: true,
      message: "Task status updated successfully.",
      task: task
    });
  } catch (error) {
    next(error);
  }
}

async function deleteTask(req, res, next) {
  try {
    const id = req.params.id;

    if (!validTaskId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task id format."
      });
    }

    const task = await taskService.deleteTask(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found."
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully."
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask
};
