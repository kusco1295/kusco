import React from 'react';

const TeamsPage = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Teams</h2>
      <p className="page-subtitle">Manage your teams here.</p>
      <div className="empty-state">
        <p>No teams found. Create your first team to get started.</p>
      </div>
    </div>
  );
};

export default TeamsPage;
