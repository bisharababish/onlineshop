import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAdminAuth();

  console.log("ProtectedRoute - Authentication status:", isAuthenticated);

  if (!isAuthenticated) {
    console.log("ProtectedRoute - Redirecting to login");
    return <Navigate to="/admin/login" replace />;
  }

  console.log("ProtectedRoute - Rendering protected content");
  return children;
};

export default ProtectedRoute;