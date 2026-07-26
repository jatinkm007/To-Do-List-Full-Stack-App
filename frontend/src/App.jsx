import { useEffect, useState } from "react";
import { fetchTasks, addTask, toggleTaskStatus, removeTask } from "./api/taskApi";

// Importing the previously unused components
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to grab tasks from the database
  async function loadTasks(searchValue = "") {
    try {
      setLoading(true);
      setError("");
      
      const data = await fetchTasks(searchValue);
      
      // Make sure we actually get an array back before setting state
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        setTasks([]);
      }
    } catch (err) {
      setError(err.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }

  // Load tasks once when the app first loads
  useEffect(() => {
    loadTasks();
  }, []);

  // Handle adding a task from the child TaskForm component
  async function handleAddTask(taskData) {
    try {
      setError("");
      setMessage("");
      
      await addTask(taskData);
      setMessage("Task added successfully!");
      
      // Refresh the list to show the new task
      loadTasks(searchText); 
    } catch (err) {
      setError(err.message);
    }
  }

  // Delete a task and refresh
  async function handleDelete(id) {
    try {
      setError("");
      setMessage("");
      
      await removeTask(id);
      setMessage("Task deleted.");
      loadTasks(searchText);
    } catch (err) {
      setError(err.message);
    }
  }

  // Flip the boolean for task completion
  async function handleStatusChange(task) {
    try {
      setError("");
      setMessage("");
      
      await toggleTaskStatus(task._id, !task.completed);
      loadTasks(searchText);
    } catch (err) {
      setError(err.message);
    }
  }

  // Trigger search fetch
  function handleSearch(e) {
    e.preventDefault();
    loadTasks(searchText);
  }

  // Reset search state and fetch all tasks
  function clearSearch() {
    setSearchText("");
    loadTasks("");
  }

  return (
    <div className="page">
      <div className="todo-box">
        <h1>To-Do List App</h1>
        <p className="sub-heading">
          React frontend connected with Express and MongoDB backend.
        </p>

        {/* Replaced hardcoded form with the custom TaskForm component */}
        <TaskForm onAddTask={handleAddTask} />

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search task"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit">Search</button>
          <button type="button" onClick={clearSearch}>
            Show All
          </button>
        </form>

        {/* UI Feedback messages */}
        {error && <p className="error-box">{error}</p>}
        {message && <p className="success-box">{message}</p>}
        {loading && <p className="loading">Loading tasks...</p>}

        {/* Replaced hardcoded list rendering with the custom TaskList component */}
        {!loading && (
          <TaskList 
            tasks={tasks} 
            onDelete={handleDelete} 
            onToggle={handleStatusChange} 
          />
        )}
      </div>
    </div>
  );
}

export default App;