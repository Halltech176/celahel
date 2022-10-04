import React from "react";
// import Demo from "./demo";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Common/Footer/Footer";
import Navbar from "./components/Common/Navbar/Navbar";
import UserRoute from "./components/Common/userRoute";
import InactiveAgent from "./components/Common/InactiveAgent";
import Upload from "./components/Common/Upload";

import Home from "./components/pages/Home/Home";
import About from "./components/pages/About/About";
import Profile from "./components/pages/Profile/Profile";

import Properties from "./components/Dashboard/Properties/Properties";
import Wallet from "./components/Dashboard/Wallet/Wallet";
import AddProperties from "./components/Dashboard/AddProperties/AddProperties";
import EditProperty from "./components/Dashboard/AddProperties/EditProperty";
import Notifications from "./components/Dashboard/Notifications/Notifications.component";
import Overview from "./components/Dashboard/Overview/Overview";
import Transactions from "./components/Dashboard/Transactions/Transactions";
import Settings from "./components/Dashboard/Settings/Settings";
import Plan from "./components/Dashboard/Account_plan/Plan.component";

import Contact from "./components/forms/Contact/Contact";
import Signin from "./components/forms/Signin/Signin";
import Verify from "./components/forms/Signin/Verify";
import Login from "./components/forms/Login/Login";
import ForgotPassword from "./components/forms/Login/forgotPassword";
import EmailVal from "./components/forms/Login/emailVal";
import Faq from "./components/forms/Faq/Faq";
import { AgentAuth } from "./Redux/auth/RequireAuth";
import "./App.css";
import NoMatch from "./components/routes/NoMatch";
import { useSelector } from "react-redux";

function App() {
  const token = JSON.parse(window.localStorage.getItem("token"));
  const id = JSON.parse(window.localStorage.getItem("id"));

  // console.log(process.env.REACT_APP_BASE_URL);
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <div className="project-container">
        {path === "/about" ||
        path === "/faqs" ||
        path === "/login" ||
        path === "/signin" ||
        path === "/contact" ? (
          <Navbar />
        ) : (
          ""
        )}

        <Routes>
          {/* <Route path="/" element /> */}
          <Route
            path="/"
            element={
              token !== null ? (
                <AgentAuth>
                  <Properties />
                </AgentAuth>
              ) : (
                <Home />
              )
            }
          />
          {/* <Route path="/demo" element={<Demo />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth-user" element={<UserRoute />} />
          <Route path="/activate-agent" element={<InactiveAgent />} />

          <Route path="/faqs" element={<Faq />} />
          <Route path="/about" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/uploading..." element={<Upload />} />
          <Route path="/forgottenPassword" element={<ForgotPassword />} />
          <Route path="/validateEmail" element={<EmailVal />} />

          <Route
            path="/agent/profile"
            element={
              <AgentAuth>
                <Profile />
              </AgentAuth>
            }
          />
          <Route
            path="/agent/agent-wallet"
            element={
              <AgentAuth>
                <Wallet />
              </AgentAuth>
            }
          />

          <Route
            path={`${"/agent/properties"}`}
            element={
              <AgentAuth>
                <Properties />
              </AgentAuth>
            }
          />
          <Route
            path="/agent/addproperty"
            element={
              <AgentAuth>
                <AddProperties />
              </AgentAuth>
            }
          />
          <Route
            path="/agent/editproperty"
            element={
              id !== null ? (
                <AgentAuth>
                  <EditProperty />
                </AgentAuth>
              ) : (
                <AgentAuth>
                  <Properties />
                </AgentAuth>
              )
            }
          />
          <Route
            path="/agent/upgrade"
            element={
              <AgentAuth>
                <Plan />{" "}
              </AgentAuth>
            }
          />
          <Route
            path="/agent/overview"
            element={
              <AgentAuth>
                <Overview />
              </AgentAuth>
            }
          />

          <Route
            path="/agent/notifications"
            element={
              <AgentAuth>
                <Notifications />
              </AgentAuth>
            }
          />
          <Route
            path="/agent/transactions"
            element={
              <AgentAuth>
                <Transactions />
              </AgentAuth>
            }
          />
<Route
            path="/agent/settings"
            element={
              <AgentAuth>
                <Settings />
              </AgentAuth>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
        {path === "/about" || path === "/faqs" || path === "/contact" ? (
          <Footer />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
