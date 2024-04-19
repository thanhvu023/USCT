import React from "react";
import { Navigate, Routes } from "react-router-dom";

const ConsultantRoute = (props) => {
  // if (props.userRole === "ROLE_CUSTOMER") {
  //   return <Navigate to="/" replace />;
  // }
  const { userRole } = props;
  console.log(userRole);
  if (!userRole ) {
    return <Navigate to="/sign-in" />;
  }
  return <>{props.children}</>;
};

export default ConsultantRoute;
