import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const OrganizationNavigation = () => {
  const {id} = useParams()
  return (

    <div className="navigation-dash-main">

      <div className="main-left">
        <ul>
          <Link to={`/organization-dashboard/${id}/dashboard`}>
            <li>
              <i className="fa-regular fa-house"></i>
              Dashboard
            </li></Link>
          <Link to={`/organization-dashboard/${id}/`}>   <li>
            <i className="fa-regular fa-user"></i>
            My Profile
          </li></Link>
         
          <Link to={`/organization-dashboard/${id}/projects`}>   <li>
            <i className="fa-regular fa-building"></i>
            Projects
          </li></Link>
         
          <Link to={`/organization-dashboard/${id}/events`}>  <li>
            <i className="fa-regular fa-calendar-days"></i>
            Events
          </li></Link>
        </ul>
        <button className="logout-btn" onClick={() => {
          localStorage.removeItem("loggedInUserSkillExchange")
          window.location.reload()
          return <Navigate to="/login" replace />

        }}>Logout</button>
      </div>
    </div>
  );
};

export default OrganizationNavigation;
