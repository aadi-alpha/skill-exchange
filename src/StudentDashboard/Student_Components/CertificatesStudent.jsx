import React, { useContext, useState } from 'react';
import { StudentDataContext } from '../../contextAPI/StudentsParamsContext';
import AddAchievement from '../../components/AddAchievement';

const CertificatesStudent = () => {
  const [showComponentSkill, setShowComponentAddSkill] = useState(false);
  const data = useContext(StudentDataContext)
  const StudentData = data?.Achievements || {}
  const AchievementsArray = Object.entries(StudentData).map(([Key, value]) => ({
    id: Key,
    ...value
  }))

  return (
    <div>
      <div className="certificates-stu">

        <div className="cert-head">
          <h2>Photos & Achievements :</h2>
          <button onClick={() => setShowComponentAddSkill(true)}>Upload Achievements</button>
        </div>
        {AchievementsArray.length === 0 && (<h6> <br /> <br />No skill Added yet</h6>)}
        <div className="certificates-collection">

          {AchievementsArray.map((ele) => {
            return <div className="cert-card" id={ele.id}>
              <h2>
                <i className="fa-solid fa-trophy"></i>
                {ele.title}
              </h2>
              <img src={ele.certificateURL} alt="" />
              <h3>About journey:-</h3>
              <p>
                {ele.description}
              </p>
            </div>
          })}



        </div>
      </div>
      {showComponentSkill && (
        <AddAchievement close={() => setShowComponentAddSkill(false)} />
      )}
    </div>

  )
}

export default CertificatesStudent
