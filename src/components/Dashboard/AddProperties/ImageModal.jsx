import Modal from "react-modal";
import {useNavigate} from 'react-router-dom';

import {useState} from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import style from './AddProperties.module.css'
import { ToastContainer, Zoom } from "react-toastify";
import {
  ErrorNotification,
  InfoNotification,
  SuccessNotification,
} from "../../Common/ErrorToast";
export const ImageModal = ({open,img, ToggleModal}) => {
    
    const token = window.JSON.parse(localStorage.getItem("token"));
    const updateImage = async () => {
        try {
                const response = await axios.put(
      `https://celahl.herokuapp.com/api//property/update-images/${img._id}`,{},
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    
            console.log(response)
        }catch(err) {
            console.log(err)
        }
        // return ()
    }
    console.log(img)
    return <>
      <Modal
          isOpen={open}
          onRequestClose={ToggleModal}
          content-label="My Dialog"
          className={`${style.image_modal}`}
        >
      
        <div className={`${style.main_img_container} me-3`}>
                 
                    <img
                      src={img.url}
                      className={`${style.main_img}`}
                      alt="img"
                    />
                    </div>
                      <div> 
        <p><span className='text-primary'> Name </span> - {img?.name} </p>
        <p><span className='text-primary'> Format </span> - {img?.format} </p>
        <p><span className='text-primary'> Updated at </span> - {new Date(img?.updatedAt)?.toLocaleDateString()} </p>
        <p><span className='text-primary'> Size </span> - {img?.metadata?.width} / {img?.metadata?.height} </p>
        <p><span className='text-primary'> Type </span> - {img?.type} </p>
       

        </div>
        
       <div className='flex justify-content-between my-3'> 
        <button onClick={ToggleModal} className='btn btn-primary'> close </button>
        {/* <button onClick={updateImage} className='btn btn-primary'> update </button> */}
       </div>
        </Modal>
     </>
}

export const MoreImages = ({open,Property, setOpen, ToggleModal}) => {
    const navigate = useNavigate()
    let formData = new FormData();
     const [images, setImages] = useState([]);
       const [image, setImage] = useState("properties");
  
     const handleChange = (e) => {
    setImages(e.target.files);
    console.log(e.target.files);
  };
    formData.append("file", image);
      Array.from(images).forEach((item, index) => {
        formData.append("images", item);
      });
    const token = window.JSON.parse(localStorage.getItem("token"));
    const updateImage = async () => {
        try {
                const response = await axios.put(
      `https://celahl.herokuapp.com/api//property/update-images/${Property?._id}`,formData,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
                if(response.status === 200) {
                    SuccessNotification(response.data.message)
                    setOpen(false)
                    navigate('/agent/properties')
                }
            console.log(response)
        }catch(err) {
            ErrorNotification(err.response.data.message)
            console.log(err.response.data.message)
        }
        // return ()
    }
    console.log(Property)
    return <>
       <ToastContainer transition={Zoom} autoClose={800} />
      <Modal
          isOpen={open}
          onRequestClose={ToggleModal}
          content-label="My Dialog"
          className={`${style.image_modal}`}
        >
         <div>
                  <label htmlFor="" className="form-label">
                   Add Images
                  </label>
                  <input
                    // value={image}
                    multiple
                    onChange={handleChange}
                    type="file"
                    className="form-control"
                  />
                </div>
          <div className='flex justify-content-between my-5'> 

        <button onClick={ToggleModal} className='btn btn-danger mx-5'> close </button>
        <button onClick={updateImage} className='btn btn-primary'> update </button>
       </div>
    
        </Modal>
     </>
}
