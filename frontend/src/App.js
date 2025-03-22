import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import "./styles.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/tasks");
      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await res.json();
      setTasks(data || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks. Please try again later.");
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask }),
      });
      
      if (!res.ok) {
        throw new Error("Failed to add task");
      }
      
      setNewTask("");
      await fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Failed to add task. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="App">
        <h1>Task Manager</h1>
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Task Manager</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
        />
        <button type="submit">Add Task</button>
      </form>
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;