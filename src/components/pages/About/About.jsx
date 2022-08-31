import React from "react";
import "./About.module.scss";

import About1 from "../../../Assets/About1.png";
import About2 from "../../../Assets/About2.png";
import About3 from "../../../Assets/About3.png";
import About4 from "../../../Assets/About4.png";
import About5 from "../../../Assets/About5.png";
const About = () => {
  return (
    <div className="container-fluid me-0 me-md-3 ">
      <div className="d-lg-flex justify-content-between align-items-center about">
        <div className="col-md-8 container flex-grow bd-highlight">
          <h1 className="h1 text-primary text-center about_heading">
            Buy/Book Relaxation
          </h1>
          <p className=" about_text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            consequuntur in repudiandae officia fuga voluptatibus magnam odio
            impedit voluptate reprehenderit id totam est sint quos facilis
            laudantium esse iusto doloribus vero sunt culpa, modi porro nulla.
            Beatae consequuntur, iusto doloremque quaerat quis vitae officia,
            nemo ut officiis quos sint amet!
          </p>
        </div>
        <div className="col-md-4 d-lg-flex justify-content-end position-relative">
          <img
            src={About1}
            alt="Buy/Rent Hotel"
            className="img-fluid w-100 flex-grow bd-highlight"
          />
          <span className="badge bg-primary  px-4 py-2 align-self-start position-absolute pos-left top-50 start-0">
            Relaxation
          </span>
        </div>
      </div>
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center about">
        <div className="col-md-4 d-lg-flex position-relative order-last order-lg-first">
          <img
            src={About2}
            alt="Buy/Rent Hotel"
            className="img-fluid w-100 flex-fill bd-highlight"
          />
          <span className="badge bg-info  px-4 py-2 align-self-end position-absolute end-0 end-lg-0 top-50">
            Get Hotel
          </span>
        </div>
        <div className="col-md-8 container order-first order-lg-last">
          <h1 className="h1 text-primary text-center about_heading">
            Buy/Rent Hotel
          </h1>
          <p className=" about_text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            consequuntur in repudiandae officia fuga voluptatibus magnam odio
            impedit voluptate reprehenderit id totam est sint quos facilis
            laudantium esse iusto doloribus vero sunt culpa, modi porro nulla.
            Beatae consequuntur, iusto doloremque quaerat quis vitae officia,
            nemo ut officiis quos sint amet!
          </p>
        </div>
      </div>

      <div className="d-lg-flex justify-content-between align-items-center about">
        <div className="col-md-8 container">
          <h1 className="h1 text-primary text-center about_heading">
            Buy/Rent House
          </h1>
          <p className=" about_text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            consequuntur in repudiandae officia fuga voluptatibus magnam odio
            impedit voluptate reprehenderit id totam est sint quos facilis
            laudantium esse iusto doloribus vero sunt culpa, modi porro nulla.
            Beatae consequuntur, iusto doloremque quaerat quis vitae officia,
            nemo ut officiis quos sint amet!
          </p>
        </div>

        <div className="col-md-4 d-lg-flex justify-content-end position-relative">
          <img
            src={About3}
            alt="Buy/Rent Hotel"
            className="img-fluid w-100 flex-grow bd-highlight"
          />
          <span className="badge bg-purple px-4 py-2 align-self-start position-absolute pos-left top-50 start-0">
            Rent House
          </span>
        </div>
      </div>

      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center about">
        <div className="col-md-4 d-lg-flex justify-content-end position-relative order-last">
          <img
            src={About4}
            alt="Buy/Rent Hotel"
            className="img-fluid w-100 flex-grow bd-highlight"
          />
          <span className="badge bg-danger  px-4 py-2 align-self-start position-absolute end-0 end-lg-0 top-50">
            Buy House
          </span>
        </div>
        <div className="col-md-8 container order-first order-lg-last form"> 
          <h1 className="h1 text-primary text-center about_heading">
            Buy/Rent Hostel
          </h1>
          <p className=" about_text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            consequuntur in repudiandae officia fuga voluptatibus magnam odio
            impedit voluptate reprehenderit id totam est sint quos facilis
            laudantium esse iusto doloribus vero sunt culpa, modi porro nulla.
            Beatae consequuntur, iusto doloremque quaerat quis vitae officia,
            nemo ut officiis quos sint amet!
          </p>
        </div>
      </div>

      <div className="d-lg-flex justify-content-between align-items-center about">
        <div className="col-md-8 container">
          <h1 className="h1 text-primary text-center about_heading">
            Buy/Rent Land
          </h1>
          <p className=" about_text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            consequuntur in repudiandae officia fuga voluptatibus magnam odio
            impedit voluptate reprehenderit id totam est sint quos facilis
            laudantium esse iusto doloribus vero sunt culpa, modi porro nulla.
            Beatae consequuntur, iusto doloremque quaerat quis vitae officia,
            nemo ut officiis quos sint amet!
          </p>
        </div>
        <div className="col-md-4 d-lg-flex justify-content-end position-relative">
          <img
            src={About5}
            alt="Buy/Rent Hotel"
            className="img-fluid w-100 flex-grow bd-highlight"
            width="100%"
          />
          <span className="badge bg-warning px-4 py-2 align-self-start pos-left position-absolute top-50 start-0">
            Get Land
          </span>
        </div>
      </div>
    </div>
  );
};
export default About;
