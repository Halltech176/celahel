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
  console.log(PropertiesSpecifications);
  console.log(PropertyType);
  const dispatch = useDispatch();

  const id = window.JSON.parse(localStorage.getItem("id"));

  useEffect(() => {
    dispatch(ActiveProperty(id));
  }, []);

  const { loading, Property, error } = useSelector((state) => state.property);

  const allprop = useSelector((state) => state.properties);
  const {
    loading: editLoading,
    error: editError,
    editedproperty,
  } = useSelector((state) => state.editproperty);
  console.log(Property);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);
  const [image, setImage] = useState("properties");
  const [purpose, setPurpose] = useState("");

  const [specifications, setSpecifications] = useState([]);
  const [type, setType] = useState("");
  const [fileRef, setFileRef] = useState("");
  const [coverImage, setCoverImage] = useState(Property?.coverImage?.url);
  const [availableRooms, setAvailableRooms] = useState(
    Property?.availableRooms
  );
  const [totalRooms, setTotalRooms] = useState(Property?.totalRooms);
  const [specificationsValue, SetSpecificationsValue] = useState(
    Property?.specifications
  );
  useEffect(() => {
    setName(Property?.name);
    setDescription(Property?.description);
    setPrice(Property?.price);
    setPurpose(Property?.purpose);
    setAddress(Property?.address);
    setImages(Property?.images);
    setType(Property?.type);
    SetSpecificationsValue(Property?.specifications);
  }, []);

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
        specificationsValue.filter((val) => val !== value)
      );
    }
  };
  console.log(specificationsValue);
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
      const updates = {
        name,
        price,
        purpose,
        specifications: specificationsValue,
        description,
        type,
        availableRooms,
        totalRooms,
      };
      console.log(updates);

      const response = await dispatch(Edit(updates)).unwrap();
      console.log(response);

      if (response !== null) {
       
        const response = await dispatch(AllProperties());
        console.log(response);

        if (response.type === "properties/fulfilled") {
           InfoNotification("Property successfully updated");
           setTimeout(() => {
             navigate("/agent/properties");
           }, 2000);
          
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
          // navigate("/agent/upgrade");
        }, 3000);
      }
    }
  };
  const Back = () => {
    navigate(-1);
  };
  console.log(loading, error, Property);
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
                {/* <div className="col-md-5">
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
                </div> */}
                <div className="col-md-12">
                  <button onClick={ToggleModal2} className="btn btn-primary">
                    Update Images
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
                  {/* {purpose === "rent" ? ( */}
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
                  {/* ) : (
                    ""
                  )} */}
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
