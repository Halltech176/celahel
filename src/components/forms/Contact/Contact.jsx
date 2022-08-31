import React from "react";
import contact from "./Contact.module.css";
import {FaMapMarkerAlt, FaMarker} from 'react-icons/fa'
import contact_image from "../../../Assets/Image.png";
const Contact = () => {
  return (
    <div id="contact_container">
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
            <div className="col-md-6">
              <label htmlFor="" className="form-label">
                First Name
              </label>
              <input type="text" className="form-control" required />
            </div>

            <div className="col-md-6">
              <label htmlFor="" className="form-label">
                Last name
              </label>
              <input type="text" className="form-control" required />
            </div>

            <div className="col-md-12">
              <label htmlFor="" className="form-label">
                Email
              </label>
              <input type="text" className="form-control" required />
            </div>

            <div className="col-md-12">
              <label htmlFor="" className="form-label">
                Phone Number
              </label>
              <input type="text" className="form-control" required />
            </div>

            <div className="col-md-12">
              <label htmlFor="" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                name="feedback"
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
              <button className="btn btn-primary btn-lg">Send Messsage</button>
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
              <h4 className="h5"> <FaMapMarkerAlt color="blue"/> Sydney</h4>
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
    </div>
  );
};

export default Contact;
