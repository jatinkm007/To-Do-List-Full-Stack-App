import { useEffect, useState } from "react";
import {
  fetchTasks,
  addTask,
  editTask,
  toggleTaskStatus,
  removeTask
} from "./api/taskApi";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchText, setSearchText] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

async function loadTasks(searchValue = "") {
  try {
    setLoading(true);
    setError("");

    const data = await fetchTasks(searchValue);

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

  useEffect(function () {
    loadTasks();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setMessage("");

    if (title.trim().length < 2) {
      setError("Please enter a task title with at least 2 characters");
      return;
    }

    try {
      if (editingId) {
        await editTask(editingId, {
          title: title,
          description: description
        });

        setMessage("Task updated");
        setEditingId(null);
      } else {
        await addTask({
          title: title,
          description: description
        });

        setMessage("Task added");
      }

      setTitle("");
      setDescription("");
      loadTasks(searchText);
    } catch (err) {
      setError(err.message);
    }
  }

  function startEditing(task) {
    setEditingId(task._id);
    setTitle(task.title);
    setDescription(task.description || "");
    setMessage("");
    setError("");
  }

  async function handleDelete(id) {
    try {
      setError("");
      setMessage("");

      await removeTask(id);
      setMessage("Task deleted");
      loadTasks(searchText);
    } catch (err) {
      setError(err.message);
    }
  }

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

  function handleSearch(e) {
    e.preventDefault();
    loadTasks(searchText);
  }

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

        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={function (e) {
              setTitle(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Task description"
            value={description}
            onChange={function (e) {
              setDescription(e.target.value);
            }}
          />

          <button type="submit">
            {editingId ? "Update Task" : "Add Task"}
          </button>
        </form>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search task"
            value={searchText}
            onChange={function (e) {
              setSearchText(e.target.value);
            }}
          />

          <button type="submit">Search</button>
          <button type="button" onClick={clearSearch}>
            Show All
          </button>
        </form>

        {error && <p className="error-box">{error}</p>}
        {message && <p className="success-box">{message}</p>}
        {loading && <p className="loading">Loading tasks...</p>}

        {!loading && tasks.length === 0 && (
          <p className="empty-text">No tasks found</p>
        )}

        <div className="task-list">
          {tasks.map(function (task) {
            return (
              <div className="task-card" key={task._id}>
                <div>
                  <h3 className={task.completed ? "done" : ""}>
                    {task.title}
                  </h3>
                  <p>{task.description}</p>
                  <small>
                    Status: {task.completed ? "Completed" : "Pending"}
                  </small>
                </div>

                <div className="task-buttons">
                  <button onClick={() => handleStatusChange(task)}>
                    {task.completed ? "Pending" : "Complete"}
                  </button>

                  <button onClick={() => startEditing(task)}>
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;