import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../actions";
import Loader from "../../components/Common/Loader";
import { NetworkError } from "../../components/Common/NetworkError";

export const AgentAuth = ({ children }) => {
  const token = JSON.parse(window.localStorage.getItem("token"));
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.userprofile);
  useEffect(() => {
    dispatch(User());
  }, []);
  console.log(user, loading, error);
  console.log(token);
  if (token !== null) {
    if (user === null && !error && loading) {
      return <Loader />;
    }
    if (user.status === "inactive" && !error && !loading) {
      return <Navigate to="/activate-agent" />;
    }
    if (user.type !== "agent" && !error && !loading) {
      return <Navigate to="/auth-user" />;
    }
    if (!user.emailVerified && !error && !loading) {
      return <Navigate to="/verify" />;
    }
    if (user !== null && error && loading) {
      return <NetworkError />;
    } else {
      return children;
    }
  } else {
    return <Navigate to="/login" />;
  }

  console.log(token);
};

export const ContactAuth = ({ children }) => {
  const token = JSON.parse(window.localStorage.getItem("token"));
  if (token === null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};
