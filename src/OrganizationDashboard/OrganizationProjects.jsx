import React, { useContext, useState } from 'react'
import OrgProfileIntro from './OrganizationComponents/OrgProfileIntro'
import AddProjectOrg from './OrganizationComponents/AddProjOrg';
import { OrganizationDataContext } from '../contextAPI/OrganizationParamsContext';

const OrganizationProjects = () => {
    const [showComponentSkill, setShowComponentAddSkill] = useState(false);

    const data = useContext(OrganizationDataContext)
    const OurProjects = data?.OrgProjects
    
    const OurProjectsArray = Object.entries(OurProjects).map(([key,value])=>({
        id:key,
        ...value
    }))
   
    console.log(OurProjectsArray)
    return (
        <div>
            <OrgProfileIntro />
            <div className="proj-organization">
                <div className="proj-head-org">
                    <h5>Our Projects</h5>
                    <button onClick={() => setShowComponentAddSkill(true)}>Upload Project</button>
                </div>
                <div className="projects-cards-org">
                    {OurProjectsArray.length===0 && <h6>No Projects yet</h6>}
                    {OurProjectsArray.map((ele)=>{
                        return <div className="project-card-org" key={ele.id}>
                        <h2>{ele.NameOfProject}</h2>
                        <p className='budget-pro-card'>Budget: ₹{ele.BudgetOfProject} | Deadline: {ele.Deadline} </p>
                        <p className='desc-pro-card'>{ele.DescriptionOfThisProject}</p>
                        <h4>Bids Received : {ele.currentBids} </h4>
                        <button className='StatusProjectOrg'>
                            {ele.Status}
                        </button>
                        <button className='view-button'>View Details</button>
                    </div>
                    })}
                </div>
            </div>
            {showComponentSkill && (
                <AddProjectOrg close={() => setShowComponentAddSkill(false)} />
            )}

        </div>
    )
}

export default OrganizationProjects
