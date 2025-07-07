import React from 'react';

export default function TaskList({ tasks, onToggle, onDelete, filter }) {
  const now = new Date();

  const tasksWithParsedDeadlines = tasks.map(task => {
    const deadlineDate = task.deadline instanceof Date ? task.deadline : new Date(task.deadline);
    const isOverdue = !task.completed && deadlineDate < now;
    return {
      ...task,
      deadline: deadlineDate,
      formattedDeadline: deadlineDate.toLocaleString(),
      isOverdue
    };
  });

  const filtered = tasksWithParsedDeadlines.filter(task => {
    if (filter === "completed") return task.completed && !task.isOverdue;
    if (filter === "pending") return !task.completed && !task.isOverdue;
    if (filter === "missed") return !task.completed && task.isOverdue;
    return true;
  });

  return (
    <div className="task-list">
      {filtered.length === 0 ? (
        <p className="no-tasks">No tasks to show.</p>
      ) : (
        <ul>
          {filtered.map(({ id, text, deadline, completed, notes, formattedDeadline, isOverdue }) => {
            const canComplete = !isOverdue;
            const handleToggle = () => {
              if (canComplete) onToggle(id);
            };
            return (
              <li
                key={id}
                className={`task-item ${completed ? 'done' : isOverdue ? 'overdue' : ''}`}
              >
                <div
                  className="task-info"
                  onClick={handleToggle}
                  title={canComplete ? "Click to mark complete" : "Deadline passed"}
                  style={{ cursor: canComplete ? 'pointer' : 'not-allowed' }}
                >
                  <div className="task-top">
                    <span className="task-title">{text}</span>
                    <small className="task-deadline">{formattedDeadline}</small>
                  </div>
                  {notes && <p className="task-notes">{notes}</p>}
                  <span className={`badge ${
                    completed ? 'badge-done' :
                    isOverdue ? 'badge-overdue' : 'badge-pending'
                  }`}>
                    {completed ? 'Completed' : isOverdue ? 'Deadline Gone' : 'Pending'}
                  </span>
                </div>
                <button onClick={() => onDelete(id)} title="Delete Task">🗑</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
