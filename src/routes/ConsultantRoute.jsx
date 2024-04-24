import React from "react";
import { Navigate, Routes } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";

const ConsultantRoute = ({ children }) => {
  // if (props.userRole === "ROLE_CUSTOMER") {
  //   return <Navigate to="/" replace />;
  // }
  const token = useSelector((state) => state?.auth?.token);
  const userRole = token ? jwtDecode(token).Role : null;

  console.log(userRole);
  if (userRole === "ROLE_CONSULTANT") {
    return children;
  } else if (!token) {
    // Redirect to sign-in if user is not authenticated
    return <Navigate to="/sign-in" replace />;
  } else {
    // Redirect to home page for other authenticated users
    return <Navigate to="/" replace />;
  }
};

export default ConsultantRoute;
