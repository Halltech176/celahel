import style from "./Settings.module.css";

import axios from "axios";
import Modal from "react-modal";
import { BankAccounts, User, GetTransactions } from "../../../Redux/actions";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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

import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Common/Loader";
import NoValues from "../NoValues";
const Settings = () => {
  const { loading, error, bankaccounts } = useSelector((state) => state.banks);
     const [accountOpen, setAccountOpen] = useState(false);

  const [accountNumber, setAccountNumber] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [activeBank, setActiveBank] = useState('');

 

  const [bank, setBank] = useState("Abbey Mortgage Bank");
 
  const dispatch = useDispatch();

     const {
    loading: userLoading,
    error: userError,
    user,
  } = useSelector((state) => state.userprofile);

    


console.log(user?.bankAccounts)

const getId =  user?.bankAccounts?.find((data, index) => {
    return data?.accountNumber === accountNumber
})
 useEffect(() => {
    setActiveBank(user?.bankAccounts[0]?.accountNumber)
    dispatch(BankAccounts());
    dispatch(User());
    dispatch(GetTransactions());
   
  }, []);

console.log(getId)


    const renderBanks = bankaccounts?.map((bank, index) => {
    return (
      <option key={index} defaultValue={bank?.name}>
        {bank?.name}
      </option>
    );
  });
  const getCode = bankaccounts?.find((value) => {
    return value?.name === bank;
  });
  const userAccounts = user?.bankAccounts?.map((bank, index) => {
    return (
      <option key={index} value={bank?.accountNumber}>
        {bank?.accountName} : {bank?.accountNumber}
      </option>
    );
  });
      const token = window.JSON.parse(localStorage.getItem("token"));
   const AddAccount = async () => {

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
    }

    const DeleteAccount = async () => {
            try {   
                  const response = await axios.delete(
        ` https://celahl.herokuapp.com/api//wallet/bank-account/${getId?._id}`,
        
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        }
      );
      SuccessNotification(response.data.message);
                    console.log(response)
            }catch(err) {
                if(err?.response?.data?.message === 'Invalid id') {
                    ErrorNotification("Invalid Account Number")
                } else {
                        ErrorNotification(err?.response?.data?.message);
                }
             
console.log(err)
            }
    }
  return (
    <>
    {
        loading ? <Loader/> : 
    
       <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        > 
        <Sidebar/>
     <ToastContainer transition={Zoom} autoClose={800} />
   <div className={`${style.settings}`}>
         <div className={`${style.connect_bank} `}>
                <h2>Connect Bank</h2>
                <p>
                  any time you withdraw it will be sent to your connected bank
                </p>
                <div className={`${style.bank_form}`}>
                  <div className="">
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
                  <div className="">
                    <label htmlFor="" className="form-label">
                      Bank Name
                    </label>
                    <br/>
                    <select
                      name="type"
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                      className=" w-75 p-2"
                      id=""
                    >
                      {renderBanks}
                    </select>
                  </div>
                  <div className="">
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
                


              </div>
   <div> 
     <div className={`${style.connect_bank} my-5`}>
               <h2> Remove Bank Account </h2>
                 <div className="">
                    <label htmlFor="" className="form-label">
                      Enter Account Number
                    </label>
                    <input
                    //   disabled
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className='my-2'> 
                    <button onClick={DeleteAccount} className='btn btn-primary'>Delete Account </button>
                  </div>
               
                </div>
   
   </div>
    
       </div>

</motion.div>  
}
  </>
  );
};
export default Settings;
