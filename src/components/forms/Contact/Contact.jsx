import React, { useState } from "react";
import {useNavigate}from 'react-router-dom';
import { motion } from "framer-motion";
import contact from "./Contact.module.css";
import { FaMapMarkerAlt, FaMarker } from "react-icons/fa";
import contact_image from "../../../Assets/Image.png";
import { ToastContainer, Zoom } from "react-toastify";
import { ErrorNotification, InfoNotification } from "../../Common/ErrorToast";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Contact = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(window.localStorage.getItem("token"));
     const data = {message, firstName, lastName, email}
     const response = await axios.post('https://celahl.herokuapp.com/api//users/contact', data)
     console.log(response)

      console.log(message.split(" ").length);
      if (message.split(" ").length <= 3) {
        throw "Message should not be less than 3 words";
      }
      if(response.status === 200) {
 InfoNotification("message sent successfully");
 navigate('/faqs')
      }
     
    } catch (err) {
      if(err.message === "Network Error") {
        ErrorNotification('Please check your internet connection')
      }
      console.log(err.response.data.message);
      ErrorNotification(err.response.data.message);
    }
  };
  return (
    <motion.div
    
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      id="contact_container"
    >
      <ToastContainer transition={Zoom} autoClose={800} />
      <div>
        <div className="container bg-white py-5">
          <form
            id="form-container "
            className={`${contact.contact_container}  mx-auto row g-2 justify-content-center`}
          >
            <div className="contact text-center">
              <h5 className="text-primary">Contact us</h5>
              <h3 className="text-bold">Get in Touch</h3>
              <p className="">
                We'd love to hear from you <br /> Please out this form
              </p>
            </div>
              <div className="col-6">
                  <label htmlFor="" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="form-control"
                  />
                </div>
                  
                <div className="col-6">
                  <label htmlFor="" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="form-control"
                  />
                </div>
                 <div className="col-6">
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
<div className="col-6"> </div>
            <div className="col-md-12">
              <label htmlFor="" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                name="feedback"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                id=""
                cols="15"
                rows="5"
                required
              ></textarea>
            </div>

            <div className="col-md-12 my-4">
              <label htmlFor="">
                {" "}
                <input type="checkbox" name="" id="" className="me-2" />
                you agree to our <a href="#">privacy and policy</a>
              </label>
            </div>

            <div className="d-grid col-md-12">
              <button onClick={sendMessage} className="btn btn-primary btn-lg">
                Send Messsage
              </button>
            </div>
          </form>
        </div>

        <div className="container">
          <div
            className={`${contact.contact_footer} justify-content-between p-5 mt-5`}
          >
            <section>
              <h5 className="text-primary">Contact us</h5>{" "}
              <h3 className="h2">Chat to our friendly team</h3>
              <p className="text-muted small">
                we'd love to here from you please
              </p>
            </section>
            <section>
              <h4 className="h5">
                {" "}
                <FaMapMarkerAlt color="blue" /> Sydney
              </h4>
              <h6 className="text-muted small">
                100 George Street, Sydney NSW 2000 AU
              </h6>
            </section>
          </div>
          <div>
            <img
              className={`${contact.contact_footer_img}`}
              src={contact_image}
              alt="contact-image"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
