import "./Logo-styles.scss";
// import {IoHomeOutline} from 'react-icons/io5'
import LogoImg from "../../Assets/logo.png";
import React from "react";

function Logo() {
  return <img src={LogoImg} className="nav_logo" alt="Logo" />;
}

export default Logo;
