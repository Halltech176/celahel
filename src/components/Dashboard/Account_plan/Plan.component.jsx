import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Loader from "../../Common/Loader";
import { GetSettings } from "../../../Redux/actions";
import PlanData from "./Plan";

function Plan() {
  useEffect(() => {
    dispatch(GetSettings());
  }, []);
  console.log(PlanData);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { settings, loading } = useSelector((state) => state).settings;

  console.log(settings);

  const [modalState, setModalState] = React.useState(false);
  const handleOpen = () => setModalState(true);
  const handleClose = () => setModalState(false);
  console.log(settings?.basicPlan);

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
          callback_url: `${
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000/addproperty"
              : "celahel.vercel.app/addproperty"
          }`,
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
        // frame= <iframe src={web_url.data.data.authorization_url} height="400" width="500"></iframe>
      }
      await axios.get("https://celahl.herokuapp.com/api//transaction/verify");

      console.log(web_url);
    } catch (err) {
      if (err.message === "Network Error") {
        ErrorNotification("Please check your internet connection");
      }
      // ErrorNotification(err.message);
      console.log(err);
    }
  };

  const renderPlan = PlanData.map((data) => {
    return (
      <div
        className={`${data.plan === "Growth" ? "bg-primary" : "bg-light"} ${
          data.plan === "Growth" ? "text-light" : "text-dark"
        } col-12 col-md card shadow-lg borderless px-3 mx-2 py-5 regular`}
      >
        <div className="d-flex">
          <div className={` bg-light p-2 m-3 rounded-lg`}>
            {data.plan === "Basic" ? (
              <img src={BasicIcon} alt="" className="w-100" />
            ) : data.plan === "Growth" ? (
              <img src={PremiumIcon} alt="" className="w-100" />
            ) : (
              <img src={EnterpriseIcon} alt="" className="w-100" />
            )}
          </div>

          <div className="plantext d-flex flex-column">
            <p className="lead text-secondary">{data.size}</p>
            <p className="h2 text-primary">{data.plan}</p>
          </div>
        </div>
        <p className=" plan_tex">{data.text}</p>
        <hr />

        <p className={` h3`}>What's included</p>
        <div>
          <div
            className={`${
              data.plan === "Growth" ? "text-light" : "text-primary"
            } form-check`}
          >
            <input
              type="checkbox"
              className={`${
                data.plan === "Growth" ? "bg-light" : "bg-primary"
              } rounded-circle  form-check-input`}
              name="feature1"
              checked
              readOnly
            ></input>
            <label
              htmlFor="feature1"
              className={`${
                data.plan === "Growth" ? "text-light" : "text-primary"
              } form-check`}
            >
              {data.feature1}
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className={`${
                data.plan === "Growth" ? "bg-light" : "bg-primary"
              } rounded-circle  form-check-input`}
              checked
              readOnly
              name="feature2"
            ></input>
            <label
              htmlFor="feature2"
              className={`${
                data.plan === "Growth" ? "text-light" : "text-primary"
              } form-check`}
            >
              {data.feature2}
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className={`${
                data.plan === "Growth" ? "bg-light" : "bg-primary"
              } rounded-circle  form-check-input`}
              // className="form-check-input bg-primary"
              checked
              readOnly
              name="feature3"
            ></input>
            <label
              htmlFor="feature3"
              className={`${
                data.plan === "Growth" ? "text-light" : "text-primary"
              } form-check`}
            >
              {data.feature3}
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className={`${
                data.plan === "Growth" ? "bg-light" : "bg-primary"
              } rounded-circle  form-check-input`}
              checked
              readOnly
              name="feature4"
            ></input>
            <label
              htmlFor="feature4"
              className={`${
                data.plan === "Growth" ? "text-light" : "text-primary"
              } form-check`}
            >
              {data.feature4}
            </label>
          </div>
        </div>
        {data.plan === "Basic" ? (
          <p>
            <span className="display-6 text-primary">Free Trial</span>{" "}
          </p>
        ) : data.plan === "Growth" ? (
          <p>
            <span
              className={`${
                data.plan === "Growth" ? "text-light" : "text-primary"
              }   display-6`}
            >
              &#8358;{settings?.growthPlan}
            </span>{" "}
            / 3month
          </p>
        ) : (
          <p>
            <span className="display-6 text-primary">
              &#8358;{settings?.enterprisePlan}
            </span>{" "}
            / 5years
          </p>
        )}
        {/* btn-primary bg-primary */}
        <button
          className={`${
            data.plan === "Growth"
              ? "text-primary" && "bg-light"
              : "btn-primary" && "bg-primary"
          }  btn btn-block  rounded-pill my-3 py-3`}
          // className="btn btn-block btn-primary bg-primary rounded-pill my-3 py-3"
          onClick={
            data.plan === "Basic"
              ? () => navigate("/addproperty")
              : data.plan === "Growth"
              ? () => planSubscribe(settings?.growthPlan)
              : () => planSubscribe(settings?.enterprisePlan)
          }
        >
          Get started
        </button>
      </div>
    );
  });

  return (
    <>
      {loading && settings !== null ? (
        <Loader />
      ) : (
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                tenetur quibusdam quas. Accusamus veniam magnam repudiandae
                ipsum, soluta quisquam velit.
              </p>
            </div>

            <div className="row g-4 my-4 mx-0 p-3 justify-content-between">
              {renderPlan}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Plan;
