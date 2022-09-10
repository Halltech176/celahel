import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import signin from "./Signin.module.css";
import { FormInput } from "./FormInputs";
import { useDispatch, useSelector } from "react-redux";
import { Validate } from "./ValidateForm";
import { signup } from "../../../Redux/actions";
import { User } from "../../../Redux/actions";
import { ToastContainer, Zoom } from "react-toastify";
import Loader from "../../Common/Loader";
import { ErrorNotification, InfoNotification } from "../../Common/ErrorToast";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state);
  const { loading } = userDetails;
  // console.log(loading);

  const initial_values = {
    firstName: "ayomide",
    lastName: "olajide",
    number: "",
    email: "",
    gender: "male",
    type: "agent",
    city: "ogbomoso",
    agency: "cephas",
    password: "12345678",
  };
  const initial_checked = {
    check_state: true,
  };
  const [values, setValues] = useState(initial_values);
  const [formErrors, setFormErrors] = useState("");
  const [checked, setChecked] = useState(initial_checked);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setFormErrors(Validate(values));
  };

  const handleCheck = () => {
    if (checked.check_state) {
      setChecked({ ...checked, check_state: false });
    } else {
      setChecked({ ...checked, check_state: true });
    }
  };
  const userInputs = Object.assign(values, checked);
  console.log(userInputs);
  useEffect(() => {
    setFormErrors(Validate(values));
  }, [values]);
  console.log(values.password);
  console.log(confirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        firstName: userInputs.firstName,
        lastName: userInputs.lastName,
        email: userInputs.email,
        password: userInputs.password,
        companyName: userInputs.agency,
        gender: userInputs.gender,
        type: userInputs.type,
        phone: userInputs.number,
      };
      if (userData.password !== confirmPassword) {
        throw "Password confirmation went wrong!!!";
      }
      const response = await dispatch(signup(userData)).unwrap();
      console.log(response);
      const user = await dispatch(User());
      console.log(user);
      InfoNotification(response.message);
      console.log(response);

      setTimeout(() => {
        // navigate("/verify");
      }, 2000);
    } catch (err) {
      console.log(err);
      if (err) {
        if (err.message === "Rejected") {
          return ErrorNotification("please check your internet connection!!!");
        }
        if (err.message) {
          return ErrorNotification(err.message);
        }

        ErrorNotification(err);
      }

      console.log("fail");
    }
  };

  const renderInputs = FormInput.map((inputs, index) => (
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
      {values[inputs.name] ? (
        <p style={{ color: "red" }}>{formErrors[inputs.name]}</p>
      ) : (
        ""
      )}
    </div>
  ));
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <ToastContainer transition={Zoom} autoClose={800} />

          <div className={`container`}>
            <div className={`text-center`}>
              <h1 style={{ color: "#101828", fontWeight: "500" }} className="">
                Welcome
              </h1>
              <p className="">Welcome! Please enter your details</p>
            </div>
            <form
              onSubmit={handleSubmit}
              id="form-container"
              className="w-75 m-auto row g-2 justify-content-center"
            >
              {renderInputs}
              <div className="m-1 col-md-5">
                <label htmlFor="" className="form-label">
                  confirm password
                </label>
                <input
                  required
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </div>

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

              <button
                type="submit"
                className={` ${signin.signin_btn} btn  btn-primary my-5 py-2 px-5`}
                onClick={handleSubmit}
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Signin;
