function TaskItem({ task, onDelete, onToggle }) {
  return (
    <div className="task-item">
      <div>
        <h3 className={task.completed ? "completed" : ""}>
          {task.title}
        </h3>

        <p>{task.description}</p>
      </div>

      <div className="task-actions">
        <button onClick={() => onToggle(task)}>
          {task.completed ? "Mark Pending" : "Mark Complete"}
        </button>

        <button onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;