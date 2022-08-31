import { useState, useEffect, useContext } from "react";
import sidebar from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import LogoDark from "../../../Assets/DarkLogo.png";
import Vector1 from "../../../Assets/Vector-1.png";
import Vector2 from "../../../Assets/Vector-2.png";
import Vector3 from "../../../Assets/Vector-3.png";
import Vector4 from "../../../Assets/Vector-4.png";
import Vector from "../../../Assets/Vector.png";
import profile_image from "../../../Assets/profile_image.png";
import male_avatar from "../../../Assets/male.png";
import female_avatar from "../../../Assets/female.png";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };

  const logout = () => {
    localStorage.clear();
  };
  const user = JSON.parse(window.localStorage.getItem("user"));
  const { firstName, lastName } = user;
  // console.log(user);

  return (
    <>
      <div
        className={`${sidebar.sidebar_nav} my-3 container  align-items-center`}
      >
        <div>
          <Link to="/">
            <img src={LogoDark} alt="celahl-logo" className="img-fluid w-50" />
          </Link>
        </div>
        {open ? (
          <MdMenu
            className={`${sidebar.toggle_btn} `}
            size="2rem"
            onClick={handleToggle}
          />
        ) : (
          <MdClose
            size="2rem"
            className={`${sidebar.toggle_btn}`}
            onClick={handleToggle}
          />
        )}
      </div>
      <aside
        // style={{ display: open }}
        className={`${sidebar.sidebar_container} ${open && sidebar.show}`}
      >
        {/* <div className={`${sidebar.close_menu_btn}`}></div> */}
        <div
          className={`${sidebar.profile} d-flex flex-column justify-content-center align-items-center my-4`}
        >
          <div className={`${sidebar.profile_img}`}>
            <Link to="/profile">
              {/* <img
                src={userAvatar}
                alt="user-profile"
                className={`${sidebar.profile_image}`}
              /> */}
            </Link>
          </div>
          <Link to="/profile" className={`${sidebar.sidebar_link}`}>
            <h6>
              {firstName} {lastName}
            </h6>
          </Link>
        </div>
        <ul className={`${sidebar.list_container}`}>
          <li className={`${sidebar.sidebar_list}`}>
            {/* <MdOtherHouses
              color="white"
              className="me-2 d-inline-block text-center"
            /> */}
            <img src={Vector} alt="img-1" className="me-2 d-inline-block" />
            <Link to="/overview" className={`${sidebar.sidebar_link}`}>
              Overview
            </Link>
          </li>

          <li className={`${sidebar.sidebar_list}`}>
            <img src={Vector1} alt="img-2" className="me-2 d-inline-block" />
            <Link to="/properties" className={`${sidebar.sidebar_link}`}>
              Properties
            </Link>
          </li>

          <li className={`${sidebar.sidebar_list}`}>
            <img src={Vector2} alt="img-3" className="me-2 d-inline-block" />
            <Link to="/upgrade" className={`${sidebar.sidebar_link}`}>
              Account Plan
            </Link>
          </li>

          <li className={`${sidebar.sidebar_list}`}>
            {/* <img src={Vector} className="me-2 d-inline-block" /> */}
            <IoMdNotifications className="me-2  d-inline-block" />
            <Link to="/notifications" className={`${sidebar.sidebar_link}`}>
              Notification
            </Link>
          </li>

          <li className={`${sidebar.sidebar_list}`}>
            {/* <img src={Vector} className="me-2 d-inline-block" /> */}
            <BiLogOut className="me-2  d-inline-block" />
            <Link
              to="/login"
              onClick={logout}
              className={`${sidebar.sidebar_link}`}
            >
              Log Out
            </Link>
          </li>
        </ul>
        {/* <ul className={`${sidebar.list_container}`}>
          <li className={`${sidebar.sidebar_list}`}> overview</li>
        </ul> */}

        <div
          className={`${sidebar.upgrade_container} text-center d-flex flex-column justify-content-center align-items-center my-5 `}
        >
          <button className={`${sidebar.upgrade_btn} p-2 mb-2`}>
            <Link className={`${sidebar.upgrade_link}`} to="/upgrade">
              Upgrade
            </Link>
          </button>
          <p className={`${sidebar.upgrade_text} text-white`}>
            Upgrade account type <br /> for more features
          </p>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
