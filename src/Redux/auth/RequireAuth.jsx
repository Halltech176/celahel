import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../actions";
import Loader from "../../components/Common/Loader";
import { NetworkError } from "../../components/Common/NetworkError";

const token = JSON.parse(window.localStorage.getItem("token"));
export const AgentAuth = ({ children }) => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.userprofile);
  useEffect(() => {
    dispatch(User());
  }, []);
  console.log(user, loading, error);
  console.log(user, loading, error);
  if (token !== null) {
    if (loading && !error && user === null) {
      return <Loader />;
    } else if (!loading) {
      if (error && user === null) {
        return <NetworkError />;
      } else if (!error && user?.status === "inactive") {
        return <Navigate to="/activate-agent" />;
      } else if ((!error && user?.type === "user") || user?.type === "super") {
        return <Navigate to="/auth-user" />;
      } else {
        return children;
      }
    } else if (!loading && !error && user !== null) {
      return children;
    }
  } else {
    return <Navigate to="/login" />;
  }

  console.log(token);
};

export const ContactAuth = ({ children }) => {
  if (token === null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};
