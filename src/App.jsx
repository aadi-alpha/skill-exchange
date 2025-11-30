import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import StudentDashLand from './StudentDashboard/StudentDashLand';
import MentorDashLand from './MentorDashboard/MentorDashLand';
import OrgDashLand from './OrganizationDashboard/OrgDashLand';
import ProtectedRoute from './ProtectedRoute';
import StudentsParamsContext from './contextAPI/StudentsParamsContext';

const App = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userLoggedIn = JSON.parse(localStorage.getItem("loggedInUserSkillExchange"));

    if (userLoggedIn) {
      setRole(userLoggedIn.role);

      if (userLoggedIn.role === "student") {

        navigate(`/student-dashboard/${userLoggedIn.id}`);
     

      }
      else if (userLoggedIn.role === "mentor") {
        navigate(`/mentor-dashboard/${userLoggedIn.id}`);
     
      }
      else if (userLoggedIn.role === "organization") {
        navigate(`/organization-dashboard/${userLoggedIn.id}`);
      
      }
      else {
        alert("user not exist")
       
      }
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/student-dashboard/:id"
          element={
            
          <ProtectedRoute>
              <StudentsParamsContext>
              <StudentDashLand />
            </StudentsParamsContext>
          </ProtectedRoute>
          }
        />
        <Route
          path="/mentor-dashboard/:id"
          element={
<ProtectedRoute>
            <MentorDashLand />
            </ProtectedRoute>

          }
        />
        <Route
          path="/organization-dashboard/:id"
          element={

            <OrgDashLand />

          }
        />


      </Routes>

    </>
  );
};

export default App;
