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
        <nav
          className={`${
            path === "/" ? "bg-primary" : "bg-light"
          } nav-container`}
        >
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

          {/* the links container */}
          <ul
            onClick={handleRoute}
            className={` ${path === "/" ? "text-light" : "text-primary"} ${
              open ? "toggle-show" : "hide"
            } nav-links`}
          >
            <Link
              className={`${path === "/" ? "text-light" : "text-primary"}`}
              to="/"
            >
              <li className="text-link">Home</li>
            </Link>
            <Link
              className={`${path === "/" ? "text-light" : "text-primary"}`}
              to="/about"
            >
              <li className="text-link">About</li>
            </Link>
            <Link
              className={`${path === "/" ? "text-light" : "text-primary"}`}
              to="/contact"
            >
              <li className="text-link">Contact</li>
            </Link>
            <Link
              className={`${path === "/" ? "text-light" : "text-primary"}`}
              to="/faqs"
            >
              <li className="text-link">FAQs</li>
            </Link>
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
