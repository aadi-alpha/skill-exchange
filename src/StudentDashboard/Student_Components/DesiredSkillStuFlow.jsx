import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDatabase, ref, get, update } from 'firebase/database'
import { realDb } from '../../authFirebase/firebase'
import { StudentDataContext } from '../../contextAPI/StudentsParamsContext'

const DesiredSkillStuFlow = () => {
    const [desiredSkill, SetDesiredSkill] = useState("")
    const { id } = useParams()
    const data = useContext(StudentDataContext)

    // function to add skill to pure array
    async function AddSkillToDesired() {
        if (!desiredSkill) return;


        const desiredSkillRef = ref(realDb, `Students/${id}/desiredSkills`);

        try {
            const snapshot = await get(desiredSkillRef);
            const currentSkills = snapshot.val() || [];

            const updatedSkills = [...currentSkills, desiredSkill];

            await update(ref(realDb, `Students/${id}`), { desiredSkills: updatedSkills });

            alert("Skill Added!");
            SetDesiredSkill("");
        } catch (err) {
            console.log("Error:", err);
        }
    }

    // delete skill by index
    async function deleteSkill(index) {
      
        const refPath = ref(realDb, `Students/${id}/desiredSkills`);

        const snapshot = await get(refPath);
        const currentSkills = snapshot.val() || [];

        const updatedArray = currentSkills.filter((_, i) => i !== index);

        await update(ref(db, `Students/${id}`), { desiredSkills: updatedArray });
    }

    const MyDesiredSkillsArray = data?.desiredSkills || [];

    return (
        <div>
            <div className="desired-skill-flow">
                <h3>Desired Skills:-</h3>
                <div className="desired-skill-list-flow">
                    <ul>
                        {MyDesiredSkillsArray.length === 0 && <h6>Add desired skills</h6>}
                        {MyDesiredSkillsArray.map((elem, index) => (
                            <li key={index}>
                                <p>{elem}</p>
                                <button onClick={() => deleteSkill(index)}>
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="add-new-desired-skill-flow">
                    <input
                        type="text"
                        placeholder="Add Desired Skills..."
                        value={desiredSkill}
                        onChange={(e) => SetDesiredSkill(e.target.value)}
                    />
                    <button onClick={AddSkillToDesired}>
                        Add &nbsp;<i className="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DesiredSkillStuFlow
