import React, { useState } from "react";
import notificationstyles from "./notifications.module.scss";
import Sidebar from "../../Common/Sidebar/Sidebar";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Notification } from "../../../Redux/actions";
import Loader from "../../Common/Loader";

const Notifications = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(2);
  const { notification } = useSelector((state) => state);
  const notifications = notification.notifications;
  console.log(notification);
  // const items = useSelector((state) => state.notifications.notifications);
  const { docs } = notifications;

  const handleIncrease = async () => {
    setCount(count + 1);

    if (count === notifications.totalPages) {
      setCount(1);
    }
    console.log(count);
    // await dispatch(AllProperties(1));
    await dispatch(Notification(count));
  };

  const handleDecrease = async () => {
    setCount(count - 1);

    if (count === 1) {
      setCount(notifications.totalPages);
    }
    console.log(count);
    // await dispatch(AllProperties(1));
    await dispatch(Notification(count));
  };

  const readNotification = async (id, readStatus) => {
    const token = JSON.parse(window.localStorage.getItem("token"));
    console.log(token, id);
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
        readStatus = response.data.data.read;
        console.log(readStatus);
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const renderNotes = docs.map((doc, index) => {
    return (
      <tr key={index} className="mb-3" scope="row">
        <td scope="col-3">{new Date(doc.createdAt).toLocaleDateString()}</td>
        <td scope="col-8" className={`${notificationstyles.notificationbody}`}>
          {doc.message}
        </td>
        {/* <td scope="col-3">{doc.read}</td> */}
        <td scope="col-3">
          <button
            onClick={() => {
              readNotification(doc._id, doc.read);
            }}
            className={`${doc.read ? "read" : "unread"} `}
          >
            {doc.read ? "read" : "unread"}
          </button>
        </td>
      </tr>
    );
    // console.log(doc.message);
  });
  docs.map((doc) => {
    console.log(doc.read);
  });
  return (
    <>
      {notification.loading ? (
        <Loader />
      ) : (
        <div>
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
                      <th scope="col-6">Read</th>
                    </tr>
                  </thead>
                  <tbody>{renderNotes}</tbody>
                </table>
              </div>
            </div>
            <div className="paginate-btns d-flex justify-content-between my-3 flex-wrap ">
              <button className="paginate-btn" onClick={handleDecrease}>
                prev
              </button>
              <button className="paginate-btn" onClick={handleIncrease}>
                next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notifications;
