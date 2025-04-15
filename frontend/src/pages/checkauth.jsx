import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CheckAuth = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  
  return children;
};

export default CheckAuth;