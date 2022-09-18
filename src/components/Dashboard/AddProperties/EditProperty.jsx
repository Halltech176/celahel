import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Sidebar from "../../Common/Sidebar/Sidebar";
import { CgArrowLongLeft } from "react-icons/cg";
import properties from "./AddProperties.module.css";
import Loader from "../../Common/Loader";
import property_image from "../../../Assets/house.png";
import { Link } from "react-router-dom";
import {
  Properties as AllProperties,
  Property as ActiveProperty,
  EditProperty as Edit,
} from "../../../Redux/actions";
import { useNavigate } from "react-router-dom";
import searchBtn from "../../../Assets/SearchVector.png";
import { ToastContainer, Zoom } from "react-toastify";
import { ErrorNotification, InfoNotification } from "../../Common/ErrorToast";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
const EditProperty = () => {
  const id = window.JSON.parse(localStorage.getItem("id"));
  const dispatch = useDispatch();
  useEffect(() => {
    ActiveProperty(id);
  }, []);

  const { loading, Property, error } = useSelector((state) => state.property);
  const propt = useSelector((state) => state);

  const allprop = useSelector((state) => state.properties);
  const {
    loading: editLoading,
    error: editError,
    editedproperty,
  } = useSelector((state) => state.editproperty);

  const [name, setName] = useState(Property?.name);
  const [description, setDescription] = useState(Property?.description);
  const [price, setPrice] = useState(Property?.price);
  const [address, setAddress] = useState(Property?.address);
  const [images, setImages] = useState("");
  const [image, setImage] = useState("properties");
  const [purpose, setPurpose] = useState(Property?.purpose);
  const [house, setHouse] = useState(false);
  const [relaxation, setRelaxation] = useState(false);
  const [land, setLand] = useState(false);
  const [hostel, setHostel] = useState(false);
  const [specifications, setSpecifications] = useState([]);
  const [type, setType] = useState("");
  const [fileRef, setFileRef] = useState("");
  const [mainImg, setMainImg] = useState("");

  const handleFile = (e) => {
    setMainImg(e.target.src);
  };
  const navigate = useNavigate();

  const checkPurpose = (e) => {
    setPurpose(e.target.id);
  };
  const checkType = (e) => {
    setType(e.target.id);
    if (e.target.id === "house") {
      setHouse(true);
      setRelaxation(false);
      setLand(false);
      setHostel(false);
      console.log(house);
    }
    if (e.target.id === "relaxation") {
      console.log(e.target.id);
      setRelaxation(true);
      setHouse(false);
      setLand(false);
      setHostel(false);
    }

    if (e.target.id === "hostel") {
      setHostel(true);
      setRelaxation(false);
      setLand(false);
      setHouse(false);
    }

    if (e.target.id === "land") {
      setLand(true);
      setRelaxation(false);
      setHouse(false);
      setHostel(false);
    }
  };

  const checkSpecifications = (e) => {
    console.log(e.target);
    // console.log([...new Set(e.target.value.split(","))]);
    const filtered = specifications.filter((spec) => {
      return spec === e.target.id;
    });

    console.log(filtered);
    console.log(filtered.length);
    if (filtered.length === 0) {
      setSpecifications(
        [...new Set(e.target.value.split(",")), e.target.id].filter(
          (val) => val !== ""
        )
      );
    }
    if (filtered.length === 1) {
      setSpecifications(
        [...new Set(e.target.value.split(",")), e.target.id].filter(
          (val) => val !== filtered[0]
        )
      );
    }
  };

  const handleChange = (e) => {
    setImages(e.target.files);
    console.log(e.target.files);
  };
  // console.log(images);
  const token = window.JSON.parse(localStorage.getItem("token"));
  const UpdateProperty = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();

      formData.append("file", image);
      Array.from(images).forEach((item, index) => {
        formData.append("images", item);
      });
      specifications.forEach((specs) => {
        formData.append("specifications", specs);
      });
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("address", address);

      formData.append("type", type);
      formData.append("purpose", purpose);
      console.log(specifications);
      console.log(Array.from(formData));

      const response = await dispatch(Edit(formData)).unwrap();

      if (response !== null) {
        InfoNotification("property successfully updated");
        const response = await dispatch(AllProperties());
        console.log(response);

        if (response.type === "properties/fulfilled") {
          navigate("/properties");
        }
      }

      // }
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
      {loading || editLoading ? (
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
                  Edit Property
                </h2>
              </div>
              <h4 className="text-primary my-4">
                note:- Edit only features you need to update
              </h4>
              <div className={`${properties.properties_image} m3-4`}>
                <div
                  className={`${properties.main_img_container} mx-3 no-values`}
                >
                  {mainImg ? (
                    <img
                      src={mainImg}
                      className={`${properties.main_img}`}
                      alt="img"
                    />
                  ) : (
                    <h4>click on the image to preview</h4>
                  )}
                </div>
                <div className={`${properties.image_container} mx-3 no-values`}>
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
                    <h4>Selected images would be shown here</h4>
                  )}
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
                      id="hostel"
                      value={type}
                      onChange={checkType}
                      name="type"
                      type="radio"
                      className="form-check-input"
                    />
                    <label htmlFor="" className="form-check-label">
                      Hostel
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

                <div
                  className={`col-md-5 hide-spec ${house && "property-spec"}`}
                >
                  <label htmlFor="" className="form-label">
                    House Specification
                  </label>
                  <br />
                  <div className="form-check form-check-inline">
                    <input
                      value={specifications}
                      onChange={checkSpecifications}
                      type="checkbox"
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
                      type="checkbox"
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
                      type="checkbox"
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
                      value={specifications}
                      onChange={checkSpecifications}
                      type="checkbox"
                      id="fence"
                      name="spec"
                      className="form-check-input"
                    />
                    <label htmlFor="" className="form-check-label">
                      Fence
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      value={specifications}
                      onChange={checkSpecifications}
                      type="checkbox"
                      id="well water"
                      name="spec"
                      className="form-check-input"
                    />
                    <label htmlFor="" className="form-check-label">
                      Well Water
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      value={specifications}
                      onChange={checkSpecifications}
                      type="checkbox"
                      id="borehole"
                      name="spec"
                      className="form-check-input"
                    />
                    <label htmlFor="" className="form-check-label">
                      Borehole
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      value={specifications}
                      onChange={checkSpecifications}
                      type="checkbox"
                      id="prepaid light source"
                      name="spec"
                      className="form-check-input"
                    />
                    <label htmlFor="" className="form-check-label">
                      Prepaid light source
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      value={specifications}
                      onChange={checkSpecifications}
                      type="checkbox"
                      id="Postpaid light soure"
                      name="spec"
                      className="form-check-input"
                    />
                    <label htmlFor="" className="form-check-label">
                      post paid light source
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      value={specifications}
                      onChange={checkSpecifications}
                      type="checkbox"
                      id="stable light"
                      name="spec"
                      className="form-check-input"
                    />
                    <label htmlFor="" className="form-check-label">
                      Stable Light
                    </label>
                  </div>
                </div>

                <div
                  className={`col-md-5 hide-spec ${hostel && "property-spec"}`}
                >
                  <label htmlFor="" className="form-label">
                    Hostel Specification
                  </label>{" "}
                  <br />
                  <div className="form-check form-check-inline">
                    <input
                      value={specifications}
                      onChange={checkSpecifications}
                      type="checkbox"
                      name="spec"
                      id="self-contain"
                      className="form-check-input"
                    />
                    <label htmlFor="" className="form-check-label">
                      self contain
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      value={specifications}
                      onChange={checkSpecifications}
                      type="checkbox"
                      name="spec"
                      id="single - room - general - kitchen"
                      className="form-check-input"
                    />
                    <label htmlFor="" className="form-check-label">
                      Single Room General Kitchen
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      value={specifications}
                      onChange={checkSpecifications}
                      type="checkbox"
                      name="spec"
                      id="single - room - general - toilet"
                      className="form-check-input"
                    />
                    <label htmlFor="" className="form-check-label">
                      Single Room General Toilet
                    </label>
                  </div>
                </div>

                <div
                  className={`col-md-5 hide-spec ${land && "property-spec"}`}
                >
                  <label htmlFor="" className="form-label">
                    Land Specification
                  </label>{" "}
                  <br />
                  <div className="form-check form-check-inline">
                    <input
                      value={specifications}
                      onChange={checkSpecifications}
                      type="checkbox"
                      name="spec"
                      id="1-hectare"
                      className="form-check-input"
                    />
                    <label htmlFor="" className="form-check-label">
                      1 hectare
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      value={specifications}
                      onChange={checkSpecifications}
                      type="checkbox"
                      name="spec"
                      id="2-more-hectare"
                      className="form-check-input"
                    />
                    <label htmlFor="" className="form-check-label">
                      2 or more hectare
                    </label>
                  </div>
                </div>

                <div
                  className={`col-md-5 hide-spec ${
                    relaxation && "property-spec"
                  }`}
                >
                  <label htmlFor="" className="form-label">
                    Relaxation Specification
                  </label>{" "}
                  <br />
                  <div className="form-check form-check-inline">
                    <input
                      value={specifications}
                      onChange={checkSpecifications}
                      type="checkbox"
                      name="spec"
                      id="kitchen"
                      className="form-check-input"
                    />
                    <label htmlFor="" className="form-check-label">
                      Kitchen
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      value={specifications}
                      onChange={checkSpecifications}
                      type="checkbox"
                      name="spec"
                      id="family-bed"
                      className="form-check-input"
                    />
                    <label htmlFor="" className="form-check-label">
                      Family Bed
                    </label>
                  </div>
                </div>
                <div className="d-flex justify-content-center mx-auto">
                  {/* <Link to="/properties">
                {" "} */}
                  <button
                    onClick={UpdateProperty}
                    className="btn btn-primary px-5"
                  >
                    Update
                  </button>
                  {/* </Link> */}
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default EditProperty;
