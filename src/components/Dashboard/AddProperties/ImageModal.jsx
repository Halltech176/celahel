import Modal from "react-modal";
import axios from 'axios';
import { motion } from "framer-motion";
import style from './AddProperties.module.css'
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
    //         const response = await axios.put(`https://celahl.herokuapp.com/api//property/update-images/${img._id}`,  {
    //     headers: {
    //       Authorization: `Bearer ${token} `,
    //     },
    //   })
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
        <button onClick={updateImage} className='btn btn-primary'> update </button>
       </div>
        </Modal>
     </>
}
