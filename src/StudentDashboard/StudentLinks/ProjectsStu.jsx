import React, { useEffect, useState } from 'react'
import { realDb } from '../../authFirebase/firebase'
import { get, ref, onValue } from 'firebase/database'
import { useParams } from 'react-router-dom'

const ProjectsStu = () => {
  const [projects, setProjects] = useState([])
  const {id} = useParams()
  console.log(id)

  useEffect(() => {
    const orgRef = ref(realDb, 'Organizations')

    onValue(orgRef, (snapshot) => {
      const OrganizationData = snapshot.val()
      if (!OrganizationData) return;

      const OrganizationDataArray = Object.entries(OrganizationData).map(([key, value]) => ({
        id: key,
        ...value
      }))

      let tempProjects = []   // <-- prepare empty array

      OrganizationDataArray.forEach(org => {

        const orgProj = org.OrgProjects ? Object.entries(org.OrgProjects).map(([key, value]) => ({
          id: key,
          ...value
        })) : [];

        orgProj.forEach(project => {
          const OrganizationProjects = {
            OrgName: org.name,
            OrgImage: org.profileImage,
            ProjDetails: {
              ProjectName: project.NameOfProject,
              Budget: project.BudgetOfProject,
              Deadline: project.Deadline,
              DescriptionOfProject: project.DescriptionOfThisProject,
              Status: project.Status,
              CurrentBids: project.CurrentBids,
              ProjectId: project.id
            }
          }

          tempProjects.push(OrganizationProjects); // add to array
        })

      })

      setProjects(tempProjects); // update state once
    })
  }, [])

  console.log(projects, 'PROJECTS ARRAY')

  return (
    <div>
      <h5>Organizational Projects</h5>
      <br />

      <div className="stu-org-projects">
        {projects.map((ele, index) => (
          <div className="stu-proj-card" key={index}>
            <div className="stu-proj-card-top">
              <img src={ele.OrgImage} alt="" />
              <h2 className='org-name-stu'>{ele.OrgName}</h2>
            </div>

            <div className="project-card-org">
              <h2>{ele.ProjDetails.ProjectName}</h2>
              <p className='budget-pro-card'>Budget: ₹{ele.ProjDetails.Budget} | Deadline: {ele.ProjDetails.Deadline}</p>
              <p className='desc-pro-card'>{ele.ProjDetails.DescriptionOfProject}</p>
              <h4>Bids Received: {ele.ProjDetails.CurrentBids}</h4>
              <button className='StatusProjectOrg'>{ele.ProjDetails.Status}</button>
              <div className="buttons-stu-proj">
                <button className='view-button'>View Details</button>
                <button className='bid-button-stu'>Add Bid</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectsStu
