import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, ...rest }) => {
  const { token } = useSelector((state) => state.auth);

  // Check if token is valid
  const isTokenValid = token !== null && token !== undefined;

  // If token is not valid, redirect to '/login'
  if (!isTokenValid) {
    return <Navigate to="/sign-in" />;
  }

  // If token is valid, render the passed child element
  return children ;
};

export default PrivateRoute;
