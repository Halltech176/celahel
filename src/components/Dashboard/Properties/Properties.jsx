import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../Common/Sidebar/Sidebar";
import Loader from "../../Common/Loader";
import { Link } from "react-router-dom";
import properties from "./Properties.module.css";
import property_image from "../../../Assets/house.png";
import searchBtn from "../../../Assets/SearchVector.png";
import { Properties as AllProperties } from "../../../Redux/actions";
import { Property } from "../../../Redux/actions";
import { ToastContainer, Zoom } from "react-toastify";
import { ErrorNotification, InfoNotification } from "../../Common/ErrorToast";
import "react-toastify/dist/ReactToastify.css";
import Property_details from "./Properties_data.json";
import axios from "axios";

const Properties = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(2);
  const items = useSelector((state) => state.properties.properties);
  const values = useSelector((state) => state.properties);
  const activeProperty = useSelector((state) => state.property);
  useEffect(() => {
    dispatch(AllProperties());
  }, []);
  console.log(activeProperty);

  const handleIncrease = async () => {
    try {
      setCount(count + 1);

      if (count === items.totalPages) {
        setCount(1);
      }

      // await dispatch(AllProperties(1));
      const response = await dispatch(AllProperties(count));
      if (response.type === "properties/rejected") {
        throw "please check your internet connection";
      }
      console.log(response);
    } catch (err) {
      ErrorNotification(err);
      console.error(err);
    }
  };

  const handleDecrease = async () => {
    try {
      setCount(count - 1);

      if (count === 1) {
        setCount(items.totalPages);
      }

      const response = await dispatch(AllProperties(count));
      if (response.type === "properties/rejected") {
        throw "please check your internet connection";
      }
    } catch (err) {
      ErrorNotification(err);
    }
  };

  const handlePaginate = async (index) => {
    try {
      setCount(index);

      const response = await dispatch(AllProperties(count));
      if (response.type === "properties/rejected") {
        throw "please check your internet connection";
      }
    } catch (err) {
      ErrorNotification(err);
    }
  };

  const GetProperty = async (id) => {
    try {
      const response = await dispatch(Property(id));
      if (response.type === "property/fulfilled") {
        navigate("/editproperty");
      }
      if (response.type === "property/rejected") {
        throw "please check your internet connection";
      }
      console.log(response);
    } catch (err) {
      ErrorNotification(err);
    }
  };

  const docs1 = useSelector((state) => state.properties.properties);
  const docs = useSelector((state) => state.properties.properties?.docs);
  console.log(docs1);
  const loading = useSelector((state) => state.properties.loading);

  if (docs.length === 0) {
    navigate("/addproperty");
  }

  const agent_properties = docs.map((data) => {
    return (
      <div
        key={data._id}
        onClick={() => GetProperty(data._id)}
        className={`${properties.image_container}`}
      >
        <span
          className={`${
            data.purpose === "sale"
              ? properties.sell_badge
              : properties.rent_badge
          } badge  px-2 py-1 text-center`}
        >
          {data.purpose}
        </span>
        <div className={`${properties.property_text}`}>
          <p className={`${properties.property_name}`}>{data.name}</p>
          <p className={`${properties.property_location}`}>{data.address}</p>
          <p className={`${properties.property_price}`}>${data.price}</p>
        </div>

        <div className="d-flex flex-wrap align-center justify-center ">
          {data.images.map((img) => {
            return (
              <img
                key={img._id}
                src={img.url}
                alt={img._id}
                className={`${properties.property_image} mx-auto`}
              />
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <>
      {loading || activeProperty.loading ? (
        <Loader />
      ) : (
        <div>
          <ToastContainer transition={Zoom} autoClose={800} />
          <Sidebar />
          <div className={`${properties.property_container} row`}>
            <div className={`${properties.search_container}`}>
              <div>
                <input
                  className={`${properties.search_input} form-control`}
                  placeholder="search"
                />
                <span>
                  <img
                    className={`${properties.search_icon}`}
                    src={searchBtn}
                    alt="search icon"
                  />
                </span>
              </div>
            </div>
            <div
              className={`${properties.add_property} mt-2 col-md-12 justify-content-between d-flex flex-wrap`}
            >
              <p className={`${properties.property_heading}`}> My Properties</p>
              <Link to="/addproperty">
                {" "}
                <button className={`${properties.add_btn} btn btn-primary`}>
                  Add New
                </button>
              </Link>
            </div>

            <div
              className={`${properties.properties_image} col-md-12 d-flex flex-wrap justify-content-between`}
            >
              {agent_properties}
            </div>
            <div className="paginate-btns d-flex align-items-center justify-content-between my-3 flex-wrap ">
              <button className="paginate-btn" onClick={handleDecrease}>
                prev
              </button>
              <ul className="d-flex align-items-center">
                {docs.map((doc, index) => {
                  // if(inde)
                  return index < items.totalPages ? (
                    <li
                      key={index}
                      onClick={() => handlePaginate(index + 1)}
                      className="mx-2"
                    >
                      {index + 1}
                    </li>
                  ) : (
                    ""
                  );
                })}
              </ul>
              <button className="paginate-btn" onClick={handleIncrease}>
                next
              </button>
            </div>
          </div>

          <div />
        </div>
      )}
    </>
  );
};

export default Properties;
