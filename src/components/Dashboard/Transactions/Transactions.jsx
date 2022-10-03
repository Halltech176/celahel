import style from "./Transactions.module.css";
import axios from "axios";
import Modal from "react-modal";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
// import { FundWallet, WithdrawMoney, TransactionDetail } from "./WalletModal";
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
import Loader from "../../Common/Loader";
import NoValues from "../NoValues";
const Transactions = () => {
  return (
    <>
       <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        > 
        <Sidebar/>
    
       <div className={`${style.transactions}`}>
       <h1> hello </h1>
       </div>

</motion.div>  
  </>
  );
};
export default Transactions;
