import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../Common/Sidebar/Sidebar";
import Loader from "../../Common/Loader";
import { Link } from "react-router-dom";
import properties from "./Properties.module.css";
import property_image from "../../../Assets/house.png";
import searchBtn from "../../../Assets/SearchVector.png";
import { Properties as AllProperties } from "../../../Redux/actions";
import Property_details from "./Properties_data.json";

const Properties = () => {
  const dispatch = useDispatch();

  const allProperties = async () => {
    try {
      const response = await dispatch(AllProperties());
      console.log(response);
      // return response;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    allProperties();
  }, []);
  const docs = useSelector((state) => state.properties.properties?.docs);
  const loading = useSelector((state) => state.properties.loading);

  console.log(docs);

  const agent_properties = docs.map((data) => {
    return (
      <Link key={data._id} className="text-decoration-none" to="/addproperty">
        <div className={`${properties.image_container}`}>
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
          {data.images.map((img) => {
            return (
              <img
                key={img._id}
                src={img.url}
                alt={img._id}
                className={`${properties.property_image}`}
              />
            );
          })}
        </div>
      </Link>
    );
  });

  const datas = Property_details.map((data, index) => {
    return (
      <Link key={index} className="text-decoration-none" to="/addproperty">
        <div className={`${properties.image_container}`}>
          <span
            className={`${
              data.property_tag === "For Sell"
                ? properties.sell_badge
                : properties.rent_badge
            } badge  px-2 py-1 text-center`}
          >
            {data.property_tag}
          </span>
          <div className={`${properties.property_text}`}>
            <p className={`${properties.property_name}`}>
              {data.property_name}
            </p>
            <p className={`${properties.property_location}`}>
              {data.property_location}
            </p>
            <p className={`${properties.property_price}`}>
              ${data.property_price}
            </p>
          </div>
          <img
            src={property_image}
            alt="img"
            className={`${properties.property_image}`}
          />{" "}
        </div>
      </Link>
    );
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
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
              {/* {datas} */}
              {agent_properties}
            </div>
          </div>
          <div />
        </div>
      )}
    </>
  );
};

export default Properties;
