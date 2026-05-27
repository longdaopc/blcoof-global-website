import { Navigate } from 'react-router-dom';
import { authStore } from './store';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!authStore.isLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}
