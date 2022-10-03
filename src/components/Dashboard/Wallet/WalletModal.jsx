import Modal from "react-modal";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import wallet from "./Wallet.module.css";
import { CgArrowLongLeft } from "react-icons/cg";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { PaystackButton } from "react-paystack";
import { AiOutlineSync } from "react-icons/ai";
import ReactToPdf from "react-to-pdf";

export const FundWallet = ({ open, setOpen, ToggleModal, ToggleModal2 }) => {
  const location = window.location;

  const [amount, setAmount] = useState("");
  const [Plan, setPlan] = useState("Wallet");
  const [reference, setReference] = useState("");

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
      console.log(response.data.data.reference);
      setReference(response.data.data.reference);
      // console.log(process.env.NODE_ENV);
      if (response.status === 200) {
        const data = {
          callback_url: `${
            location.host.split(":")[0] === "localhost"
              ? `http://${location.host}/agent/properties`
              : `https://${location.host}/agent/properties`
          }`,

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
          await axios.get(
            "https://celahl.herokuapp.com/api//transaction/verify"
          );
        }
        console.log(addmoney);
      }
    } catch (err) {
      if (err.message === "Network Error") {
        ErrorNotification("Please check your internet Connections");
      }
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
                {/* <PaystackButton
                  className="btn px-4 my-2 btn-outline-primary text-center"
                  {...componentProps}
                /> */}
              </div>
            </div>
          </motion.div>
        </Modal>
      </div>
    </>
  );
};

export const WithdrawMoney = ({ open, setOpen, ToggleModal, bankID }) => {
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

export const TransactionDetail = ({ open, setOpen, ToggleModal, detail }) => {
  const ref = useRef();
  const [values, setValues] = useState([]);
  const [value, setValue] = useState("");
  console.log(detail);

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.userprofile);
  // let amountFormat = Intl.NumberFormat("en-US");
  const options = {
    orientation: "p",
    unit: "mm",

    putOnlyUsedFonts: true,
    floatPrecision: 16,

    format: "a6",
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
              <div ref={ref}>
                <div className=" mx-5 d-flex align-items-center">
                  <CgArrowLongLeft
                    size="1.8rem"
                    onClick={() => setOpen(false)}
                  />
                  <h6 className={`${wallet.wallet_heading} ms-4  `}>
                    Transactions details
                  </h6>
                </div>

                <div className="col-10 font-sans">
                  <p>
                    <span className="text-primary"> Type: </span> {detail?.type}{" "}
                  </p>
                  {/* <p><span className='text-primary'> Amount </span>  : {detail?.type} </p> */}
                  <p>
                    <span className="text-primary"> Status: </span>{" "}
                    {detail?.status}{" "}
                  </p>
                  <p>
                    <span className="text-primary"> Reference ID: </span>{" "}
                    {detail?.data?.reference}{" "}
                  </p>
                  <p>
                    <span className="text-primary"> Amount: </span>{" "}
                    {detail?.amount}{" "}
                  </p>
                  <p>
                    <span className="text-primary"> Message: </span>{" "}
                    {detail?.message}{" "}
                  </p>
                  <p>
                    <span className="text-primary"> Date: </span>{" "}
                    {new Date(detail?.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="d-flex mt-4 flex-wrap justify-between  align-items-center">
                <ReactToPdf
                  targetRef={ref}
                  filename="details.pdf"
                  x={2.5}
                  y={2.5}
                  scale={1}
                  options={options}
                >
                  {({ toPdf }) => (
                    <button
                      className="btn px-4 my-2 btn-outline-primary text-center"
                      onClick={toPdf}
                    >
                      {" "}
                      Print
                    </button>
                  )}
                </ReactToPdf>
              </div>
            </motion.div>
          </Modal>
        </div>
      )}
    </>
  );
};
