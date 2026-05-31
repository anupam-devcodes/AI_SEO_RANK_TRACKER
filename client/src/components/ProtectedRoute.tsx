import { Navigate, Outlet } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function ProtectedRoute() {
  const { token, loading } = useApp();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}