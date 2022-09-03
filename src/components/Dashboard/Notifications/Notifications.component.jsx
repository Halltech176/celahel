import React from "react";
import notificationstyles from "./notifications.module.scss";
import Sidebar from "../../Common/Sidebar/Sidebar";
import axios from "axios";
import { useSelector } from "react-redux";

const Notifications = () => {
  const { notification } = useSelector((state) => state);
  const notifications = notification.notifications;
  const { docs } = notifications;

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

  console.log(notifications);
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
      </div>
    </>
  );
};

export default Notifications;
