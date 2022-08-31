import React from "react";
import { Modal } from "@mui/material";

const ModalComponent = ({ open, handleClose, children, ...otherProps }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    bottom: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 600,
    minHeight: 300,
    boxShadow: 24
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      {...otherProps}
    >
      {/* Modal */}
      <div className="card shadow-lg rounded-lg py-4 px-2" style={{...style, width:400, height: 500}}>
        <div className="container">{children}</div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
