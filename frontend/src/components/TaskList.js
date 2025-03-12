import React from "react";

function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title}
          <button
            onClick={() => {
              fetch(`/tasks/${task.id}`, { method: "DELETE" })
                .then(() => window.location.reload())
                .catch((err) => console.error(err));
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;