import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL is missing. Create frontend/.env from .env.example.");
}

const api = axios.create({
  // Dynamically append the endpoint path to the base URL
  baseURL: `${API_URL}/api/tasks`, 
  timeout: 10000
});

function createApiError(error) {
  if (!error.response) {
    const networkError = new Error(
      "Cannot connect to the server. Check that the backend is running and the API URL is correct."
    );
    networkError.type = "network";
    return networkError;
  }

  const apiError = new Error(
    error.response.data?.message || "The request could not be completed."
  );
  apiError.type = error.response.status === 400 ? "validation" : "server";
  apiError.status = error.response.status;
  return apiError;
}

export async function fetchTasks(searchText = "") {
  try {
    const response = await api.get("", {
      params: searchText.trim() ? { search: searchText.trim() } : {}
    });

    return response.data.tasks;
  } catch (error) {
    throw createApiError(error);
  }
}

export async function addTask(task) {
  try {
    const response = await api.post("", task);
    return response.data.task;
  } catch (error) {
    throw createApiError(error);
  }
}

export async function editTask(id, task) {
  try {
    const response = await api.put("/" + id, task);
    return response.data.task;
  } catch (error) {
    throw createApiError(error);
  }
}

export async function toggleTaskStatus(id, completed) {
  try {
    const response = await api.patch("/" + id + "/status", {
      completed: completed
    });

    return response.data.task;
  } catch (error) {
    throw createApiError(error);
  }
}

export async function removeTask(id) {
  try {
    await api.delete("/" + id);
  } catch (error) {
    throw createApiError(error);
  }
}
