import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Notification from "./components/Notification";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/tasks");
      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await res.json();
      setTasks(data || []);
      setError(null);
    } catch (err) {
      console.error(err);
      showNotification("Failed to load tasks", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask }),
      });
      
      if (!res.ok) {
        throw new Error("Failed to add task");
      }
      
      setNewTask("");
      await fetchTasks();
      showNotification("Task added successfully", "success");
    } catch (err) {
      console.error(err);
      showNotification("Failed to add task", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete task");
      }

      await fetchTasks();
      showNotification("Task deleted successfully", "success");
    } catch (err) {
      console.error(err);
      showNotification("Failed to delete task", "error");
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  return (
    <div className="container">
      <header>
        <h1>Task Manager</h1>
        <p className="subtitle">Organize your tasks efficiently</p>
      </header>

      <main>
        <TaskForm 
          newTask={newTask}
          setNewTask={setNewTask}
          handleSubmit={handleSubmit}
        />

        {isLoading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList 
            tasks={tasks}
            onDelete={handleDelete}
          />
        )}
      </main>

      <footer>
        <p>Built with ❤️ using React and Go</p>
      </footer>

      <Notification 
        message={notification.message}
        type={notification.type}
      />
    </div>
  );
}

export default App; 