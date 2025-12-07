import { useState } from "react";
import React from 'react'


const CertificatesViewStudent = ({id}) => {
    
      const data = id
      const StudentData = data?.Achievements || {}
      const AchievementsArray = Object.entries(StudentData).map(([Key, value]) => ({
        id: Key,
        ...value
      }))
      console.log('mydata', data)
  return (
    <div>
      <div className="certificates-stu">

        <div className="cert-head">
          <h2>Photos & Achievements :</h2>
          
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
    </div>
  )
}

export default CertificatesViewStudent
