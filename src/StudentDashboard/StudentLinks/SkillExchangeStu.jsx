import React from 'react'
import CertificatesStudent from '../Student_Components/CertificatesStudent'
import SkillExchangeTop from '../Student_Components/SkillExchangeTop'
import SkillsExchangeProfilesStu from '../Student_Components/SkillsExchangeProfilesStu'
import RecentNotifications from '../../components/RecentNotifications'

const SkillExchangeStu = () => {
  return (
    <>
      <h3>Skill Exchange Flow</h3>
      <SkillExchangeTop />
      <div className="skill-ex-bottom">
      <SkillsExchangeProfilesStu />
      <RecentNotifications />
      </div>
    </>
  )
}

export default SkillExchangeStu
