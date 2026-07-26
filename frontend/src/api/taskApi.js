import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error("VITE_API_URL is missing. Please check your .env file.");
}

// Set up axios instance. 
// Using just API_URL fixes the double-pathing bug assuming your .env has the full path.
const api = axios.create({
  baseURL: API_URL, 
  timeout: 10000
});

export async function fetchTasks(searchText = "") {
  try {
    // Get all tasks, pass search text if the user typed something
    const response = await api.get("", {
      params: searchText.trim() ? { search: searchText.trim() } : {}
    });
    return response.data.tasks;
  } catch (error) {
    // Simple error handling instead of the complex factory function
    throw new Error(error.response?.data?.message || "Failed to fetch tasks from the server.");
  }
}

export async function addTask(task) {
  try {
    const response = await api.post("", task);
    return response.data.task;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add new task.");
  }
}

export async function editTask(id, task) {
  try {
    const response = await api.put("/" + id, task);
    return response.data.task;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update task.");
  }
}

export async function toggleTaskStatus(id, completed) {
  try {
    // Update just the completed status
    const response = await api.patch("/" + id + "/status", {
      completed: completed
    });
    return response.data.task;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to change task status.");
  }
}

export async function removeTask(id) {
  try {
    await api.delete("/" + id);
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete task.");
  }
}