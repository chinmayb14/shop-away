import { Navigate, useLocation } from "react-router-dom";
import React from "react";
export const RequiresAuth = ({ children }) => {
  const location = useLocation();
  const item = localStorage.getItem("token");
  return item ? children : <Navigate to="/login" state={{ from: location }} />;
};
