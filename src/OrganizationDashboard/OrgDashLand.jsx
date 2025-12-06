import React, { useEffect, useState } from 'react'
import { Outlet, Route, Routes, useParams } from "react-router-dom";

import { useContext } from 'react';
import { OrganizationDataContext } from '../contextAPI/OrganizationParamsContext'

import NavTopDash from '../components/navTopDash';
import StudentNavigation from '../StudentDashboard/Student_Components/StudentNavigation';
import OrganizationNavigation from './OrganizationNavigation';


const OrgDashLand = () => {
  const data = useContext(OrganizationDataContext)
  const id = useParams()

  return (
    <div>
      <input type="checkbox" id="menu-toggle" className="menu-toggle" hidden />
      <NavTopDash />
      <OrganizationNavigation />
      <div className="main-right">
        <Outlet />
      </div>
    </div>
  )
}

export default OrgDashLand
