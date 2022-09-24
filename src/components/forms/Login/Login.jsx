import React, { useState, useEffect } from "react";
import Loader from "../../Common/Loader";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import login from "./Login.module.css";
import { ToastContainer, Zoom } from "react-toastify";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../Common/ErrorToast";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { login as loggin, Users } from "../../../Redux/actions";
import axios from "axios";

import { userCredential } from "../../../Redux/slices/userStates";

const Login = () => {
  const [email, setEmail] = useState("devhalltech@gmail.com");
  const [password, setPassword] = useState("12345678");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);

  const handleLogin = async (e) => {
    // e.preventDefault();
    try {
      const requestdata = {
        password,
        username: email,
      };
      const { error, type, payload } = await dispatch(loggin(requestdata));

      if (type === "login/fulfilled") {
        window.localStorage.setItem(
          "token",
          JSON.stringify(payload.data.token)
        );
        // setTimeout(() => {
        navigate("/agent/properties");
        // }, 1000);

        SuccessNotification(payload.message);
        console.log(payload);
      }
      if (error?.message === "Network Error") {
        throw "Please check your internet connection";
      }
      if (error?.message === "Request failed with status code 401") {
        throw "Please enter valid email and password";
      }
    } catch (err) {
      console.log(err);
      if (err.message === "Network Error") {
        ErrorNotification("please check your internet connections");
      }

      ErrorNotification(err);
    }
  };

  const resetPassword = () => {
    navigate("/validateEmail");
  };

  return (
    <>
      {loginState.loading ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ToastContainer transition={Zoom} autoClose={800} />
          <div className="login my-5">
            <div className="container">
              <form
                id="form-container"
                className={`${login.login_container} row  g-3 mx-auto align-items-center justify-content-center`}
              >
                <div className="welcome text-left col-12 ">
                  <h4 className={`${login.heading_text}`}>Welcome back</h4>
                  <p className={`${login.welcome_text}`}>
                    Welcome back! Please enter your details
                  </p>
                </div>
                <div className="col-12">
                  <label htmlFor="" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className={`${login.verify} col-md-12`}>
                  <div className="checkbox ">
                    <label>Don't have an account?</label>
                    <a
                      htmlFor=""
                      onClick={() => navigate("/signin")}
                      className="forgot-password ms-1"
                    >
                      SignUp
                    </a>
                  </div>
                  <div className="forgot_password">
                    <label className="forgot-password" onClick={resetPassword}>
                      Forgotten Password
                    </label>
                  </div>
                </div>
                <div className="button_container col-md-12  text-center">
                  <button
                    type="submit"
                    onClick={handleLogin}
                    className={`${login.login_btn} w-100 btn btn-primary py-2 px-5`}
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Login;
