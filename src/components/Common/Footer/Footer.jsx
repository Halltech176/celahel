import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import "./Footer-styles.scss";
import PlayBadge from "../../../Assets/MobilePlayStore.svg";
import AppBadge from "../../../Assets/MobileAppStore.svg";
import { ReactComponent as AppStore } from "../../../Assets/AppStore.svg";
import { ReactComponent as PlayStore } from "../../../Assets/PlayStore.svg";
import Logo from "../../Logo/Logo.component";

function Footer() {
  return (
    <div className="bg-black position-absolute  mt-5 w-100 ">
      <div className="container footer">
        <div className="row">
          <div className="col-12 col-md-3 text-left">
            <Logo />
            <p className="text-muted">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet cum
              aperiam recusandae sunt libero.
            </p>
          </div>
          <div className="col-12 col-md-2 text-left">
            <ul>
              {" "}
              <h3 className="mb-3">Services</h3>
              <li> <a href="#"> Buy/See</a></li>
              <li> <a href="#"> Pricing</a></li>
              <li> <a href="#"> Case Studies</a></li>
              <li> <a href="#"> Reviews</a></li>
              <li> <a href="#"> Updates</a></li>
            </ul>
          </div>
          <div className="col-12 col-md-2 text-left">
            <ul>
              {" "}
              <h3 className="mb-3">Company</h3>
              <li><a href="/about">About</a></li>
              <li> <a href="/contact"> Contact Us</a></li>
              <li> <a href="#">Careers</a> </li>
              <li> <a href="#"> Culture</a></li>
              <li> <a href="#">Blog</a> </li>
            </ul>
          </div>
          <div className="col-12 col-md-2 text-left">
            <ul>
              {" "}
              <h3 className="mb-3">Follow Us</h3>
              <li>
                <FaFacebookF color="blue" /> <span> <a href="#"> Facebook</a> </span>
              </li>
              <li>
                <FaTwitter color="blue" />
                <span> <a href="#"> Twitter</a> </span>
              </li>
              <li>
                <FaInstagram color="blue" /> <span> <a href="#"> Instagram</a> </span>{" "}
              </li>
              <li>
                <FaLinkedinIn color="blue" /> <span> <a href="#"> Linkedin</a> </span>{" "}
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-3 text-left">
            <ul>
              <h3 className="">Get the app</h3>
              <li className="store">
              <a href="#"> <img
                  src={AppBadge}
                  alt="App store"
                  className="w-100"
                /></a>
               
              </li>
              <li className="store">
              <a href="#">
                 <img
                  src={PlayBadge}
                  alt="Play Store"
                  className="w-100"
                />
              </a>
               
              </li>
            </ul>
          </div>
        </div>

        <hr />
        <p className="text-center text-muted small">
          Copyright &copy; 2022 CEDO | All Rghts reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
