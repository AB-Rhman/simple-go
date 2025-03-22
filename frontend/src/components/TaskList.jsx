import React from 'react';

const TaskList = ({ tasks, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="task-list-container">
        <div className="task-header">
          <h2>Your Tasks</h2>
          <span className="task-count">0 tasks</span>
        </div>
        <div className="empty-state">
          <p>No tasks yet. Add your first task above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <div className="task-header">
        <h2>Your Tasks</h2>
        <span className="task-count">
          {tasks.length} task{tasks.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <span>{task.title}</span>
            <button 
              onClick={() => onDelete(task.id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList; 