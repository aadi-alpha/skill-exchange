import React,{useState} from 'react'

const ProjectsViewStudents = ({id}) => {
    const [showComponentSkill, setShowComponentAddSkill] = useState(false);
      const data = id
     
      const projectsStudent = data?.Projects || {}
      const ProjectsArray = Object.entries(projectsStudent).map(([key,value])=>({
        id:key,
        ...value
      }))
    
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
          </div>

          })}
      

        </div>
      </div>
    </div>
  )
}

export default ProjectsViewStudents
