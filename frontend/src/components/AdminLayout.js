import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  MdDashboard,
  MdBusiness,
  MdPeople,
  MdAssignment,
  MdMessage,
  MdGroups,
  MdLogout,
  MdMenu,
  MdClose,
} from 'react-icons/md';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/endpoints';
import '../styles/Dashboard.css';

const navItems = [
  { label: 'Dashboard', icon: <MdDashboard />, path: ROUTES.ADMIN_DASHBOARD, end: true },
  { label: 'Department', icon: <MdBusiness />, path: ROUTES.ADMIN_DEPARTMENT },
  { label: 'Customer', icon: <MdPeople />, path: ROUTES.ADMIN_CUSTOMER },
  { label: 'Manage Tasks', icon: <MdAssignment />, path: ROUTES.ADMIN_TASKS },
  { label: 'Messages', icon: <MdMessage />, path: ROUTES.ADMIN_MESSAGES },
  { label: 'Teams', icon: <MdGroups />, path: ROUTES.ADMIN_TEAMS },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.ADMIN_LOGIN);
  };

  return (
    <div className="admin-layout">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <span className="brand-text">KUSCO Admin</span>
          <button
            className="sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
          >
            <MdClose />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `sidebar-link${isActive ? ' sidebar-link--active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-profile">
          <div className="sidebar-avatar">
            {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <div className="sidebar-profile-info">
            <span className="sidebar-profile-name">{admin?.name}</span>
            <span className="sidebar-profile-role">{admin?.role}</span>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="admin-main">
        <header className="admin-topbar">
          <button
            className="topbar-menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
            <MdMenu />
          </button>
          <span className="topbar-title">Admin Panel</span>
          <button className="topbar-logout-btn" onClick={handleLogout}>
            <MdLogout />
            <span>Logout</span>
          </button>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
