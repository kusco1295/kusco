import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import { ROUTES } from './constants/endpoints';

// Pages
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import AdminDashboard from './pages/AdminDashboard';

// Inner component that uses useAuth
const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Home Route */}
      <Route path={ROUTES.HOME} element={<Home />} />

      {/* Admin Routes */}
      <Route
        path={ROUTES.ADMIN_LOGIN}
        element={
          isAuthenticated ? (
            <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />
          ) : (
            <AdminLogin />
          )
        }
      />
      <Route
        path={ROUTES.ADMIN_SIGNUP}
        element={
          isAuthenticated ? (
            <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />
          ) : (
            <AdminSignup />
          )
        }
      />
      <Route
        path={ROUTES.ADMIN_DASHBOARD}
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
