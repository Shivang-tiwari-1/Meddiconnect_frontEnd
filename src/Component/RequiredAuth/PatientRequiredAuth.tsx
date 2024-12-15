import React from "react";
import { useAppSelector } from "../../Redux/Store/Store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequiredAuthPatinet = ({ allowedRoles }) => {
  const { pat_accessToken, doc_accessToken, role } = useAppSelector(
    (state) => state.states
  );
  const location = useLocation();
  
  const accessToken = role === "patient" ? pat_accessToken : doc_accessToken;
  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RequiredAuthPatinet;
