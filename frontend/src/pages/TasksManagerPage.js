import React from 'react';

const TasksManagerPage = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Tasks Manager</h2>
      <p className="page-subtitle">Track and manage tasks here.</p>
      <div className="empty-state">
        <p>No tasks found. Create your first task to get started.</p>
      </div>
    </div>
  );
};

export default TasksManagerPage;
