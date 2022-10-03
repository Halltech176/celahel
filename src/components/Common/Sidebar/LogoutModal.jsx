import { motion } from "framer-motion";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

export const LogoutModal = ({ open, setIsOpen, ToggleModal }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setIsOpen(!open);
    navigate("/login");
  };

  Modal.setAppElement("#root");
  return (
    <Modal
      isOpen={open}
      onRequestClose={ToggleModal}
      className="logout_modal "
      content-label="Logout Modal"
      overlayClassName="Modal_Overlay"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className=" d-flex justify-content-center flex-column align-items-center">
          <h2>Are you sure you want to logout?</h2>
          <div className="logout_btns">
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-primary"
            >
              No
            </button>
            <button onClick={handleLogout} className="btn btn-outline-primary">
              Yes
            </button>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
};
