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
import StudentProfile from './StudentDashboard/StudentLinks/StudentProfile';
import StudentDashboard from './StudentDashboard/StudentLinks/StudentDashboard';
import EventsStu from './StudentDashboard/StudentLinks/EventsStu';
import MentorshipStu from './StudentDashboard/StudentLinks/MentorshipStu';
import ProjectsStu from './StudentDashboard/StudentLinks/ProjectsStu';
import SkillExchangeStu from './StudentDashboard/StudentLinks/SkillExchangeStu';
import OrganizationProfile from './OrganizationDashboard/OrganizationProfile';
import OrganizationProjects from './OrganizationDashboard/OrganizationProjects';
import OrganizationEvents from './OrganizationDashboard/OrganizationEvents';
import OrganizatonDashboard from './OrganizationDashboard/OrganizatonDashboard';
import OrganizationsParamsContext from './contextAPI/OrganizationParamsContext';
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

        <Route path="/student-dashboard/:id/*" element={<ProtectedRoute> <StudentsParamsContext> <StudentDashLand /> </StudentsParamsContext> </ProtectedRoute>}>
          <Route path='' element={<StudentProfile />} />
          <Route path='dashboard' element={<StudentDashboard />} />
          <Route path='skill-exchange' element={<SkillExchangeStu />} />
          <Route path='projects' element={<ProjectsStu />} />
          <Route path='mentorship' element={<MentorshipStu />} />
          <Route path='events' element={<EventsStu />} />

        </Route>
        <Route
          path="/mentor-dashboard/:id/*"
          element={
            <ProtectedRoute>
              <MentorDashLand />
            </ProtectedRoute>

          }
        />
        <Route
          path="/organization-dashboard/:id/*"
          element={
<ProtectedRoute><OrganizationsParamsContext><OrgDashLand /></OrganizationsParamsContext></ProtectedRoute>
            

          }
        >
          <Route path='' element={<OrganizationProfile />} />
          <Route path='dashboard' element={<OrganizatonDashboard />} />

          <Route path='projects' element={<OrganizationProjects />} />

          <Route path='events' element={<OrganizationEvents />} />
        </Route>


      </Routes>

    </>
  );
};

export default App;
