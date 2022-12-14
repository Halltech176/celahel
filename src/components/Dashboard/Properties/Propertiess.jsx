import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Sidebar from "../../Common/Sidebar/Sidebar";
import { CgArrowLongLeft } from "react-icons/cg";
import properties from "./AddProperties.module.css";
import property_image from "../../../Assets/house.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import searchBtn from "../../../Assets/SearchVector.png";
import { ImageModal, MoreImages } from "./ImageModal";
import { ToastContainer, Zoom } from "react-toastify";
import {
  EditProperty as Edit,
  Properties as AllProperties,
  Property as ActiveProperty,
} from "../../../Redux/actions";
import { PropertiesSpecifications, PropertyType } from "./Specifications";
import {
  ErrorNotification,
  InfoNotification,
  SuccessNotification,
} from "../../Common/ErrorToast";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Common/Loader";
const EditProperties = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ActiveProperty());
  }, []);

  const { loading, Property, error } = useSelector((state) => state.property);
  // const pro = useSelector((state) => state.property);
  console.log(Property);
  const allprop = useSelector((state) => state.properties);
  const {
    loading: editLoading,
    error: editError,
    editedproperty,
  } = useSelector((state) => state.editproperty);

  const [name, setName] = useState("");
  const [description, setDescription] = useState();
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);
  const [image, setImage] = useState("properties");
  const [purpose, setPurpose] = useState();
  const [house, setHouse] = useState(false);
  const [relaxation, setRelaxation] = useState(false);
  const [land, setLand] = useState(false);
  const [hostel, setHostel] = useState(false);
  const [specifications, setSpecifications] = useState([]);
  const [type, setType] = useState("");
  const [fileRef, setFileRef] = useState("");
  const [coverImage, setCoverImage] = useState();
  const [availableRooms, setAvailableRooms] = useState("");
  const [totalRooms, setTotalRooms] = useState("");

  const [specificationsValue, SetSpecificationsValue] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [img, setImg] = useState({});

  const ToggleModal = () => {
    setOpen(!open);
  };
  const ToggleModal2 = (e) => {
    e.preventDefault();
    setOpen2(!open2);
  };

  const GetSpecifications = (value) => {
    const specs = PropertiesSpecifications.filter((data, index) => {
      return data.type === value;
    });
    setSpecifications(specs);
    console.log(specs);
  };
  useEffect(() => {
    GetSpecifications(Property?.type);
  }, []);

  const CheckSpecifications = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      SetSpecificationsValue([...specificationsValue, value]);
    } else {
      SetSpecificationsValue(
        specificationsValue?.filter((val) => val !== value)
      );
    }
  };

  const CheckType = (e) => {
    setType(e.target.value);
    GetSpecifications(e.target.value);
  };
  const propertyPurpose = ["sale", "rent"];

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
  const renderPurpose = propertyPurpose.map((data, index) => {
    return (
      <div
        key={index}
        className="form-check flex  align-items-center form-check-inline"
      >
        <input
          className="form-check-input "
          type="radio"
          name="purpose"
          value={data}
          checked={purpose === data}
          onChange={(e) => setPurpose(e.target.value)}
        />
        <label htmlFor="" className="form-check-label">
          {data}
        </label>
      </div>
    );
  });
  const renderSpecifications = specifications?.map((data, index) => {
    return (
      <div key={data.value} className="form-check form-check-inline">
        <input
          checked={specificationsValue?.includes(data.value)}
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

  const handleFile = (e) => {
    const image = Property?.images.find((img, index) => {
      return img?.url === e.target.src;
    });
    setImg(image);
    setOpen(true);

    console.log(image);
  };
  const navigate = useNavigate();

  const checkPurpose = (e) => {
    setPurpose(e.target.id);
    console.log(purpose);
  };

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
  const UpdateProperty = async (e) => {
    e.preventDefault();
    const handleMainImage = (e) => {
      console.log(e.target.files[0]);
      setCoverImage(e.target.files[0]);
      // console.log(coverImage);
    };
    try {
      let formData = new FormData();
      console.log(name, purpose);

      formData.append("file", image);
      Array.from(images)?.forEach((item, index) => {
        console.log(item);
        formData.append("images", item);
      });
      specifications.forEach((specs) => {
        formData.append("specifications", specificationsValue);
      });
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("address", address);

      formData.append("type", type);
      formData.append("purpose", purpose);
      formData.append("totalRooms", totalRooms);
      formData.append("availableRooms", availableRooms);
      formData.append("coverImage", coverImage);
      console.log(Array.from(formData));

      const response1 = await dispatch(Edit(formData)).unwrap();
      console.log(response1);
      // if (response1 !== null) {
      //   InfoNotification("Property successfully updated");
      //   const response = await dispatch(AllProperties());
      // console.log(response1);

      // if (response.type === "properties/fulfilled") {
      //   navigate("/agent/properties");
      // }
      // }

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

      ErrorNotification(err?.response?.data?.message);
      // if (err?.response?.data?.message?.split(" ").length > 12) {
      //   setTimeout(() => {
      //     navigate("/agent/upgrade");
      //   }, 3000);
      // }
    }
  };
  const Back = () => {
    navigate(-1);
  };

  return (
    <>
      {editLoading && !editError && loading ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ToastContainer transition={Zoom} autoClose={800} />
          <Sidebar />
          <ImageModal
            open={open}
            img={img}
            setOpen={setOpen}
            ToggleModal={ToggleModal}
          />
          <MoreImages
            open={open2}
            Property={Property}
            setOpen={setOpen2}
            ToggleModal={ToggleModal2}
          />
          <div className={`${properties.property_container}`}>
            <div className="row">
              <div className="col-md-8 d-flex align-items-center">
                <CgArrowLongLeft size="1.8rem" onClick={Back} />
                <h2 className={`${properties.profile_text} ms-4  text-primary`}>
                  {" "}
                  Edit Property
                </h2>
              </div>
              <h4 className="text-primary my-4">Upload Property Picture</h4>
              <div className={`${properties.properties_image} `}>
                <div className={`${properties.main_img_container} me-3`}>
                  {coverImage ? (
                    <img
                      src={
                        typeof coverImage === "string"
                          ? coverImage
                          : URL.createObjectURL(coverImage)
                      }
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
                        <h4>Cover image would be preview here </h4>{" "}
                      </div>
                    </div>
                  )}
                </div>
                <div className={`${properties.image_container}  `}>
                  {images ? (
                    Array.from(images)?.map((item, index) => {
                      return (
                        <img
                          onClick={handleFile}
                          key={index}
                          className={`${properties.property_image}`}
                          src={item ? item?.url : null}
                        />
                      );
                    })
                  ) : (
                    <div className="no-values">
                      <h4>Selected images would be shown here</h4>
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
                    update cover image
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
                    update all images
                  </label>
                  <input
                    // value={image}
                    multiple
                    onChange={handleChange}
                    type="file"
                    className="form-control"
                  />
                </div>
                <div className="col-md-12">
                  <button onClick={ToggleModal2} className="btn btn-primary">
                    Add More Images{" "}
                  </button>
                </div>

                <div className="col-md-5">
                  <label htmlFor="" className="form-label d-block">
                    Did you want to Sell Rent the property?
                  </label>
                  {renderPurpose}
                </div>

                <div className="col-md-5">
                  <label htmlFor="" className="form-label">
                    Property type
                  </label>
                  <br />
                  {renderType}
                </div>

                {specificationsValue?.length === 0 ? (
                  ""
                ) : (
                  <label> {type} Specifications </label>
                )}
                <div className="d-flex flex-wrap ">{renderSpecifications}</div>
                <div>
                  {purpose === "rent" ? (
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
                  ) : (
                    ""
                  )}
                </div>

                <div className="d-flex justify-content-center mx-auto">
                  {/* <Link to="/agent/properties"> */}{" "}
                  <button
                    onClick={UpdateProperty}
                    className="btn btn-primary px-5"
                  >
                    Update
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

export default EditProperties;
