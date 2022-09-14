import { useState, useEffect } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import sidebar from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import LogoDark from "../../../Assets/DarkLogo.png";
import Vector1 from "../../../Assets/Vector-1.png";
import Vector2 from "../../../Assets/Vector-2.png";
import Vector from "../../../Assets/Vector.png";
import { Notification } from "../../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import About2 from "../../../Assets/user1.png";
import { LogoutModal } from "./LogoutModal";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
  }, []);
  const ToggleModal = () => {
    setIsOpen(!isOpen);
    setOpen(true);
  };
  const { user, loading, error } = useSelector((state) => state.userprofile);
  const { nLoading, nError, notifications } = useSelector(
    (state) => state.notification
  );

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(Notification());
  // }, []);

  const handleToggle = () => {
    setOpen(!open);
  };

  const avatar = user?.avatar;
  console.log(notifications);

  return (
    <>
      <LogoutModal
        open={isOpen}
        setIsOpen={setIsOpen}
        ToggleModal={ToggleModal}
      />
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
      <aside className={`${sidebar.sidebar_container} ${open && sidebar.show}`}>
        <div
          className={`${sidebar.profile} d-flex flex-column justify-content-center align-items-center my-4`}
        >
          <Link to="/profile">
            <div className="profile-image-container-sb">
              <img
                src={avatar?.url !== undefined ? avatar?.url : About2}
                className="profile-image"
                alt="profile image"
              />
              <h6
                className={`${sidebar.sidebar_link} sidebar_profile_text  mt-2`}
              >
                {user?.firstName} {user?.lastName}
              </h6>
            </div>
          </Link>
        </div>

        <ul className={`${sidebar.list_container}`}>
          <li className={`${sidebar.sidebar_list}`}>
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
            <IoMdNotifications className="me-2  d-inline-block" />
            <Link to="/agent-wallet" className={`${sidebar.sidebar_link}`}>
              Wallet
            </Link>
          </li>
          <li className={`${sidebar.sidebar_list}  d-flex align-items-center`}>
            {/* <img src={Vector} className="me-2 d-inline-block" /> */}
            <BiLogOut className="me-2  d-inline-block" />
            <p
              to="/login"
              onClick={ToggleModal}
              className={`${sidebar.sidebar_link} mt-3`}
            >
              Log Out
            </p>
          </li>
          {/* <li className={`${sidebar.sidebar_list}  d-flex align-items-center`}>
          
            <BiLogOut className="me-2  d-inline-block" />
            <p
              to="/login"
              onClick={logout}
              className={`${sidebar.sidebar_link}`}
            >
              Log Out
            </p>
          </li> */}
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
