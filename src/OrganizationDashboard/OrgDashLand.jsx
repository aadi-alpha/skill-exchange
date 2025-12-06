import React, { useEffect, useState } from 'react'
import { Outlet, Route, Routes, useParams } from "react-router-dom";

import { useContext } from 'react';


import NavTopDash from '../components/navTopDash';


const OrgDashLand = () => {
  return (
    <div>
      Organization
    </div>
  )
}

export default OrgDashLand
