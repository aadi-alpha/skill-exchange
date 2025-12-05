import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { StudentDataContext } from '../../contextAPI/StudentsParamsContext'

const SkillListMyFlow = () => {
    const SkillData = useContext(StudentDataContext)
   
    const MySkills = SkillData?.skills || {}
    const MySkillsArray = Object.entries(MySkills).map(([key, value]) => ({
        id: key,
        ...value
    }))

    return (
        <div>
            <div class="my-skill-flow">
                <h3>My Skills:-</h3>
                <div class="skill-list-flow">
                    <ul>
                        {MySkillsArray.length === 0 && <h6>No skills yet</h6>}
                        {MySkillsArray.map((elem) => {
                            return <li>
                                <p key ={elem.id}>{elem.title}</p><button><i class="fa-solid fa-xmark"></i></button>
                            </li>
                        })}
                    </ul>

                </div>
                <div class="add-new-skill-flow">
                    <input type="text" placeholder="Add Skills..." />
                    <button onClick={()=>alert("functionality under development")}>Add&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-plus"></i></button>
                </div>
            </div>

        </div>
    )
}

export default SkillListMyFlow
