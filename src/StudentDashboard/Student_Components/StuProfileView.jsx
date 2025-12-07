import React from 'react'

import ProfileViewHead from '../StudentLinks/peofileViewHead'
import CertificatesViewStudent from '../StudentLinks/CertificatesViewStudent'
import SkillSvIewStudent from '../StudentLinks/SkillSvIewStudent'
import ProjectsViewStudents from '../StudentLinks/ProjectsViewStudents'

const StuProfileView = ({value}) => {
    console.log("value",value)
  return (
    <div className='stu-profile-view'> 
    
      <ProfileViewHead id={value}/>
       <SkillSvIewStudent id={value} />
      <CertificatesViewStudent id={value}/>
     
      <ProjectsViewStudents id={value} />
    </div>
  )
}

export default StuProfileView
