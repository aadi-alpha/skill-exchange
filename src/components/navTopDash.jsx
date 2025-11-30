import React from "react";
import logo from "../assets/images/logo.png";

const NavTopDash = () => {
  return (
    <nav className="navStudentDashboard">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="nav-right">
        <input
          type="search"
          placeholder="Search projects, skills, mentors"
          className="searchBarStud"
        />
        <i className="fa-regular fa-bell"></i>
      </div>

      <label htmlFor="menu-toggle" >
        <div className="hamburger" id="menu-toggle">
        <div></div>
        <div></div>
        <div></div>
        </div>
      </label>
    </nav>
  );
};

export default NavTopDash;
