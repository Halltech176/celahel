import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Users } from "../Redux/actions";

export const AgentAuth = ({ children }) => {
  const candidate = useSelector((state) => state.candidate.user);

  if (!candidate === null && candidate.status === "inactive") {
    return <Navigate to="/about" />;
  }
  if (candidate === null) {
    return <Navigate to="/login" />;
  }
  if (candidate.status === 'inactive' && candidate != undefined) {
    return <Navigate to="/activate-agent" />;
  }
 
  if (candidate.type === "user") {
    return <Navigate to="/auth-user" />;
  } else {
    return children;
  }
};

export const AdminAuth = ({ children }) => {
  const dispatch = useDispatch();

};
