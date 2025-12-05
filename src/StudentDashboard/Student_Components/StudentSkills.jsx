import React, { useContext, useState } from 'react';
import logo from '../../assets/images/logo.png';
import AddSkills from '../../components/AddSkills';
import { StudentDataContext } from '../../contextAPI/StudentsParamsContext';

const StudentSkills = () => {

  const [showComponentSkill, setShowComponentAddSkill] = useState(false);

  const data = useContext(StudentDataContext);

  const skillsData = data?.skills || {};  // contains skills object (-Nsd334 : {...})

  // Convert Firebase object → array
  const skillsArray = Object.entries(skillsData).map(([key, value]) => ({
    id: key,
    ...value
  }));


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
