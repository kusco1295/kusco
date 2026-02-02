import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { adminAPI } from '../services/adminAPI';
import { ROUTES } from '../constants/endpoints';
import '../styles/Dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { admin, logout, updateAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState(admin || null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const response = await adminAPI.getMe();
        const userData = response.data.data.admin;
        setAdminData(userData);
        updateAdmin(userData);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [updateAdmin]);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.ADMIN_LOGIN);
  };

  if (loading) {
    return <div className="dashboard-container"><p>Loading...</p></div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome, {adminData?.name}!</h2>
          <p className="admin-email">Email: {adminData?.email}</p>
          <p className="admin-role">Role: {adminData?.role}</p>
        </div>

        <div className="dashboard-stats">
          <h3>Dashboard Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Total Users</h4>
              <p className="stat-number">0</p>
            </div>
            <div className="stat-card">
              <h4>Total Orders</h4>
              <p className="stat-number">0</p>
            </div>
            <div className="stat-card">
              <h4>Revenue</h4>
              <p className="stat-number">$0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
