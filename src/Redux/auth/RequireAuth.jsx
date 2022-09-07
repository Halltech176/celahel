import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Users } from "../actions";

export const AgentAuth = ({ children }) => {
  const token = JSON.parse(window.localStorage.getItem("token"));
  console.log(token);
  const candidate = useSelector((state) => state.candidate.user);

  if (!candidate === null && candidate.status === "inactive") {
    return <Navigate to="/about" />;
  }
  if (candidate === null || token === null) {
    return <Navigate to="/login" />;
  }
  if (candidate.status === "inactive" && candidate != undefined) {
    return <Navigate to="/activate-agent" />;
  }

  if (candidate.type !== "agent") {
    return <Navigate to="/auth-user" />;
  } else {
    return children;
  }
};
