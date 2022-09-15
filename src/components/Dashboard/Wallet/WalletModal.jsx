import Modal from "react-modal";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import wallet from "./Wallet.module.css";
import { CgArrowLongLeft } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, Zoom } from "react-toastify";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../Common/ErrorToast";
import { User } from "../../../Redux/actions";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Common/Loader";

export const RequestOTP = ({ open, setOpen, ToggleModal, ToggleModal2 }) => {
  const [amount, setAmount] = useState("");
  const [Plan, setPlan] = useState("Wallet");

  const generateTransaction = async () => {
    try {
      const data = {
        amount,
        purpose: Plan,
      };
      const token = window.JSON.parse(localStorage.getItem("token"));
      const response = await axios.post(
        "https://celahl.herokuapp.com/api//transaction/generate",
        data,
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        }
      );
      console.log(response.data.data);
      if (response.status === 200) {
        const data = {
          callback_url: "http://localhost:3000/agent-wallet",
          // amount: response.data.data.amount,
          reference: response.data.data.reference,
        };
        console.log(data);
        const addmoney = await axios.post(
          "https://celahl.herokuapp.com/api//transaction/initiate",
          data,
          {
            headers: {
              Authorization: `Bearer ${token} `,
            },
          }
        );
        if (addmoney.status === 200) {
          const url = window.open(
            addmoney.data.data.authorization_url,
            "_blank"
          );
          console.log(url);
        }
        console.log(addmoney);
      }
      await axios.get("https://celahl.herokuapp.com/api//transaction/verify");
    } catch (err) {
      ErrorNotification(err?.response?.data?.message);
      console.log(err);
    }
  };
  console.log(amount);
  Modal.setAppElement("#root");
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Modal
          isOpen={open}
          onRequestClose={ToggleModal}
          content-label="My Dialog"
          className={`${wallet.wallet_modal}`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className=" d-flex justify-content-between align-items-center">
              <CgArrowLongLeft size="1.8rem" onClick={() => setOpen(false)} />
              <h2 className={`${wallet.wallet_heading} ms-4  `}>
                Make Payment
              </h2>
            </div>
            <div className="d-flex flex-column">
              <div className="col-12 my-4">
                <input
                  type="number"
                  placeholder="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="form-control border-primary"
                />
              </div>

              <div className="col-12 my-4">
                <input
                  style={{ cursor: "not-allowed" }}
                  type="text"
                  disabled
                  value={Plan}
                  placeholder="Transaction Type"
                  className="form-control border-primary"
                />
              </div>
              <div className="d-flex mt-4 justify-center mx-auto align-items-center">
                <button
                  onClick={generateTransaction}
                  //   onClick={ToggleModal2}
                  className="btn btn-modal px-3 btn-primary text-center"
                >
                  Fund Wallet
                </button>
              </div>
            </div>
          </motion.div>
        </Modal>
      </div>
    </>
  );
};

export const SendOTP = ({ open, setOpen, ToggleModal, bankID }) => {
  const [values, setValues] = useState([]);
  const [value, setValue] = useState("");
  const [withdrawValue, setWithdrawValue] = useState("");
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.userprofile);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const data = {
      amount: withdrawValue,
      bankId: bankID,
    };
    try {
      const token = window.JSON.parse(localStorage.getItem("token"));
      const response = await axios.post(
        "https://celahl.herokuapp.com/api//wallet/withdrawal",
        data,
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        }
      );

      if (response.status === 200) {
        SuccessNotification("Money successfully withdrew");
        dispatch(User());
      }

      console.log(response?.data?.data?._id);

      setOpen(false);
      console.log(response);
    } catch (err) {
      ErrorNotification(err?.response?.data?.message);
      console.log(err);
    }
  };

  Modal.setAppElement("#root");
  const navigate = useNavigate();
  return (
    <>
      {loading && !error ? (
        <Loader />
      ) : (
        <div>
          <Modal
            isOpen={open}
            onRequestClose={ToggleModal}
            content-label="My Dialog"
            className={`${wallet.wallet_modal}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className=" d-flex align-items-center">
                <CgArrowLongLeft size="1.8rem" onClick={() => setOpen(false)} />
                <h2 className={`${wallet.wallet_heading} ms-4  `}>
                  Make Withdrawal
                </h2>
              </div>

              <form className="col-12">
                <label htmlFor="" className="form-label">
                  Enter withdrawal amount
                </label>
                <input
                  value={withdrawValue}
                  onChange={(e) => setWithdrawValue(e.target.value)}
                  type="number"
                  className="form-control"
                />
              </form>
              <div className="d-flex flex-column align-items-center justify-center">
                <div className="d-flex mt-4 flex-wrap justify-between  align-items-center">
                  <button
                    type="submit"
                    onClick={handleWithdraw}
                    className="btn px-4 my-2 btn-outline-primary text-center"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </motion.div>
          </Modal>
        </div>
      )}
    </>
  );
};
