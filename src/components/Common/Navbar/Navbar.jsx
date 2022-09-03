import React, { Fragment, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./Navbar-styles.css";
import Logo from "../../Logo/Logo.component";
import DarkLogo from "../../../Assets/DarkLogo.png";

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleRoute = (e) => {
    if (
      e.target.classList.contains("nav-link") ||
      e.target.classList.contains("btn") ||
      e.target.classList.contains("nav_logo")
    ) {
      setOpen(true);
    }
    console.log(e.target);
  };

  console.log(open);
  console.log(location.pathname === "/", location.pathname);
  location.pathname !== "/"
    ? console.log("other")
    : console.log(location.pathname);
  return (
    <Fragment>
      <nav
        className={
          location.pathname !== "/"
            ? "navbar navbar-expand-lg align-items-center navbar-light text-primary bg-transparent mx-0"
            : "navbar nav navbar-expand-lg navbar-dark bg-primary mx-0"
        }
        style={{ top: "0", left: "0" }}
      >
        <div className="container-fluid justify-content-lg-between">
          <Link to="/" className="navbar-brand ">
            {location.pathname === "/" ? (
              <Logo />
            ) : (
              <img src={DarkLogo} className="nav_logo" alt="" />
            )}
          </Link>
          <button
            className="navbar-toggler toggle_btn "
            type="button"
            data-bs-toggle="collapse"
            onClick={handleToggle}
            // data-bs-target="#ToggleItem"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            className={` ${
              open && "show"
            } navbar-collapse anim d-lg-flex align-items-center justify-content-lg-end`}
            id="ToggleItem"
            onClick={handleRoute}
          >
            <ul className="navbar-nav mb-lg-0 d-flex nav-pills me-2 justify-content-end">
              <li className="nav-item px-lg-3 px-2">
                <Link
                  className={
                    location.pathname !== "/"
                      ? "nav-link px-3 text-primary"
                      : "nav-link text-light px-3"
                  }
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item px-lg-3 px-2">
                <Link
                  className={
                    location.pathname !== "/"
                      ? "nav-link text-primary px-3"
                      : "nav-link text-light px-3"
                  }
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item px-lg-3 px-2">
                <Link
                  className={
                    location.pathname !== "/"
                      ? "nav-link text-primary px-3"
                      : "nav-link text-light px-3"
                  }
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item px-lg-3 px-2">
                <Link
                  className={
                    location.pathname !== "/"
                      ? "nav-link text-primary px-3"
                      : "nav-link text-light px-3"
                  }
                  aria-current="page"
                  to="/faqs"
                >
                  FAQs
                </Link>
              </li>
            </ul>
            <ul className="d-lg-flex align-items-center">
              <li className="nav-item px-md-3 px-0">
                <Link to="/login">
                  <button
                    className={
                      location.pathname !== "/"
                        ? "btn btn-outline-primary px-md-5 text-prmary px-4"
                        : "btn btn-outline-light px-md-5 text-light bg-primary px-4"
                    }
                  >
                    {" "}
                    Login
                  </button>
                </Link>
              </li>
              <li className="nav-item px-0">
                <Link to="/signin">
                  <button
                    className={
                      location.pathname !== "/"
                        ? "btn btn-outline-primary px-3 px-md-5 text-prmary"
                        : "btn btn-outline-light px-3 px-md-5 text-light bg-primary"
                    }
                  >
                    Sign Up
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
}

export default Navbar;
