import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Sidebar from "../../Common/Sidebar/Sidebar";
import { CgArrowLongLeft } from "react-icons/cg";
import properties from "./AddProperties.module.css";
import property_image from "../../../Assets/house.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import searchBtn from "../../../Assets/SearchVector.png";
import { ToastContainer, Zoom } from "react-toastify";
import { CreateProperty } from "../../../Redux/actions";
import { PropertiesSpecifications, PropertyType } from "./Specifications";
import {
  ErrorNotification,
  InfoNotification,
  SuccessNotification,
} from "../../Common/ErrorToast";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Common/Loader";
const AddProperties = () => {
  console.log(PropertiesSpecifications);
  console.log(PropertyType);
  const dispatch = useDispatch();
  const { loading, error, newProperty } = useSelector(
    (state) => state.newproperty
  );
  console.log(newProperty);
  const [name, setName] = useState("d-villa");
  const [description, setDescription] = useState(
    "This is a really nice place where you can leave comfortable and you wont't have any problem. The house is really made of nice featueres and you will really enjure it sir"
  );
  const [price, setPrice] = useState("2000");
  const [address, setAddress] = useState("ile-ewe");
  const [images, setImages] = useState("");
  const [image, setImage] = useState("properties");
  const [purpose, setPurpose] = useState("");
  
  const [specifications, setSpecifications] = useState([]);
  const [type, setType] = useState("");
  const [fileRef, setFileRef] = useState("");
  const [mainImg, setMainImg] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [availableRooms, setAvailableRooms] = useState("");
  const [totalRooms, setTotalRooms] = useState("");

  const [specificationsValue, SetSpecificationsValue] = useState([]);

  const GetSpecifications = (value) => {
    const specs = PropertiesSpecifications.filter((data, index) => {
      return data.type === value;
    });
    setSpecifications(specs);
    console.log(specs);
  };

  const CheckSpecifications = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      SetSpecificationsValue([...specificationsValue, value]);
    } else {
      SetSpecificationsValue(
        specificationsValue.filter((val) => val !== value)
      );
    }
  };
  const CheckType = (e) => {
    setType(e.target.value);
    GetSpecifications(e.target.value);
    SetSpecificationsValue([])
    // setspecificationsValue
    console.log(specificationsValue)
  };
  console.log(specifications);
  const renderType = PropertyType.map((data, index) => {
    return (
      <div key={index} className="form-check form-check-inline">
        <input
          type="radio"
          name="type"
          id={data.type}
          value={data.type}
          checked={type === data.type}
          onChange={CheckType}
          className="form-check-input"
        />
        <label htmlFor="" className="form-check-label">
          {data.type}
        </label>
      </div>
    );
  });

  const renderSpecifications = specifications.map((data, index) => {
    return (
      <div key={data.value} className="form-check form-check-inline">
        <input
          // checked
          onChange={CheckSpecifications}
          value={data.value}
          type="checkbox"
          className="form-check-input"
        />
        <label htmlFor="" className="form-check-label">
          {data.value}
        </label>
      </div>
    );
  });

  console.log(specificationsValue);

  const handleFile = (e) => {
    setMainImg(e.target.src);
  };
  const navigate = useNavigate();

  const checkPurpose = (e) => {
    setPurpose(e.target.id);
  }
  console.log(purpose);

  const handleChange = (e) => {
    setImages(e.target.files);
    console.log(e.target.files);
  };
  const handleMainImage = (e) => {
    console.log(e.target.files[0]);
    setCoverImage(e.target.files[0]);
    // console.log(coverImage);
  };
  // console.log(images);
  const token = window.JSON.parse(localStorage.getItem("token"));
  const createProperty = async (e) => {
    e.preventDefault();

    try {
      // const url = " https://celahl.herokuapp.com/api//property/";

      let formData = new FormData();

      formData.append("file", image);
      Array.from(images).forEach((item, index) => {
        console.log(item);
        formData.append("images", item);
      });
      specificationsValue.forEach((specs) => {
        formData.append("specifications", specs);
      });
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("address", address);

      formData.append("type", type);
      formData.append("purpose", purpose);
      if(purpose === 'rent') {
        formData.append("totalRooms", totalRooms);
      formData.append("availableRooms", availableRooms);
      }
      
      formData.append("coverImage", coverImage);
      console.log(specifications);
      console.log(Array.from(formData));

      console.log(formData);
      const response = await dispatch(CreateProperty(formData)).unwrap();
      if (response?.createdAt) {
        SuccessNotification("Property Successfully created");
        setTimeout(() => {
          navigate("/agent/properties");
        }, 2000);
      }
      console.log(response);
    } catch (err) {
      // if(err.)
      console.log(err);
      if (
        err.message === "timeout exceeded" ||
        err.message === "Network Error"
      ) {
        ErrorNotification("please check your internet connection");
      }
      console.log(err);
      ErrorNotification(err?.response?.data?.message);
      if (err?.response?.data?.message?.split(" ").length > 12) {
        setTimeout(() => {
          navigate("/agent/upgrade");
        }, 3000);
      }
    }
  };
  const Back = () => {
    navigate(-1);
  };
  return (
    <>
      {loading && !error ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ToastContainer transition={Zoom} autoClose={800} />
          <Sidebar />
          <div className={`${properties.property_container}`}>
            <div className="row">
              <div className="col-md-8 d-flex align-items-center">
                <CgArrowLongLeft size="1.8rem" onClick={Back} />
                <h2 className={`${properties.profile_text} ms-4  text-primary`}>
                  {" "}
                  Add Property
                </h2>
              </div>
              <h4 className="text-primary my-4">Upload Property Picture</h4>
              <div className={`${properties.properties_image} `}>
                <div className={`${properties.main_img_container} me-3`}>
                  {coverImage ? (
                    <img
                      src={URL.createObjectURL(coverImage)}
                      className={`${properties.main_img}`}
                      alt="img"
                    />
                  ) : (
                    <div className={`${properties.main_img_container} me-3 `}>
                      {" "}
                      <div
                        className={`${properties.main_img_container} mx-3 no-values`}
                      >
                        {" "}
                        <h4>
                          Cover image <br /> would be preview here{" "}
                        </h4>{" "}
                      </div>
                    </div>
                  )}
                </div>
                <div className={`${properties.image_container}  `}>
                  {images ? (
                    Array.from(images).map((item, index) => {
                      return (
                        <img
                          onClick={handleFile}
                          key={index}
                          className={`${properties.property_image}`}
                          src={item ? URL.createObjectURL(item) : null}
                        />
                      );
                    })
                  ) : (
                    <div className="no-values">
                      <h4>
                        Selected images <br /> would be shown here
                      </h4>
                    </div>
                  )}
                </div>
              </div>
              <h5 className="text-primary fw-100">
                Enter Correct Property Details
              </h5>

              <form
                id="form-container"
                className="w-100 my-3  row g-4 justify-content-start"
              >
                <div className="col-md-5">
                  <label htmlFor="" className="form-label">
                    Property Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="col-md-5">
                  <label htmlFor="" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    className="form-control"
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor="" className="form-label">
                    Property Cover image
                  </label>
                  <input
                    // value={image}

                    onChange={handleMainImage}
                    type="file"
                    className="form-control"
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor="" className="form-label">
                    other images
                  </label>
                  <input
                    // value={image}
                    multiple
                    onChange={handleChange}
                    type="file"
                    className="form-control"
                  />
                </div>

                <div className="col-md-5">
                  <label htmlFor="" className="form-label d-block">
                    Did you want to Sell Rent the property
                  </label>

                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      value={purpose}
                      name="purpose"
                      id="sale"
                      onChange={checkPurpose}
                      className="form-check-input"
                    />
                    <label htmlFor="" className="form-check-label">
                      Sell
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      value={purpose}
                      name="purpose"
                      id="rent"
                      onChange={checkPurpose}
                      className="form-check-input"
                    />
                    <label htmlFor="" className="form-check-label">
                      Rent
                    </label>
                  </div>
                </div>

                <div className="col-md-5">
                  <label htmlFor="" className="form-label">
                    Property type
                  </label>
                  <br />
                  {renderType}
                </div>

                {type === "" ? "" : <label> {type} Specifications </label>}
                <div className="d-flex flex-wrap ">{renderSpecifications}</div>
                <div>
      {
        purpose === 'rent' ? 
     
                  <div className="row flex">
                    <div className="col-md-5">
                      {" "}
                      <label htmlFor="" className="form-label">
                        Total Number of rooms
                      </label>
                      <input
                        type="number"
                        value={totalRooms}
                        onChange={(e) => setTotalRooms(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-5">
                      {" "}
                      <label htmlFor="" className="form-label">
                        Total Number of Available rooms
                      </label>
                      <input
                        type="number"
                        value={availableRooms}
                        onChange={(e) => setAvailableRooms(e.target.value)}
                        // onChange={(e) => setAddress(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                   : ""} 
                </div>

                <div className="d-flex justify-content-center mx-auto">
                  {/* <Link to="/agent/properties"> */}{" "}
                  <button
                    onClick={createProperty}
                    className="btn btn-primary px-5"
                  >
                    SAVE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default AddProperties;
