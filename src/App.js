import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Common/Footer/Footer";
import Navbar from "./components/Common/Navbar/Navbar";
import UserRoute from "./components/Common/userRoute";
import InactiveAgent from "./components/Common/InactiveAgent";
import Upload from "./components/Common/Upload";
// import Sidebar from "./components/Common/Sidebar/Sidebar";

import Home from "./components/pages/Home/Home";
import About from "./components/pages/About/About";
import Profile from "./components/pages/Profile/Profile";

import Properties from "./components/Dashboard/Properties/Properties";
import AddProperties from "./components/Dashboard/AddProperties/AddProperties";
import Notifications from "./components/Dashboard/Notifications/Notifications.component";
import Overview from "./components/Dashboard/Overview/Overview";
import Admin from "./components/Dashboard/admin/admin";
import Allusers from "./components/Dashboard/admin/AllUsers";
import Plan from "./components/Dashboard/Account_plan/Plan.component";

import Contact from "./components/forms/Contact/Contact";
import Signin from "./components/forms/Signin/Signin";
import Verify from "./components/forms/Signin/Verify";
import Login from "./components/forms/Login/Login";
import ForgotPassword from "./components/forms/Login/forgotPassword";
import EmailVal from "./components/forms/Login/emailVal";
import Faq from "./components/forms/Faq/Faq";
import { AgentAuth, AdminAuth } from "./Redux/RequireAuth";

import Result from "./components/Results/Result.component";
import "./App.css";
import NoMatch from "./components/routes/NoMatch";
import { LineWave } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-loader-spinner.css";

function App() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <div className="project-container">
        {path === "/about" ||
        path === "/faqs" ||
        path === "/" ||
        path === "/login" ||
        path === "/signin" ||
        path === "/contact" ? (
          <Navbar />
        ) : (
          ""
        )}
        <div className="loader.">
          <LineWave
            height="200"
            width="200"
            firstLineColor="red"
            middleLineColor="green"
            color="blue"
            visible={false}
          />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth-user" element={<UserRoute />} />
          <Route path="/active-agent" element={<InactiveAgent />} />

          <Route path="/faqs" element={<Faq />} />
          <Route path="/about" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/uploading..." element={<Upload />} />
          <Route path="/forgottenPassword" element={<ForgotPassword />} />
          <Route path="/validateEmail" element={<EmailVal />} />
          <Route
            path="/admin"
            element={
              <AdminAuth>
                <Admin />
              </AdminAuth>
            }
          />
          <Route
            path="/allusers"
            element={
              <AdminAuth>
                <Allusers />
              </AdminAuth>
            }
          />

          <Route
            path="/profile"
            element={
              <AgentAuth>
                <Profile />
              </AgentAuth>
            }
          />

          <Route
            path="/properties"
            element={
              <AgentAuth>
                <Properties />
              </AgentAuth>
            }
          />
          <Route
            path="/addproperty"
            element={
              <AgentAuth>
                <AddProperties />
              </AgentAuth>
            }
          />
          <Route
            path="/upgrade"
            element={
              <AgentAuth>
                <Plan />{" "}
              </AgentAuth>
            }
          />
          <Route
            path="/overview"
            element={
              <AgentAuth>
                <Overview />
              </AgentAuth>
            }
          />

          <Route
            path="/notifications"
            element={
              <AgentAuth>
                <Notifications />
              </AgentAuth>
            }
          />
          <Route path="/results" element={<Result />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
        {path === "/" ||
        path === "/about" ||
        path === "/faqs" ||
        path === "/contact" ? (
          <Footer />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
