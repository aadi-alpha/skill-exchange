import React, { useContext, useState } from 'react'
import Loader from '../../components/loader';
import { realDb } from '../../authFirebase/firebase';
import { useParams } from 'react-router-dom';
import { OrganizationDataContext } from '../../contextAPI/OrganizationParamsContext';
import { get, ref, push } from 'firebase/database';

const AddProjectOrg = ({ close }) => {
    const [loader, setLoader] = useState(false);
    const [progress, setProgress] = useState(0);

    const [NameProject, setNameProject] = useState('')
    const [NewBudget, setNewBudget] = useState('')
    const [deadlineDate, setDeadlineDate] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    // const [OrgName, setOrgName] = useState()
    // const [profilePicOrg, setProfilePic]=useState()
    const { id } = useParams()
    // const MyOrgData = useContext(OrganizationDataContext)
    // console.log(MyOrgData)
    // if(MyOrgData.)
    
    async function submitHandler(e) {

        e.preventDefault()
        setLoader(true)
        const ProjectData = {
            NameOfProject: NameProject,
            BudgetOfProject: NewBudget,
            Deadline: deadlineDate,
            DescriptionOfThisProject: projectDescription
        }
        console.log(ProjectData)
        push(ref(realDb, `Organizations/${id}/OrgProjects`), {
            NameOfProject: NameProject,
            BudgetOfProject: NewBudget,
            Deadline: deadlineDate,
            DescriptionOfThisProject: projectDescription,
            DateOfUpload: Date.now(),
            currentBids: 0,
            Status: 'Active'
        })
            .then(() => {
                alert('Project uploaded successfully')
            })
            .catch((err) => {
                alert('can not add project', err)
            })
        setLoader(false)
    }
    return (
        <div className='edit-profile-Student'>
            <h3>Upload Project</h3>
            <form onSubmit={submitHandler}>
                <input type="text" placeholder='Add Project Name' value={NameProject} onChange={(e) => setNameProject(e.target.value)} required />
                <input type="number" placeholder='Add budget in rupees' value={NewBudget} onChange={(e) => setNewBudget(e.target.value)} required />
                <h6></h6>
                <h6>Enter deadline date:-</h6>
                <input type="date" placeholder='Enter deadline date' value={deadlineDate} onChange={(e) => setDeadlineDate(e.target.value)} required />
                <textarea name="" id="" placeholder='Add Project Description' value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} required> </textarea>
                <button type='button' className='close-btn' onClick={close}>
                    <i className="fa-solid fa-x"></i>
                </button>
                <button type='submit' id='savechanges'>Save Changes</button>
            </form>
            {loader && <Loader />}
        </div>

    )
}

export default AddProjectOrg
