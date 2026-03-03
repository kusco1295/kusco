import React from 'react';

const CustomerPage = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Customer</h2>
      <p className="page-subtitle">Manage your customers here.</p>
      <div className="empty-state">
        <p>No customers found. Add your first customer to get started.</p>
      </div>
    </div>
  );
};

export default CustomerPage;
