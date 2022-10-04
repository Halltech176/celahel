import wallet from "./Wallet.module.css";
import axios from "axios";
import Modal from "react-modal";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FundWallet, WithdrawMoney, TransactionDetail } from "./WalletModal";
import Sidebar from "../../Common/Sidebar/Sidebar";
import { CgArrowLongLeft } from "react-icons/cg";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import ReactToPdf from "react-to-pdf";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../Common/ErrorToast";
import { BankAccounts, User, GetTransactions } from "../../../Redux/actions";
import "react-toastify/dist/ReactToastify.css";
import card1 from "../../../Assets/card1.png";
import card2 from "../../../Assets/card2.png";
import Loader from "../../Common/Loader";
import NoValues from "../NoValues";

const Wallet = () => {
  const ref = useRef();
  Modal.setAppElement("#root");
  const handleDownload = () => {};
  const navigate = useNavigate();
  const { loading, error, bankaccounts } = useSelector((state) => state.banks);
  const {
    loading: userLoading,
    error: userError,
    user,
  } = useSelector((state) => state.userprofile);
  const {
    loading: transactionsLoading,
    error: transactionsError,
    transactions,
  } = useSelector((state) => state.transactions);
  console.log(transactions);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [to_print, setToPrint] = useState({});
  const [accountNumber, setAccountNumber] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [activeBank, setActiveBank] = useState('');
  // useEffect(() => )
  const [bank, setBank] = useState("Abbey Mortgage Bank");
  // const [bank, setBank] = useState("Abbey Mortgage Bank");
  const dispatch = useDispatch();
  console.log(user?.bankAccounts[0].accountNumber)

  useEffect(() => {
    setActiveBank(user?.bankAccounts[0]?.accountNumber)
    dispatch(BankAccounts());
    dispatch(User());
    dispatch(GetTransactions());
  }, []);

  const ToggleModal = () => {
    setOpen(!open);
  };

  const ToggleModal2 = () => {
    setOpen2(!open2);
  };
  const ToggleModal3 = () => {
    setOpen3(!open3);
  };

  const [count, setCount] = useState(2);

  const handleIncrease = async () => {
    try {
      if (count === transactions?.totalPages) {
        setCount(1);
      }
      setCount(count + 1);
      console.log(count);
      // await dispatch(TransactionDetail(1));
      const response = await dispatch(GetTransactions(count));
      if (response.type === "transactions /rejected") {
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
      console.log(count);
      if (count === 1) {
        setCount(transactions?.totalPages);
      }

      const response = await dispatch(GetTransactions(count));
      if (response.type === "transactions/rejected") {
        throw "please check your internet connection";
      }
    } catch (err) {
      ErrorNotification(err);
    }
  };

  const handlePaginate = async (index) => {
    try {
      const response = await dispatch(GetTransactions(index));
      console.log(index);
      if (response.type === "properties/rejected") {
        throw "please check your internet connection";
      }
    } catch (err) {
      ErrorNotification(err);
    }
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

  const GetTransactionDetails = (id) => {
    console.log(id);
  };

  // Account details

  let amountFormat = Intl.NumberFormat("en-US");

  const GetDetail = (id) => {
    // setOpen3(true)
    const response = transactions?.docs?.find((data, index) => {
      return data._id === id;
    });
    if (response._id) {
      setToPrint(response);
      setOpen3(true);
    }

    console.log(response);

    return response;
  };
  console.log(to_print);
  let renderTransaction;
  if (transactions?.docs.length !== 0) {
    renderTransaction = transactions?.docs.map((data) => {
      // console.log(da  ta)
      return (
        <div key={data?._id} onClick={() => GetDetail(data?._id)} className={`${wallet.details_text}`}>
          <p className="">&#8358;{amountFormat.format(data?.amount)}.00</p>

          {/* <p>{data?.type}</p> */}
          <p className={`${wallet.details_period} `}>
            {/* <span></span> */}
            {new Date(data?.updatedAt).toLocaleDateString()}
          </p>
          <div className=''>
            <p
            className={`  text-center ${
              data.status === "pending"
                ? wallet.details_status_pending
                : wallet.details_status_completed
            }`}
          >
            {data?.status}
          </p> </div>
         
          <p className=' text-end'><span
            // style={{ cursor: "ponter" }}
            
            className="text-end"
          >
          {data?.type}
           
          </span> </p>
        </div>
      );
    });
  } else {
    renderTransaction = <NoValues value="Transaction" />;
  }
  const getActive = user?.bankAccounts?.find((value) => {
    return value?.accountNumber === activeBank;
  });
  console.log(getActive)
  const getCode = bankaccounts?.find((value) => {
    return value?.name === bank;
  });

  let accountDetails;
  if (user?.bankAccounts?.length !== 0) {
    accountDetails = (
      <div className={`${wallet.bank_account_text}`}>
        <p>Account Name : {getActive?.accountName}</p>

        <p>Account Number : {getActive?.accountNumber}</p>
        <p>Account Number : {getActive?.bankName}</p>
      </div>
    );
  } else {
    accountDetails = <h1 className="text-center">No Account Added yet</h1>;
  }

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
        setTimeout(() => {
          dispatch(User());
          // navigatge
        }, 1000);
      }
      console.log(response);
    } catch (err) {
      ErrorNotification(err?.response?.data?.message);
      if (err.message === "Network Error") {
        ErrorNotification("Please check your internet connections");
      }
      console.log(err);
    }

    console.log(accountNumber);
    console.log(bankCode);
  };
  const options = {
    orientation: "l",
    unit: "mm",
    format: "letter",
    fill: "red",
  };
  console.log(window.innerWidth)
  return (
    <>
      {userLoading || transactionsLoading || loading ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ToastContainer transition={Zoom} autoClose={800} />
          <Sidebar />
          <FundWallet
            open={open}
            setOpen={setOpen}
            ToggleModal={ToggleModal}
            ToggleModal2={ToggleModal2}
          />
          <WithdrawMoney
            open={open2}
            bankID={getActive?._id}
            ToggleModal={ToggleModal2}
            setOpen={setOpen2}
          />
          <TransactionDetail
            open={open3}
            detail={to_print}
            // bankID={getActive?._id}
            ToggleModal={ToggleModal3}
            setOpen={setOpen3}
          />

          <div className={`${wallet.wallet_container}`}>
            <div className="col-md-8 d-flex align-items-center">
              <CgArrowLongLeft size="1.8rem" onClick={() => navigate(-1)} />
              <h2 className={`${wallet.wallet_heading} ms-4  text-primary`}>
                Wallet
              </h2>
            </div>
            <div className={`${wallet.bank_details}`}>
              <div className={`${wallet.agent_bank} p-5`}>
                {/* <div className={`${accountOpen ? "d-block" : "d-none"}`}> */}
                {accountDetails}
                {/* </div> */}
               <div className={`${wallet.cardStyle} `}>
               <span></span>
                <span> 
                <img src={card1} alt='card1'/>
                </span>
               </div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => setAccountOpen(!accountOpen)}
                >
                  {/* {accountOpen ? <span>open</span> : <span>close</span>} */}
                </div>

               
                
              </div>
              <div className={`${wallet.agent_bank} p-5`} >
              <div className={`${wallet.bank_amount}`}>
                  <h1>
                    &#8358;{amountFormat.format(user?.wallet?.balance)}.00
                  </h1> 
                </div>
              <div className={`${wallet.bank_button}`}>
               
                <div>
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
                  <div className={`${wallet.cardStyle} `}>
               <span></span>
                <span> 
                <img src={card2} alt='card1'/>
                </span>
               </div>
            </div>
              
              {/* <div className={`${wallet.connect_bank} d-none`}>
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
              </div> */}
            </div>
            <div>
              <div className={`${wallet.input_fields}`}>
                <label>Transactions</label>

                <ReactToPdf
                  targetRef={ref}
                  filename="transactions.pdf"
                  x={2.5}
                  y={2.5}
                  scale={1}
                  options={options}
                >
                  {({ toPdf }) => <button onClick={toPdf}>Export</button>}
                </ReactToPdf>
               
              </div>
            </div>
            
            <div ref={ref}
             
              className={`${wallet.details_container}`}
            > 
           
              <div className={`${wallet.details_title}`}>
                <label className="">AMOUNT</label>

                <label className="text-center">DATE/TIME</label>
               {/* <p className=" text-center"> <label >sSTATUS</label> </p> */}
                <label className=" text-center">STATUS</label>
                <label className=" text-end">PURPOSE</label>
              </div>
               <h2 className={`${wallet.watermark}`}> TRANSACTION </h2>

              {renderTransaction}
            </div>
            <div>
              {transactions?.totalPages === 1 ? (
                ""
              ) : (
                <div className="paginate-btns d-flex align-items-center justify-content-between my-3 flex-wrap ">
                  {transactions?.page === 1 ? (
                    <div> </div>
                  ) : (
                    <button className="paginate-btn" onClick={handleDecrease}>
                      prev
                    </button>
                  )}

                  <ul className="d-flex align-items-center">
                    {transactions?.docs?.map((doc, index) => {
                      // if(inde)
                      return index < transactions?.totalPages ? (
                        <li
                          key={index}
                          onClick={() => handlePaginate(index + 1)}
                          className={`${
                            transactions?.page === index + 1
                              ? "active_page"
                              : "inactive_page"
                          } mx-2`}
                        >
                          {index + 1}
                        </li>
                      ) : (
                        ""
                      );
                    })}
                  </ul>
                  {transactions?.page === transactions?.totalPages ? (
                    <div> </div>
                  ) : (
                    <button className="paginate-btn" onClick={handleIncrease}>
                      next
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
export default Wallet;
