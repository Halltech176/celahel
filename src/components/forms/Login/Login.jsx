import React, { useState, useEffect } from "react";
import Loader from "../../Common/Loader";
import { useNavigate } from "react-router-dom";
import login from "./Login.module.css";
import { ToastContainer, Zoom } from "react-toastify";
import { ErrorNotification } from "../../Common/ErrorToast";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { login as loggin } from "../../../Redux/actions";
import {
  Properties as AllProperties,
  Users,
  Notification,
} from "../../../Redux/actions";
import { userCredential } from "../../../Redux/slices/userStates";

const Login = () => {
  const [email, setEmail] = useState("kunleolaakande@gmail.com");
  const [password, setPassword] = useState("12345678");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.properties);
  const notify = useSelector((state) => state.notification);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const requestdata = {
        password,
        username: email,
      };
      const { error } = await dispatch(loggin(requestdata));
      const val = await dispatch(loggin(requestdata));
      console.log(val);
      if (error?.message === "Network Error") {
        throw "Pleae check your internet connection";
      }
      if (error?.message === "Request failed with status code 401") {
        throw "Please enter valid email and password";
      }

      console.log(error);
      const {
        payload: { data },
      } = await dispatch(loggin(requestdata));
      console.log(data);
      const { token, user } = data;
      // console.log(user)
      const res = dispatch(userCredential(user));
      console.log(res);

      // window.localStorage.setItem("user", JSON.stringify(user));
      window.localStorage.setItem("token", JSON.stringify(token));
      await dispatch(AllProperties());
      const note = await dispatch(Notification());
      console.log(note);

      console.log(selector.loading);

      if (selector.loading && notify.loading) {
      } else {
        navigate("/properties");
      }
      //
      console.log(token, user);
    } catch (err) {
      if (err.message === "Network Error") {
        ErrorNotification("please check your internet connections");
      }
      console.log(err);
      ErrorNotification(err);
    }
  };
  // console.log(selector);
  const resetPassword = () => {
    navigate("/validateEmail");
  };

  return (
    <>
      {selector.loading || notify.loading ? (
        <Loader />
      ) : (
        <div>
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
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className={`${login.verify} col-md-12`}>
                  <div className="checkbox ">
                    <label
                      htmlFor=""
                      onClick={() => navigate("/signin")}
                      className="forgot-password"
                    >
                      signup
                    </label>
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
        </div>
      )}
    </>
  );
};

export default Login;
