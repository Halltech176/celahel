import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../actions";
import Loader from "../../components/Common/Loader";
import { NetworkError } from "../../components/Common/NetworkError";

export const AgentAuth = ({ children }) => {
  const token = JSON.parse(window.localStorage.getItem("token"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(User());
  }, []);
  const { user, loading, error } = useSelector((state) => state.userprofile);

  console.log(user, loading, error);
  
  if (token === null) {
    return <Navigate to='/login'/>
  }

    else if(token !== null && !error && user?.status === 'inactive' && user?.emailVerified ) {
    return <Navigate to='/activate-agent'/>
  }
    else if(token !== null && !error && user?.type !== 'agent' && user?.emailVerified ) {
    return <Navigate to='/auth-user'/>
  }
      else if(token !== null && !error && user?.status === 'active' && !user?.emailVerified ) {
    return <Navigate to='/verify'/>
  }
  
  else {
    return children
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
