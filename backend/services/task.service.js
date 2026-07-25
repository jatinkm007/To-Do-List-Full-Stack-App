const Task = require("../models/task.model");

async function getAllTasks(search) {
  let filter = {};

  if (search) {
    filter = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ]
    };
  }

  return Task.find(filter).sort({ createdAt: -1 });
}

async function createTask(title, description) {
  const task = new Task({
    title: title,
    description: description
  });

  return task.save();
}

async function updateTask(id, title, description) {
  return Task.findByIdAndUpdate(
    id,
    { title: title, description: description },
    { new: true, runValidators: true }
  );
}

async function updateStatus(id, completed) {
  return Task.findByIdAndUpdate(
    id,
    { completed: completed },
    { new: true, runValidators: true }
  );
}

async function deleteTask(id) {
  return Task.findByIdAndDelete(id);
}

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  updateStatus,
  deleteTask
};
