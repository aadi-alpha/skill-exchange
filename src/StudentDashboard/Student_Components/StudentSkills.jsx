import React from 'react'
import logo from '../../assets/images/logo.png'

const StudentSkills = () => {
  return (
    <div className="skills-stu">
      <div className="skills-head">
        <h2>My Skills :</h2>
        <button>Add New</button>
      </div>

      <div className="skills-collection">

        <div className="skills-card">
          <h2><i className="fa-solid fa-trophy"></i> Frontend Designing</h2>
          <img src={logo} alt="skill" />
          <h3>Best in this:-</h3>
          <ul>
            <li>- Responsive and user friendly designs</li>
            <li>- HTML, CSS & JavaScript Expertise</li>
            <li>- UI/UX Optimization</li>
          </ul>
        </div>
         <div className="skills-card">
          <h2><i className="fa-solid fa-trophy"></i> Frontend Designing</h2>
          <img src={logo} alt="skill" />
          <h3>Best in this:-</h3>
          <ul>
            <li>- Responsive and user friendly designs</li>
            <li>- HTML, CSS & JavaScript Expertise</li>
            <li>- UI/UX Optimization</li>
          </ul>
        </div>
         <div className="skills-card">
          <h2><i className="fa-solid fa-trophy"></i> Frontend Designing</h2>
          <img src={logo} alt="skill" />
          <h3>Best in this:-</h3>
          <ul>
            <li>- Responsive and user friendly designs</li>
            <li>- HTML, CSS & JavaScript Expertise</li>
            <li>- UI/UX Optimization</li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default StudentSkills
