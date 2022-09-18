import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../../Common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Properties as AllProperties, Property } from "../../../Redux/actions";
import PropertyView from "./PropertyView";
import properties from "./Properties.module.css";
import searchBtn from "../../../Assets/SearchVector.png";
import { ToastContainer, Zoom } from "react-toastify";
import { ErrorNotification, InfoNotification } from "../../Common/ErrorToast";
import "react-toastify/dist/ReactToastify.css";
import NoValues from "../NoValues";

const Properties = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { properties, loading, error } = useSelector(
    (state) => state.properties
  );
  const [count, setCount] = useState(2);

  const handleIncrease = async () => {
    try {
      console.log(count);
      if (count === properties?.totalPages) {
        setCount(1);
      }
      setCount(count + 1);

      // await dispatch(AllProperties(1));
      const response = await dispatch(AllProperties({ page: count }));
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
        setCount(properties?.totalPages);
      }

      const response = await dispatch(AllProperties({ page: count }));
      if (response.type === "properties/rejected") {
        throw "please check your internet connection";
      }
    } catch (err) {
      ErrorNotification(err);
    }
  };

  const handlePaginate = async (index) => {
    try {
      const response = await dispatch(AllProperties({ page: index }));
      if (response.type === "properties/rejected") {
        throw "please check your internet connection";
      }
    } catch (err) {
      ErrorNotification(err);
    }
  };

  const handleSearch = async (val) => {
    const response = properties?.docs?.filter((data) => {
      return (
        data?.name === val ||
        data?.price === val ||
        data?.address === val ||
        data?.purpose === val
      );
    });
    const result = await dispatch(AllProperties({ value: val }));
    console.log(result);
    return result;
  };

  useEffect(() => {
    dispatch(AllProperties());
  }, []);

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
          <PropertyView
            property={properties?.docs}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
            handlePaginate={handlePaginate}
            properties={properties}
            handleSearch={handleSearch}
            count={count}
            setCount={setCount}
          />
        </motion.div>
      )}
    </>
  );
};
export default Properties;
