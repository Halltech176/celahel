import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import notificationstyles from "./notifications.module.scss";
import Sidebar from "../../Common/Sidebar/Sidebar";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Notification } from "../../../Redux/actions";
import Loader from "../../Common/Loader";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdOutlineMarkunread } from "react-icons/md";
import { ErrorNotification, InfoNotification } from "../../Common/ErrorToast";

const Notifications = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(2);
  const { notifications, error, loading } = useSelector(
    (state) => state.notification
  );

  useEffect(() => {
    dispatch(Notification());
  }, []);

  const handleIncrease = async () => {
    setCount(count + 1);

    if (count === notifications.totalPages) {
      setCount(1);
    }

    await dispatch(Notification(count))
  };

  const handleDecrease = async () => {
    setCount(count - 1);

    if (count === 1) {
      setCount(notifications.totalPages);
    }

    await dispatch(Notification(count))
  };

  const handlePaginate = async (index) => {
    try {
      const response = await dispatch(Notification(index));
      if (response.type === "properties/rejected") {
        throw "please check your internet connection";
      }
    } catch (err) {
      console.log(err);
      // ErrorNotification(err);
    }
  };

  const readNotification = async (id, readStatus) => {
    const token = JSON.parse(window.localStorage.getItem("token"));

    try {
      const response = await axios.put(
        `https://celahl.herokuapp.com/api//notification/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        await dispatch(Notification());
        readStatus = response.data.data.read;
        console.log(readStatus);
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const renderNotes = notifications?.docs.map((doc, index) => {
    return (
      <tr key={index} className="mb-3" scope="row">
        <td scope="col-3">{new Date(doc.createdAt).toLocaleDateString()}</td>
        <td scope="col-8" className={`${notificationstyles.notificationbody}`}>
          {doc.message}
        </td>

        <td scope="col-3" className="text-center">
          <button
            className="text-center"
            onClick={() => {
              readNotification(doc._id, doc.read);
            }}
            className={`${doc.read ? "read" : "unread"} `}
          >
            {doc.read ? <IoMdCheckmarkCircle /> : <MdOutlineMarkunread />}
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Sidebar />
          <div className={`${notificationstyles.notification_container}`}>
            <div className="container">
              <header className="h2 text-primary">Notification</header>

              <div className="table-responsive mt-5">
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col-3">Date</th>
                      <th scope="col-3">Body</th>
                      <th scope="col-6">Mark as read</th>
                    </tr>
                  </thead>
                  <tbody>{renderNotes}</tbody>
                </table>
              </div>
            </div>
            {notifications?.totalPages === 1 ? (
              ""
            ) : (
              <div className="paginate-btns d-flex align-items-center justify-content-between my-3 flex-wrap ">
                {notifications?.page === 1 ? (
                  <div> </div>
                ) : (
                  <button className="paginate-btn" onClick={handleDecrease}>
                    prev
                  </button>
                )}

                <ul className="d-flex align-items-center">
                  {notifications?.docs?.map((doc, index) => {
                    return index < notifications?.totalPages ? (
                      <li
                        key={index}
                        className={`${
                          notifications?.page === index + 1
                            ? "active_page"
                            : "inactive_page"
                        } mx-2`}
                        onClick={() => handlePaginate(index + 1)}
                      >
                        {index + 1}
                      </li>
                    ) : (
                      ""
                    );
                  })}
                </ul>
                {notifications?.page === notifications?.totalPages ? (
                  <div> </div>
                ) : (
                  <button className="paginate-btn" onClick={handleIncrease}>
                    next
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Notifications;
