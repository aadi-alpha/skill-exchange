import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const loggedUser = localStorage.getItem("loggedInUserSkillExchange");

  if (!loggedUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
