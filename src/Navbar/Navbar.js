import React from "react";
import logo from "../images/logo.png";
import homeIcon from "../images/dashborad.png";
import aboutIcon from "../images/profile.png";
import servicesIcon from "../images/notif.png";
import contactIcon from "../images/search.png";
import settingsIcon from "../images/settings.png";
import logoutIcon from "../images/LOGOUT.png";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="sidebar ">
      <img src={logo} alt="Logo" className="logo" />
      <ul className="upper-bar">
        <li className="sidebar-items">
          <a href="/">
            <img src={homeIcon} alt="Dashboard" className="icon" />
            Dashboard
          </a>
        </li>
        <li>
          <a href="/">
            <img src={aboutIcon} alt="Profile" className="icon" />
            Profile
          </a>
        </li>
        <li>
          <a href="/">
            <img src={servicesIcon} alt="Notifications" className="icon" />
            Notifications
          </a>
        </li>
        <li>
          <a href="/">
            <img src={contactIcon} alt="Search" className="icon" />
            Search
          </a>
        </li>
      </ul>
      <div className="lower-bar">
        <ul>
          <li>
            <a href="/">
              <img src={settingsIcon} alt="Settings" className="icon" />
              Settings
            </a>
          </li>
          {/* <li>
            <a href="/">
              <img src={logoutIcon} alt="Logout" className="icon" />
              Logout
            </a>
          </li> */}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
