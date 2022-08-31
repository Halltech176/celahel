import React from "react";
import notificationstyles from './notifications.module.scss';


const Notifications = () => {
  return (
    <div>
      <div className="container">
        <header className="h2 text-primary">Notification</header>

<div className="table-responsive mt-5">
     <table className="table table-borderless">
          <thead>
            <tr>
              <th scope="col-3">Title</th>
              <th scope="col-3">Date</th>
              <th scope="col-6">Body</th>
            </tr>
          </thead>
          <tbody>
            <tr scope="row">
              <td scope="col-3">Upgrade account</td>
              <td scope="col-3">22/04/2022</td>
              <td scope="col-6" className={`${notificationstyles.notificationbody}`}>
               
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Minus nesciunt illum necessitatibus officiis hic doloremque
                  odio, pariatur quae consequuntur omnis iure ea quas fugiat
                  odit dolores ad provident vero in.
              </td>
            </tr>
            <tr>
              <td>Upgrade account</td>
              <td>22/04/2022</td>
              <td>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Minus nesciunt illum necessitatibus officiis hic doloremque
                  odio, pariatur quae consequuntur omnis iure ea quas fugiat
                  odit dolores ad provident vero in.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
</div>

       
      </div>
    </div>
  );
};

export default Notifications;
