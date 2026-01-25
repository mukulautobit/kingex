import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const token = localStorage.getItem("token"); // or sessionStorage
    let token = false;
    const access = localStorage.getItem("ASSESS")
    if(access ==="Allow") token = true

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
