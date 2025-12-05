import React from 'react'
import ProfileIntro from '../../components/profileIntro'
import StudentSkills from '../Student_Components/StudentSkills'
import CertificatesStudent from '../Student_Components/CertificatesStudent'
import ProjectsStudent from '../Student_Components/ProjectsStudent'

const StudentProfile = () => {
  
  return (
    <div>
      <ProfileIntro />
      <StudentSkills />
      <CertificatesStudent />
      <ProjectsStudent />
    </div>
  )
}

export default StudentProfile
