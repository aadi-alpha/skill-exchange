import React, { useContext, useState } from 'react';
import { StudentDataContext } from '../../contextAPI/StudentsParamsContext';
import AddAchievement from '../../components/AddAchievement';
import { remove,ref } from 'firebase/database';
import { realDb } from '../../authFirebase/firebase';
import { useParams } from 'react-router-dom';

const CertificatesStudent = () => {
  const [showComponentSkill, setShowComponentAddSkill] = useState(false);
  const data = useContext(StudentDataContext)
  const StudentData = data?.Achievements || {}
  const AchievementsArray = Object.entries(StudentData).map(([Key, value]) => ({
    id: Key,
    ...value
  }))
  const Uid = useParams()
  const deleteCard = (id) => {
    console.log(id)
     remove(ref(realDb, `Students/${Uid.id}/Achievements/${id}`))
      .then(() => {
        console.log("Deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
              <button className='DeleteBtn' onClick={()=>{deleteCard(ele.id)}}><i class="fa-solid fa-trash"></i> Delete</button>
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
