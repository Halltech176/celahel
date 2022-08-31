import React, { useState } from "react";
import { AllProperties } from "../../actions";
import Sidebar from "../Common/Sidebar";
import { CgArrowLongLeft } from "react-icons/cg";
import properties from "./Properties.module.css";
import { useNavigate } from "react-router-dom";
const Properties = () => {
  const [property, setProperty] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const Back = () => {
    navigate(-1);
  };
  return (
    <>
      <Sidebar />
      <div className={`${properties.property_container}`}>
        <div className="d-flex justify-content-end my-3">
          <div className={`${properties.property_search}  input-group w-50 `}>
            <input type="search" name="" className="form-control w-75" id="" />
            <div className="input-group-append">
              <span className="input-group-text  text-light bg-primary">
                search
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <CgArrowLongLeft onClick={Back} size="3rem" />
          <h2 className={`${properties.profile_text} ms-4  text-primary`}>
            {" "}
            Edit properties
          </h2>
        </div>
        <h4 className="text-primary fw-100">Upload Property Picture</h4>
        <h4 className="text-primary fw-100">Enter Correct Property Details</h4>

        <form
          id="form-container"
          className="w-100 my-3 row g-4 justify-content-start"
        >
          <div className="col-md-5">
            <label htmlFor="" className="form-label">
              Property Name
            </label>
            <input type="text" value={property} className="form-control" />
          </div>

          <div className="col-md-5">
            <label htmlFor="" className="form-label">
              Address
            </label>
            <input
              type="email"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="col-md-10">
            <label htmlFor="" className="form-label">
              About the property
            </label>
            <textarea
              className="form-control"
              name="feedback"
              id=""
              cols="15"
              rows="8"
            ></textarea>
          </div>

          <div className="col-md-5">
            <label htmlFor="" className="form-label">
              Price
            </label>
            <input type="number" className="form-control" />
          </div>

          <div className="col-md-5">
            <label htmlFor="" className="form-label">
              Did you want to Sell Rent the property
            </label>
            <div className="form-check form-check-inline">
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="" className="form-check-label">
                Rent
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="" className="form-check-label">
                Rent
              </label>
            </div>
          </div>

          <div className="col-md-5">
            <label htmlFor="" className="form-label">
              Property type
            </label>{" "}
            <br />
            <div className="form-check form-check-inline">
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="" className="form-check-label">
                House
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="" className="form-check-label">
                Hotel
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="" className="form-check-label">
                land
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="" className="form-check-label">
                Relaxation
              </label>
            </div>
          </div>

          <div className="col-md-5">
            <label htmlFor="" className="form-label">
              Specification
            </label>{" "}
            <br />
            <div className="form-check form-check-inline">
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="" className="form-check-label">
                Bathroom
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="" className="form-check-label">
                Toilet
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="" className="form-check-label">
                Waste Bin
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="" className="form-check-label">
                Relaxation
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="" className="form-check-label">
                Stable Light
              </label>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Properties;
