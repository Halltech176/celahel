import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import style from "../AddProperties/AddProperties.module.css";
import { ToastContainer, Zoom } from "react-toastify";
import {
  ErrorNotification,
  InfoNotification,
  SuccessNotification,
} from "../../Common/ErrorToast";
export const PropertiesModal = ({ open, data, ToggleModal }) => {
    console.log(data)
  const token = window.JSON.parse(localStorage.getItem("token"));
  const updateImage = async () => {
    try {
      const response = await axios.put(
        `https://celahl.herokuapp.com/api//property/update-images/${data._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        }
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }
    // return ()
  };

  return (
    <>
      <Modal
        isOpen={open}
        onRequestClose={ToggleModal}
        content-label="My Dialog"
        className={`${style.image_modal}`}
      >
     
        <div>
          <p>
            <span className="text-primary"> Name </span> - {data?.name}{" "}
          </p>
          <p>
            <span className="text-primary"> Price </span> - {data?.price}{" "}
          </p>
          <p>
            <span className="text-primary"> Updated at </span> -{" "}
            {new Date(data?.updatedAt)?.toLocaleDateString()}{" "}
          </p>
          <p>
            <span className="text-primary"> Address </span> -{" "}
            {data?.address}
          </p>
          <p>
            <span className="text-primary"> Type </span> - {data?.type}{" "}
          </p>
          <p>
            <span className="text-primary"> Available </span> - {data?.available ? 'Available' : "Not available"}{" "}
          </p>
          <p>
            <span className="text-primary"> Number of images </span> - {data?.images?.length}{" "}
          </p>
          <p>
            <span className="text-primary"> Purpose </span> - {data?.purpose}{" "}
          </p>
          <p>
            <span className="text-primary"> Specifications </span> - {data?.specifications?.join(',')}{" "}
          </p>
        </div>

        <div className="flex justify-content-between my-3">
          <button onClick={ToggleModal} className="btn btn-primary">
            {" "}
            close{" "}
          </button>
          {/* <button onClick={updateImage} className='btn btn-primary'> update </button> */}
        </div>
      </Modal>
    </>
  );
};