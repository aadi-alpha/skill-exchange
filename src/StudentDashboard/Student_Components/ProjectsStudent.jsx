import React, { useContext, useState } from 'react';
import { StudentDataContext } from '../../contextAPI/StudentsParamsContext';
import AddProjects from '../../components/AddProjects';
import { remove,ref } from 'firebase/database';
import { realDb } from '../../authFirebase/firebase';
import { useParams } from 'react-router-dom';

const ProjectsStudent = () => {
  const [showComponentSkill, setShowComponentAddSkill] = useState(false);
  const data = useContext(StudentDataContext)
  console.log(data)
  const Uid = useParams()
  console.log(Uid)
 
  const projectsStudent = data?.Projects || {}
  const ProjectsArray = Object.entries(projectsStudent).map(([key,value])=>({
    id:key,
    ...value
  }))
const deleteCard = (id) => {
  console.log(id)
  remove(ref(realDb, `Students/${Uid.id}/Projects/${id}`))
    .then(() => {
      console.log("Deleted successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
  
  return (
    <div>
      <div className="projects-stu">

        <div className="projects-head">
          <h2>Projects :</h2>
          <button onClick={() => setShowComponentAddSkill(true)}>Upload Projects</button>
        </div>

        <div className="projects-collection">

          {ProjectsArray.map((elem)=>{
            return <div className="projects-card" key={elem.id}>
            <h2>
              <i className="fa-solid fa-trophy"></i>
              {elem.title}
            </h2>
            <img src={elem.certificateURL} alt="" />
            <h3>About Project:-</h3>
            <p>
              {elem.description}
            </p>
             <button className='DeleteBtn' onClick={()=>{deleteCard(elem.id)}}><i class="fa-solid fa-trash"></i> Delete</button>
          </div>
         

          })}
      

        </div>
      </div>
        {showComponentSkill && (
        <AddProjects close={() => setShowComponentAddSkill(false)} />
      )}
    </div>
  )
}

export default ProjectsStudent
