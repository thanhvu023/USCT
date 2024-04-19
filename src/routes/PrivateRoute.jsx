import React, { useEffect } from "react";
import { Navigate, Routes } from "react-router-dom";

const PrivateRoute = (props) => {
  // if (props.userRole === "ROLE_CUSTOMER") {
  //   return <Navigate to="/" replace />;
  // }
  const { userRole } = props;
  console.log(userRole);
  if (!userRole) {
    return <Navigate to="/sign-in" />;
  }
  return <>{props.children}</>;
};

export default PrivateRoute;
