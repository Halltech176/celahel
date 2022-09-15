import React, { useState } from "react";
import { motion } from "framer-motion";
import About2 from "../../../Assets/user1.png";
import { MdFileUpload } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { CgArrowLongLeft } from "react-icons/cg";
import profile from "./Profile.module.css";
import Sidebar from "../../Common/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "../../../Redux/actions";
import { FormInput } from "../../forms/Signin/FormInputs";
import { ToastContainer, Zoom } from "react-toastify";
import Loader from "../../Common/Loader";

import {
  ErrorNotification,
  SuccessNotification,
} from "../../Common/ErrorToast";

const Profile = () => {
  const dispatch = useDispatch();
  const { candidate } = useSelector((state) => state);
  const data = useSelector((state) => state.userprofile);
  const { loading, error, user } = useSelector((state) => state.userprofile);

  console.log(user);
  const initial_values = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    number: user?.phone,
    email: user?.email,
    gender: user?.gender,
    type: user?.type,
    city: "",
    phone: user?.phone,
    agency: user?.agency,
  };
  const [values, setValues] = useState(initial_values);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [image, setImage] = useState();

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const token = window.JSON.parse(localStorage.getItem("token"));

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

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("filename", image?.name);

      const token = window.JSON.parse(localStorage.getItem("token"));

      console.log(image);
      const response = await axios.post(
        "https://celahl.herokuapp.com/api/users/profile-image",
        { image: image },
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const populate = await axios.get(
          "https://celahl.herokuapp.com/api//users/profile?populate=avatar",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (populate.status === 200) {
          await dispatch(User());
          SuccessNotification(response.data.message);
        }
        console.log(populate);
      }

      console.log(response);
    } catch (err) {
      if (err.message === "Network Error") {
        ErrorNotification("Pleae check your internet connection");
      }
      ErrorNotification(err.response.data.message);
      console.log(err);
    }
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
      await dispatch(User());
      // window.localStorage.setItem("user", JSON.stringify(response.data.data));
      SuccessNotification(response.data.message);

      console.log(response.data.data);
    } catch (err) {
      if (err.message === "Network Error") {
        ErrorNotification("Please check your internet connection");
      }
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
      await dispatch(User());
      console.log(response.data.data);
      SuccessNotification(response.data.message);
      console.log(response.data.message);
    } catch (err) {
      if (err.message === "Network Error") {
        ErrorNotification("Please check your internet connection");
      }
      console.log(err);
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
      {loading ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ToastContainer transition={Zoom} autoClose={800} />
          <Sidebar />
          <div className={`${profile.profile_container}`}>
            <div className="d-flex align-items-center">
              <CgArrowLongLeft onClick={Back} size="1.8rem" />
              <h2 className={`${profile.profile_text} ms-4  text-primary`}>
                Edit Profile
              </h2>
            </div>
            <div className="profile-image-container">
              <div className="file-container">
                <img
                  src={image ? URL.createObjectURL(image) : About2}
                  className="profile-image"
                  alt="profile image"
                />
              </div>
              <div className="file-upload">
                <input
                  onChange={handleImage}
                  type="file"
                  className="form-control"
                />

                <span onClick={uploadImage} className="upload-btn">
                  <label>click icon to upload</label>
                  <MdFileUpload />
                </span>
              </div>
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
        </motion.div>
      )}
    </>
  );
};

export default Profile;
