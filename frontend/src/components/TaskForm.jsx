import React from 'react';

const TaskForm = ({ newTask, setNewTask, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task..."
        className="task-input"
      />
      <button type="submit" className="button-primary">
        <span className="button-icon">+</span>
        Add Task
      </button>
    </form>
  );
};

export default TaskForm; 