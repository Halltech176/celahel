import wallet from "./Wallet.module.css";
import axios from "axios";
import Modal from "react-modal";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { RequestOTP, SendOTP } from "./WalletModal";
import Sidebar from "../../Common/Sidebar/Sidebar";
import { CgArrowLongLeft } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import ReactToPdf from 'react-to-pdf'
import {
  ErrorNotification,
  SuccessNotification,
} from "../../Common/ErrorToast";
import { BankAccounts,  User} from "../../../Redux/actions";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Common/Loader";
import NoValues from'../NoValues'

const Wallet = () => {
  const ref = useRef()
  Modal.setAppElement("#root");
  const handleDownload = () => {

  }
  const navigate = useNavigate();
  const { loading, error, bankaccounts } = useSelector((state) => state.banks);
  const {
    loading: userLoading,
    error: userError,
    user,
  } = useSelector((state) => state.userprofile);
  const el = useSelector((state) => state);
  console.log(user);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [activeBank, setActiveBank] = useState(
    user?.bankAccounts[0]?.accountNumber
  );
  const [bank, setBank] = useState("Abbey Mortgage Bank");
  // const [bank, setBank] = useState("Abbey Mortgage Bank");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(BankAccounts());
    dispatch(User());
  }, []);

  const ToggleModal = () => {
    setOpen(!open);
  };

  const ToggleModal2 = () => {
    setOpen2(!open2);
  };
  const renderBanks = bankaccounts?.map((bank, index) => {
    return (
      <option key={index} defaultValue={bank?.name}>
        {bank?.name}
      </option>
    );
  });


//Available users accounts
  const userAccounts = user?.bankAccounts?.map((bank, index) => {
    return (
      <option key={index} value={bank?.accountNumber}>
        {bank?.accountName} : {bank?.accountNumber}
      </option>
    );
  });

  // Account details

 
    
  

  let amountFormat = Intl.NumberFormat("en-US");
  //  ?.sort((a, b) => {
  //     return new Date(b?.updatedAt) - new Date(a?.updatedAt);
  //   })
  // const userTransactions = [...user?.wallet?.histories]
  // console.log(userTransactions)
  let renderTransaction ;
  if(user?.wallet?.histories?.length !== 0) {

 
   renderTransaction = user?.wallet?.histories?.map((data) => {
      return (
        <div  className={`${wallet.details_text}`}>
          <p>&#8358;{amountFormat.format(data?.amount)}.00</p>
          <p>{data?._id}</p>
          <p>{data?.type}</p>
          <p className={`${wallet.details_period}`}>
            {/* <span></span> */}
            {new Date(data?.updatedAt).toLocaleDateString()}
          </p>
          <p className={`${wallet.details_status}`}>
            {amountFormat.format(data?.previousBalance)}.00
          </p>
        </div>
      );
    });
  }else {
    renderTransaction = <NoValues value='Transaction'/>
  }
 const getActive = user?.bankAccounts?.find((value) => {
    return value?.accountNumber === activeBank;
  });
  const getCode = bankaccounts?.find((value) => {
    return value?.name === bank;
  });
  console.log(getActive)
  let accountDetails;
  if(user?.bankAccounts?.length !== 0) {

  
  accountDetails =
    <div className={`${wallet.bank_account_text}`}>
                  <p>Account Name : {getActive?.accountName}</p>

                  <p>Account Number : {getActive?.accountNumber}</p>
                  <p>Account Number : {getActive?.bankName}</p>
                </div>}
                else {
                  accountDetails = <h1 className='text-center'>No  Account Added yet</h1>
                }
 
  console.log(activeBank);
  console.log(user?.bankAccounts);
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
        dispatch(User())
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
      {userLoading && !error && loading && !userError ? (
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
        
                {accountDetails}
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
                      defaultValue={getCode?.code}
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
              
                  <ReactToPdf targetRef={ref} filename="transactions.pdf">
        {({toPdf}) => (
            <button onClick={toPdf}>Export</button>
        )}
    </ReactToPdf>
                {/* <button onClick={handleDownload}>Export</button> */}
              </div>
            </div>
            <div ref={ref}>
              <div className={`${wallet.details_title}`}>
                <label>AMOUNT</label>
                <label>TRANSACTION-ID</label>
                <label>PAYMENT-TYPE</label>
                <label>DATE/TIME</label>
                <label>PREV-BALANCE</label>
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
