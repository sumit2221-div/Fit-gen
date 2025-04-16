import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CheckAuth = ({ children }) => {
  // Access the auth state from Redux (adjust based on your actual state structure)
  const user = useSelector((state) => state.auth.user);

  // If no user is found, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user exists, render the protected component
  return children;
};

export default CheckAuth;
