import React from "react";
import { Navigate } from "react-router-dom";
// import { store } from "../../store/Store";
// import { initializeSockets } from "../../service/socketService";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const token = localStorage.getItem("token"); // or sessionStorage
    let token = false;
    const access = localStorage.getItem("ASSESS")
    if(access ==="Allow") {

      token = true
      //     if(localStorage.getItem("ASSESS")){
      //  initializeSockets(store)
      // console.log("initilizaSpocket")

    }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute
