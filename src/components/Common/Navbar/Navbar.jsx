import react, { useState } from "react";
import navbar from "./navbar.css";
import DarkLogo from "../../../Assets/DarkLogo.png";
import Logo from "../../Logo/Logo.component";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleRoute = (e) => {
    const target = e.target;
    if (
      target.classList.contains("text-light") ||
      target.classList.contains("text-primary") ||
      target.classList.contains("text-link")
    )
      setOpen(false);
    console.log(e.target);
  };
  const path = location.pathname;
  return (
    <>
      <header>
        {/* navbar container */}
        <nav className={`${path === "/" ? "bg-primary" : ""} nav-container`}>
          <div className="site-logo">
            {/* conditionally rendering the logo coloe */}
            {path === "/" ? (
              <Logo />
            ) : (
              <img onClick={() => navigate("/")} src={DarkLogo} />
            )}

            {/* conditioning rendering the toggle icon  */}
            {open ? (
              <MdClose
                className={`${
                  path === "/" ? "text-light" : "text-primary"
                } toggle-btn  close-btn`}
                size="2rem"
                onClick={handleToggle}
              />
            ) : (
              <MdMenu
                className={`${
                  path === "/" ? "text-light" : "text-primary"
                } toggle-btn  open-btn`}
                size="2rem"
                onClick={handleToggle}
              />
            )}
          </div>

          <ul
            className={`list-nav ${open ? "toggle-show " : "hide"} ${
              path === "/" ? "" : ""
            } mb-lg-0 d-flex nav-pills  me-2 justify-content-between`}
            onClick={handleRoute}
            // className={`mb-lg-0 d-flex nav-pills  me-2 justify-content-between`}
          >
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
          <div
            onClick={handleRoute}
            className={`nav-btns ${open ? "toggle-show " : "hide"} ${
              path === "/" ? "btn-route" : ""
            }`}
          >
            <li>
              <button className="text-link">
                <Link
                  className={`${
                    path === "/" ? "text-light" : "text-primary"
                  } text-link`}
                  to="signin"
                >
                  Signin
                </Link>
              </button>
            </li>
            <li>
              <button className="text-link">
                <Link
                  className={`${
                    path === "/" ? "text-light" : "text-primary"
                  } text-link`}
                  to="login"
                >
                  Login
                </Link>
              </button>
            </li>
          </div>
        </nav>
      </header>
    </>
  );
};
export default Navbar;
