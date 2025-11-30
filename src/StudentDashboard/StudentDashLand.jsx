import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import { useContext } from 'react';
import { StudentDataContext } from '../contextAPI/StudentsParamsContext';
import StudentNavigation from './Student_Components/StudentNavigation';
import NavTopDash from '../components/navTopDash';



const StudentDashLand = () => {
  const data = useContext(StudentDataContext)
 

  return (

    <div>
      <input type="checkbox" id="menu-toggle" className="menu-toggle" hidden/>
      <NavTopDash />
      <StudentNavigation />
    </div>
  )
}

export default StudentDashLand
