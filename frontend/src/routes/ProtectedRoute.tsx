import { Navigate, Outlet } from 'react-router-dom';

import authStorage from '../features/auth/services/authStorage';

function ProtectedRoute() {
  const token = authStorage.getAccessToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
