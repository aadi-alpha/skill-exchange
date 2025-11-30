import React from "react";
import { Navigate } from "react-router-dom";

const StudentNavigation = () => {
  return (
    
    <div className="navigation-dash-main">
        
      <div className="main-left">
        <ul>
          <li>
            <i className="fa-regular fa-house"></i>
            <a href="student.html">Dashboard</a>
          </li>
          <li>
            <i className="fa-regular fa-user"></i>
            <a href="studentProfile.html">My Profile</a>
          </li>
          <li>
            <i className="fa-solid fa-rotate"></i>
            <a href="skillsStu.html">Skill Exchange</a>
          </li>
          <li>
            <i className="fa-regular fa-building"></i>
            <a href="#">Org. Projects</a>
          </li>
          <li>
            <i className="fa-regular fa-id-badge"></i>
            <a href="mentorshipStudent.html">Mentorship</a>
          </li>
          <li>
            <i className="fa-regular fa-calendar-days"></i>
            <a href="#">Events</a>
          </li>
        </ul>
        <button className="logout-btn" onClick={()=>{
            localStorage.removeItem("loggedInUserSkillExchange")
            window.location.reload()
           return <Navigate to="/login" replace />
            
            }}>Logout</button>
      </div>
    </div>
  );
};

export default StudentNavigation;
