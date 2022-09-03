import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../Common/Sidebar/Sidebar";
import { CgArrowLongLeft } from "react-icons/cg";
import properties from "./AddProperties.module.css";
import property_image from "../../../Assets/house.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import searchBtn from "../../../Assets/SearchVector.png";
import { ToastContainer, Zoom } from "react-toastify";
import { ErrorNotification, InfoNotification } from "../../Common/ErrorToast";
import "react-toastify/dist/ReactToastify.css";
const AddProperties = () => {
  const [name, setName] = useState("d-villa");
  const [description, setDescription] = useState("nice place");
  const [price, setPrice] = useState("2000");
  const [address, setAddress] = useState("ile-ewe");
  const [images, setImages] = useState("");
  const [image, setImage] = useState("properties");
  const [purpose, setPurpose] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [type, setType] = useState("");
  const [fileRef, setFileRef] = useState("");
  const [mainImg, setMainImg] = useState(null);

  const handleFile = (e) => {
    setMainImg(e.target.src);
  };
  const navigate = useNavigate();

  const checkPurpose = (e) => {
    setPurpose(e.target.id);
    // console.log(purpose);
  };
  const checkType = (e) => {
    setType(e.target.id);
    // console.log(type);
  };
  const checkSpecifications = (e) => {
    setSpecifications(e.target.id);
    // console.log(type);
  };
  const handleChange = (e) => {
    setImages(e.target.files);
    console.log(e.target.files);
  };
  console.log(images);
  const token = window.JSON.parse(localStorage.getItem("token"));
  const createProperty = async (e) => {
    e.preventDefault();

    try {
      const url = " https://celahl.herokuapp.com/api//property/";
      //   let formData = new FormData();
      //   formData.append("file", file);

      //   Array.from(image).forEach((item) => {
      //     formData.append("filename", item?.name);
      //   });
      //   console.log(formData);
      // };
      let formData = new FormData();

      formData.append("file", image);
      Array.from(images).forEach((item, index) => {
        formData.append("images", item);
      });
      console.log(Array.from(formData));
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("address", address);
      formData.append("specifications", specifications);
      formData.append("type", type);
      formData.append("purpose", purpose);

      console.log(formData);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token} `,
        },
      };
      const data = await axios.post(url, formData, config);

      if (data.status === 201) {
        InfoNotification(data.data.message);
        setTimeout(() => {
          // navigate("/properties");
        }, 2000);
      }
      console.log(data);
    } catch (err) {
      // if(err.)
      console.log(err);
      if (
        err.message === "timeout exceeded" ||
        err.message === "Network Error"
      ) {
        ErrorNotification("please check your internet connection");
      }
      ErrorNotification(err.response.data.message);
      if (err.response.data.message.split(" ").length > 12) {
        setTimeout(() => {
          navigate("/upgrade");
        }, 3000);
      }
    }
  };
  const Back = () => {
    navigate(-1);
  };
  return (
    <>
      <ToastContainer transition={Zoom} autoClose={800} />
      <Sidebar />
      <div className={`${properties.property_container}`}>
        <div className="row">
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
          {/* <div></div> */}
          <div className="col-md-8 d-flex align-items-center">
            <CgArrowLongLeft size="1.8rem" onClick={Back} />
            <h2 className={`${properties.profile_text} ms-4  text-primary`}>
              {" "}
              Edit properties
            </h2>
          </div>
          <h4 className="text-primary my-4">Upload Property Picture</h4>
          <div className={`${properties.properties_image} m3-4`}>
            <div className={`${properties.main_img_container}`}>
              <img
                src={mainImg}
                className={`${properties.main_img}`}
                alt="img"
              />
            </div>
            <div className={`${properties.image_container}`}>
              {Array.from(images).map((item, index) => {
                return (
                  <img
                    onClick={handleFile}
                    key={index}
                    className={`${properties.property_image}`}
                    src={item ? URL.createObjectURL(item) : null}
                  />
                );
              })}
            </div>
          </div>
          <h5 className="text-primary fw-100">
            Enter Correct Property Details
          </h5>

          <form
            id="form-container"
            className="w-100 my-3 px-5 row g-4 justify-content-start"
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
                upload file
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
              <label htmlFor="" className="form-label">
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
                  sell
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
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="type"
                  id="house"
                  value={type}
                  onChange={checkType}
                  className="form-check-input"
                />
                <label htmlFor="" className="form-check-label">
                  House
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  id="hotel"
                  value={type}
                  onChange={checkType}
                  name="type"
                  type="radio"
                  className="form-check-input"
                />
                <label htmlFor="" className="form-check-label">
                  Hotel
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  id="land"
                  value={type}
                  onChange={checkType}
                  name="type"
                  type="radio"
                  className="form-check-input"
                />
                <label htmlFor="" className="form-check-label">
                  land
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  id="relaxation"
                  value={type}
                  onChange={checkType}
                  name="type"
                  type="radio"
                  className="form-check-input"
                />
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
                <input
                  value={specifications}
                  onChange={checkSpecifications}
                  type="radio"
                  name="spec"
                  id="bathroom"
                  className="form-check-input"
                />
                <label htmlFor="" className="form-check-label">
                  Bathroom
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  value={specifications}
                  onChange={checkSpecifications}
                  type="radio"
                  name="spec"
                  id="toilet"
                  className="form-check-input"
                />
                <label htmlFor="" className="form-check-label">
                  Toilet
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  value={specifications}
                  onChange={checkSpecifications}
                  type="radio"
                  name="spec"
                  id="waste bin"
                  className="form-check-input"
                />
                <label htmlFor="" className="form-check-label">
                  Waste Bin
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="Relaxation"
                  name="spec"
                  className="form-check-input"
                />
                <label htmlFor="" className="form-check-label">
                  Relaxation
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  value={specifications}
                  onChange={checkSpecifications}
                  type="radio"
                  id="stable light"
                  name="spec"
                  className="form-check-input"
                />
                <label htmlFor="" className="form-check-label">
                  Stable Light
                </label>
              </div>
            </div>
            <div className="d-flex justify-content-center mx-auto">
              {/* <Link to="/properties">
                {" "} */}
              <button onClick={createProperty} className="btn btn-primary px-5">
                SAVE
              </button>
              {/* </Link> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProperties;
