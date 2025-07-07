import React from 'react';

export default function Profile({ user, onLogout, setFilter }) {
  return (
    <div className="profile-sidebar">
      <div className="profile-avatar">{user.name?.charAt(0).toUpperCase()}</div>
      <h3>{user.name}</h3>
      <p className="profile-email">{user.email}</p>
      <div className="task-filters">
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("missed")}>Deadline Gone</button>
      </div>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}