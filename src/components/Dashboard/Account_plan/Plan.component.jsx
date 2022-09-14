import React from "react";
import { motion } from "framer-motion";
import planstyle from "./planstyle.module.css";
import axios from "axios";
import BasicIcon from "../../../Assets/Plane.png";
import PremiumIcon from "../../../Assets/Paper Plane.png";
import EnterpriseIcon from "../../../Assets/Rocket.png";
import Sidebar from "../../Common/Sidebar/Sidebar";
import { ToastContainer, Zoom } from "react-toastify";
import { ErrorNotification, InfoNotification } from "../../Common/ErrorToast";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Plan() {
  const navigate = useNavigate();
  const [modalState, setModalState] = React.useState(false);
  const handleOpen = () => setModalState(true);
  const handleClose = () => setModalState(false);

  const planSubscribe = async (amount) => {
    try {
      const token = window.JSON.parse(localStorage.getItem("token"));

      // https://celahl.herokuapp.com/api/
      const generate_transaction = await axios.post(
        "https://celahl.herokuapp.com/api//transaction/generate",
        {
          amount: amount,
          purpose: "Plan",
        },
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        }
      );
      const web_url = await axios.post(
        "https://celahl.herokuapp.com/api//transaction/initiate",
        {
          reference: generate_transaction.data.data.reference,
          callback_url: "http://localhost:3000/addproperty",
        },
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        }
      );

      if (web_url.status === 200) {
        const url = window.open(web_url.data.data.authorization_url, "_blank");
        console.log(url);
        // return <iframe src={web_url.data.data.authorization_url}></iframe>
      }
      console.log(web_url);
    } catch (err) {
      if (err.message === "Network Error") {
        ErrorNotification("Please check your internet connection");
      }
      // ErrorNotification(err.message);
      console.log(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer transition={Zoom} autoClose={800} />
      <Sidebar />
      <div className={`${planstyle.planstyleContainer}`}>
        <div>
          <h2 className="text-primary  small text-center h4">PRICING</h2>
          <h1 className="h1 text-primary text-center">
            Affordable pricing plans!!!
          </h1>
          <p className="m-3 lead plan_text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel tenetur
            quibusdam quas. Accusamus veniam magnam repudiandae ipsum, soluta
            quisquam velit.
          </p>
        </div>

        <div className="row g-4 my-4 mx-0 p-3 justify-content-between">
          <div className="col-12 col-md card shadow-lg borderless px-3 py-5 regular">
            <div className="d-flex">
              <div className="bg-light p-2 m-3 rounded-lg">
                <img src={BasicIcon} alt="" className="w-100" />
              </div>

              <div className="plantext d-flex flex-column">
                <p className="lead text-secondary">For small</p>
                <p className="h2 text-primary">Basic</p>
              </div>
            </div>
            <p className=" plan_tex">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non,
              distinctio?
            </p>
            <hr />

            <p className="h3">What's included</p>
            <div className="form-check">
              <input
                type="checkbox"
                className="rounded-circle form-check-input bg-primary"
                name="feature1"
                checked
                readOnly
              ></input>
              <label htmlFor="feature1" className="text-primary">
                All analytics features
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="rounded-circle form-check-input bg-primary"
                checked
                readOnly
                name="feature2"
              ></input>
              <label htmlFor="feature2" className="text-primary">
                Up to 250,000 tracked visits
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="rounded-circle form-check-input bg-primary"
                checked
                readOnly
                name="feature3"
              ></input>
              <label htmlFor="feature3" className="text-primary">
                Normal support
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="rounded-circle form-check-input bg-primary"
                checked
                readOnly
                name="feature4"
              ></input>
              <label htmlFor="feature4" className="text-primary">
                Up to 3 team members
              </label>
            </div>
            <p>
              <span className=" display-4 text-primary">Free trial</span>
            </p>

            <button
              className="btn btn-block btn-primary bg-primary rounded-pill my-3 py-3"
              onClick={() => navigate("/addproperties")}
            >
              Get started
            </button>
          </div>

          <div className="col-12 col-md card shadow-lg bg-purple px-3 mx-lg-3 py-5 inverted bg-primary text-white">
            <div className="d-flex">
              <div className="bg-light p-2 m-3 rounded-lg">
                <img src={PremiumIcon} alt="" className="w-100" />
              </div>

              <div className="plantext d-flex flex-column">
                <p className="lead text-secondary">For Startups</p>
                <p className="h2">Growth</p>
              </div>
            </div>
            <p className=" plan_tex">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non,
              distinctio?
            </p>
            <hr />

            <p className="h3">What's included</p>
            <div className="form-check">
              <input
                type="checkbox"
                className="rounded-circle form-check-input bg-light text-primary"
                name="feature1"
                checked
                readOnly
              ></input>
              <label htmlFor="feature1" className="form-check-label text-light">
                Everything on basic plan
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="rounded-circle form-check-input bg-light"
                checked
                readOnly
                name="faeature2"
              ></input>
              <label htmlFor="feature2" className="form-check-label text-light">
                Up to 1,000,000 tracked visits
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="rounded-circle form-check-input bg-light"
                checked
                readOnly
                name="feature3"
              ></input>
              <label htmlFor="feature3" className="form-check-label text-light">
                Premium support
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="rounded-circle form-check-input bg-light"
                checked
                readOnly
                name="feature4"
              ></input>
              <label htmlFor="feature4" className="form-check-label text-light">
                Up to 10 team members
              </label>
            </div>
            <p>
              <span className="display-4 text-light">&#8358;10000</span> /
              3month
            </p>

            <button
              onClick={() => planSubscribe(700)}
              className="btn btn-block btn-light rounded-pill my-3 py-3"
            >
              Get started
            </button>
          </div>

          {/* *********************** REGULAR 3***************************** */}
          {/* <PlanCard/> */}
          <div className="col-12 col-md card shadow-lg borderless px-3 py-5 regular">
            <div className="d-flex">
              <div className="bg-light p-2 m-3 rounded-lg">
                <img src={EnterpriseIcon} alt="" className="w-100" />
              </div>

              <div className="plantext d-flex flex-column">
                <p className="lead text-secaondary">For business</p>
                <p className="h2 text-primary">Enterprise</p>
              </div>
            </div>
            <p className=" plan_tex">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non,
              distinctio?
            </p>
            <hr />

            <p className="h3">What's included</p>
            <div className="form-check">
              <input
                type="checkbox"
                className="rounded-circle form-check-input bg-primary"
                name="feature1"
                checked
                readOnly
              ></input>
              <label htmlFor="feature1" className="text-primary">
                Everything on growth plan
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="rounded-circle form-check-input bg-primary"
                checked
                readOnly
                name="faeature2"
              ></input>
              <label htmlFor="feature2" className="text-primary">
                Up to 5,000,000 tracked visits
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="rounded-circle form-check-input bg-primary"
                checked
                readOnly
                name="feature3"
              ></input>
              <label htmlFor="feature3" className="text-primary">
                Dedicated support
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="rounded-circle form-check-input bg-primary"
                checked
                readOnly
                name="feature4"
              ></input>
              <label htmlFor="feature4" className="text-primary">
                Up to 50 team members
              </label>
            </div>
            <p>
              <span className=" display-4 text-primary">&#8358;100000</span>{" "}
              /5years
            </p>

            <button
              onClick={() => planSubscribe(2000)}
              className="btn btn-block bg-primary btn-primary rounded-pill my-3 py-3"
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Plan;
