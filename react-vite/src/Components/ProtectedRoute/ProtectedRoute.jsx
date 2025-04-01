import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { checkUser } from "../Auth/AuthService";  // Import your checkUser method

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const navigate = useNavigate();

  // Check if the user is already logged in
  const isAuthenticated = checkUser();

  // If the user is not authenticated and tries to access a protected route, redirect them to login
  if (!isAuthenticated && rest.path !== "/login" && rest.path !== "/register") {
    return <Navigate to="/" replace />;
  }

  // If the user is authenticated and accessing a protected route, render the component
  return <Component />;
};

export default ProtectedRoute;
