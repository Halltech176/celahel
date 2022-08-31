import React, { useState } from "react";
import { CgArrowLongLeft } from "react-icons/cg";
import profile from "./Profile.module.css";
import Sidebar from "../../Common/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FormInput } from "../../forms/Signin/FormInputs";
import { ToastContainer, Zoom } from "react-toastify";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../Common/ErrorToast";

const Profile = () => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  console.log(user);
  const initial_values = {
    firstName: user.firstName,
    lastName: user.lastName,
    number: user.phone,
    email: user.email,
    gender: user.gender,
    type: user.type,
    city: "",
    phone: user.phone,
    agency: user.agency,
  };
  const [values, setValues] = useState(initial_values);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const token = window.JSON.parse(localStorage.getItem("token"));
  console.log(values);

  const navigate = useNavigate();
  const inputs = FormInput.slice(0, FormInput.length - 1);
  const userData = {
    firstName: values.firstName,
    lastName: values.lastName,
    number: values.phone,
    email: values.email,
    gender: values.gender,
    type: values.type,
    city: "",
    phone: values.phone,
    agency: values.agency,
  };
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "https://celahl.herokuapp.com/api/users/profile",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        }
      );
      window.localStorage.setItem("user", JSON.stringify(response.data.data));
      SuccessNotification(response.data.message);
      // setTimeout(() => {
      //   navigate("/properties");
      // }, 5000);

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const changePassword = async (e) => {
    e.preventDefault();
    const passwordState = {
      oldPassword,
      newPassword,
    };
    try {
      const response = await axios.post(
        "https://celahl.herokuapp.com/api/auth/change-password",
        passwordState,
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        }
      );
      SuccessNotification(response.data.message);
      console.log(response.data.message);
    } catch (err) {
      ErrorNotification(err.response.data.message);
      console.log(err.response.data.message);
    }
  };

  const renderInputs = inputs.map((inputs, index) => (
    <div key={index} className="m-1 col-md-5">
      <label htmlFor="" className="form-label">
        {inputs.label}
      </label>
      <input
        required
        type={inputs.type}
        name={inputs.name}
        className="form-control"
        onChange={handleChange}
        value={values[inputs.name]}
      />
    </div>
  ));

  const Back = () => {
    navigate(-1);
  };
  return (
    <>
      <ToastContainer transition={Zoom} autoClose={800} />
      <Sidebar />
      <div className={`${profile.profile_container}`}>
        <div className="d-flex align-items-center">
          <CgArrowLongLeft onClick={Back} size="1.8rem" />
          <h2 className={`${profile.profile_text} ms-4  text-primary`}>
            {" "}
            Edit Profile
          </h2>
        </div>

        <form id="form-container" className="w-75 container  row g-2 ">
          {renderInputs}
          <div className="col-md-5">
            <select
              name="gender"
              value={values.gender}
              onChange={handleChange}
              className="w-100 my-4 p-2"
              id=""
            >
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
          <div className="col-md-5">
            <select
              name="type"
              value={values.type}
              onChange={handleChange}
              className="w-100 my-4 p-2"
              id=""
            >
              <option value="agent">agent</option>
              <option value="user">user</option>
            </select>
          </div>
          <div className="col-md-20">
            <h4>Change Password</h4>
            <div className="small text-secondary">
              Please enter your current password to change your password
            </div>
          </div>

          <div className="col-md-3 col-xs-10">
            <label htmlFor="" className="form-label">
              Old Password
            </label>
            <input
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
              className="form-control"
            />
          </div>
          <div className="col-md-3 col-xs-10">
            <label htmlFor="" className="form-label">
              New password
            </label>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              className="form-control"
            />
          </div>
          <div className=" col-md-4 text-center">
            <button
              onClick={changePassword}
              className="btn btn-primary my-4 py-2 px-3  "
            >
              Change Password
            </button>
          </div>
          <div className="d-flex justify-content-center my-5 col-md-12 text-center">
            <button
              onClick={updateProfile}
              className="btn btn-primary py-2 px-5  "
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
