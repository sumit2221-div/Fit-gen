import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CheckAuth = ({ children }) => {
  // Access the isAuthenticated state from Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // If the user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the protected component
  return children;
};

export default CheckAuth;
