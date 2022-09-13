import wallet from "./Wallet.module.css";
import axios from "axios";
import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RequestOTP, SendOTP } from "./WalletModal";
import Sidebar from "../../Common/Sidebar/Sidebar";
import { CgArrowLongLeft } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../Common/ErrorToast";
import { BankAccounts } from "../../../Redux/actions";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Common/Loader";

const Wallet = () => {
  Modal.setAppElement("#root");

  const navigate = useNavigate();
  const { loading, error, bankaccounts } = useSelector((state) => state.banks);
  const {
    loading: userLoading,
    error: userError,
    user,
  } = useSelector((state) => state.userprofile);
  const el = useSelector((state) => state);
  console.log(el);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [activeBank, setActiveBank] = useState(
    user?.bankAccounts[0].accountNumber
  );
  const [bank, setBank] = useState("Abbey Mortgage Bank");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(BankAccounts());
  }, []);

  const ToggleModal = () => {
    setOpen(!open);
  };

  const ToggleModal2 = () => {
    setOpen2(!open2);
  };
  const renderBanks = bankaccounts?.map((bank, index) => {
    return (
      <option key={index} value={bank?.name}>
        {bank?.name}
      </option>
    );
  });

  const userAccounts = user?.bankAccounts?.map((bank, index) => {
    return (
      <option key={index} value={bank?.accountNumber}>
        {bank?.accountName} : {bank?.accountNumber}
      </option>
    );
  });

  let amountFormat = Intl.NumberFormat("en-US");

  const userTransactions = [...user?.wallet?.histories];
  const renderTransaction = userTransactions
    ?.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    })
    .map((data) => {
      return (
        <div className={`${wallet.details_text}`}>
          <p>&#8358;{amountFormat.format(data.amount)}.00</p>
          <p>{data._id}</p>
          <p>{data.type}</p>
          <p className={`${wallet.details_period}`}>
            {/* <span></span> */}
            {new Date(data.updatedAt).toLocaleDateString()}
          </p>
          <p className={`${wallet.details_status}`}>
            {amountFormat.format(data.previousBalance)}.00
          </p>
        </div>
      );
    });
  // console.log(user?.bankAccounts);

  const getCode = bankaccounts?.find((value) => {
    return value?.name === bank;
  });

  const getActive = user?.bankAccounts?.find((value) => {
    return value?.accountNumber === activeBank;
  });
  console.log(activeBank);
  console.log(getActive);
  console.log(bank);

  const AddAccount = async () => {
    const token = window.JSON.parse(localStorage.getItem("token"));
    const data = {
      accountNumber,
      bankCode: getCode?.code,
    };
    try {
      const response = await axios.post(
        " https://celahl.herokuapp.com/api//wallet/bank-account",
        data,
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        }
      );
      if (response.status === 200) {
        SuccessNotification(response.data.message);
      }
      console.log(response);
    } catch (err) {
      ErrorNotification(err?.response?.data?.message);
      console.log(err);
    }

    console.log(accountNumber);
    console.log(bankCode);
  };
  return (
    <>
      {loading && !error && userLoading && !userError ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ToastContainer transition={Zoom} autoClose={800} />
          <Sidebar />
          <RequestOTP
            open={open}
            setOpen={setOpen}
            ToggleModal={ToggleModal}
            ToggleModal2={ToggleModal2}
          />
          <SendOTP
            open={open2}
            bankID={getActive?._id}
            ToggleModal={ToggleModal2}
            setOpen={setOpen2}
          />

          <div className={`${wallet.wallet_container}`}>
            <div className="col-md-8 d-flex align-items-center">
              <CgArrowLongLeft size="1.8rem" onClick={() => navigate(-1)} />
              <h2 className={`${wallet.wallet_heading} ms-4  text-primary`}>
                Wallet
              </h2>
            </div>
            <div className={`${wallet.bank_details}`}>
              <div className={`${wallet.agent_bank}`}>
                <div className={`${wallet.bank_account_text}`}>
                  <p>Account Name : {getActive?.accountName}</p>

                  <p>Account Number : {getActive?.accountNumber}</p>
                  <p>Account Number : {getActive?.bankName}</p>
                </div>
                <div className={`${wallet.bank_amount}`}>
                  <h1>
                    &#8358;{amountFormat.format(user?.wallet?.balance)}.00
                  </h1>
                </div>
                <div className={`${wallet.bank_button}`}>
                  <button
                    onClick={ToggleModal}
                    className={`${wallet.fund_btn}`}
                  >
                    Fund Wallet
                  </button>
                  <button
                    onClick={ToggleModal2}
                    className={`${wallet.withdraw_btn}`}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
              <div className={`${wallet.connect_bank}`}>
                <h2>Connect Bank</h2>
                <p>
                  any time you withdraw it will be sent to your connected bank
                </p>
                <div className={`${wallet.bank_form}`}>
                  <div className="col-12">
                    <label htmlFor="" className="form-label">
                      Account Number
                    </label>
                    <input
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      type="email"
                      className="form-control"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="" className="form-label">
                      Bank Name
                    </label>
                    <select
                      name="type"
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                      className="w-100  p-2"
                      id=""
                    >
                      {renderBanks}
                    </select>
                  </div>
                  <div className="col-12">
                    <label htmlFor="" className="form-label">
                      Bank Code
                    </label>
                    <input
                      disabled
                      value={getCode?.code}
                      onChange={(e) => setBankCode(e.target.value)}
                      type="email"
                      className="form-control"
                    />
                  </div>
                </div>
                <button
                  onClick={AddAccount}
                  className="btn-primary border-0 my-2 px-5 py-1 rounded-2"
                >
                  Add Bank
                </button>
                <div className="col-12">
                  <label htmlFor="" className="form-label">
                    Select Preferred account
                  </label>
                  <select
                    name="type"
                    value={activeBank}
                    onChange={(e) => setActiveBank(e.target.value)}
                    className="w-100  p-2"
                    id=""
                  >
                    {userAccounts}
                  </select>
                </div>
              </div>
            </div>
            <div>
              <div className={`${wallet.input_fields}`}>
                <label>Transactions</label>
                <input type="text" placeholder="Search" />
                <input type="text" placeholder="Filter" />
                <button>Export</button>
              </div>
            </div>
            <div>
              <div className={`${wallet.details_title}`}>
                <label>AMOUNT</label>
                <label>TRANSACTION ID</label>
                <label>PAYMENT TYPE</label>
                <label>DATE/TIME</label>
                <label>PREV BALANCE</label>
              </div>

              {renderTransaction}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
export default Wallet;