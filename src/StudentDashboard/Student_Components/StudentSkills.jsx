import React, { useContext, useState } from 'react';
import logo from '../../assets/images/logo.png';
import AddSkills from '../../components/AddSkills';
import { StudentDataContext } from '../../contextAPI/StudentsParamsContext';
import { remove,ref } from 'firebase/database';
import { realDb } from '../../authFirebase/firebase';
import { useParams } from 'react-router-dom';

const StudentSkills = () => {

  const [showComponentSkill, setShowComponentAddSkill] = useState(false);

  const data = useContext(StudentDataContext);
const Uid = useParams()
  const skillsData = data?.skills || {};  // contains skills object (-Nsd334 : {...})

  // Convert Firebase object → array
  const skillsArray = Object.entries(skillsData).map(([key, value]) => ({
    id: key,
    ...value
  }));
  const deleteCard = (id) => {
    remove(ref(realDb, `Students/${Uid.id}/skills/${id}`))
      .then(() => {
        console.log("Deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="skills-stu">

      <div className="skills-head">
        <h2>My Skills :</h2>
        <button onClick={() => setShowComponentAddSkill(true)}>
          Add New
        </button>
      </div>

      <div className="skills-collection">

        {/* If no skills */}
        {skillsArray.length === 0 && (
          <h6><br /><br />No skills added yet</h6>
        )}

        {/* Loop skills */}
        {skillsArray.map((skill) => (
          <div className="skills-card" key={skill.id}>
            <h2><i className="fa-solid fa-trophy"></i> {skill.title}</h2>

            {/* Certificate image or default */}
            <img
              src={skill.certificateURL ? skill.certificateURL : logo}
              alt="certificate"
            />

            <h3>Description:</h3>
            <p>{skill.description}</p>
            {/* 
            <a 
              href={skill.certificateURL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="view-certificate"
            >
              View Certificate
            </a> */}
            <button className='DeleteBtn' onClick={() => { deleteCard(skill.id) }}><i class="fa-solid fa-trash"></i> Delete</button>
          </div>
        ))}

      </div>

      {/* Add Skills Modal */}
      {showComponentSkill && (
        <AddSkills close={() => setShowComponentAddSkill(false)} />
      )}

    </div>
  );
};

export default StudentSkills;
