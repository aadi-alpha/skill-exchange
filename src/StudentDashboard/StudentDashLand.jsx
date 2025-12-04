import React, { useEffect, useState } from 'react'
import { Outlet, Route, Routes, useParams } from "react-router-dom";

import { useContext } from 'react';
import { StudentDataContext } from '../contextAPI/StudentsParamsContext';
import StudentNavigation from './Student_Components/StudentNavigation';
import NavTopDash from '../components/navTopDash';
import StudentProfile from './StudentLinks/StudentProfile';




const StudentDashLand = () => {
  const data = useContext(StudentDataContext)
  const id = useParams()


  return (

    <div>
      <input type="checkbox" id="menu-toggle" className="menu-toggle" hidden />
      <NavTopDash />
      <StudentNavigation />
      <div className="main-right">
        <Outlet />
      </div>
    </div>
  )
}

export default StudentDashLand
