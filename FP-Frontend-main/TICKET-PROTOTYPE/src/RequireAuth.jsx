import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Prevent user from accessing admin routes
  if (location.pathname.startsWith("/admin") && role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // (Optional) Prevent admin from accessing user-only routes
  if (!location.pathname.startsWith("/admin") && role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}