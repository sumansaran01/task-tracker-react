import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Profile from './components/Profile';

const getStorageKey = (user) => user ? `tasks_${user.email.toLowerCase()}` : null;

export default function App() {
  const [filter, setFilter] = useState("pending");
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogin = (username, email) => {
    const newUser = { name: username, email };
    setUser(newUser);
    const key = getStorageKey(newUser);
    const savedTasks = localStorage.getItem(key);
    setTasks(savedTasks ? JSON.parse(savedTasks) : []);
  };

  const handleLogout = () => {
    setUser(null);
    setTasks([]);
  };

  const addTask = (text, deadline, notes) => {
    const newTask = {
      id: Date.now(),
      text,
      deadline,
      notes,
      completed: false
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    const key = getStorageKey(user);
    if (key) localStorage.setItem(key, JSON.stringify(updated));
  };

  const toggleComplete = (id) => {
    const updated = tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    const key = getStorageKey(user);
    if (key) localStorage.setItem(key, JSON.stringify(updated));
  };

  const deleteTask = (id) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    const key = getStorageKey(user);
    if (key) localStorage.setItem(key, JSON.stringify(updated));
  };

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <div className="app-container">
      <Profile user={user} onLogout={handleLogout} setFilter={setFilter} />
      <div className="task-area">
        <div className="task-header">
          <h2>Your Personal Task Tracker 🧠</h2>
          <button onClick={() => setDarkMode(!darkMode)} className="toggle-dark">
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        <TaskInput onAdd={addTask} />
        <TaskList
          tasks={tasks}
          onToggle={toggleComplete}
          onDelete={deleteTask}
          filter={filter}
        />
      </div>
    </div>
  );
} 