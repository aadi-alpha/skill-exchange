import React, { useState } from 'react'
import logo from './assets/images/logo.png'
import StudentRegister from './components/StudentRegister'

import OrganizationRegister from './components/OrganizationRegister'
import MentorRegister from './components/MentorRegister'

const Register = () => {
    const [role, setrole] = useState('')
    function selectChangeHandler(e) {
        setrole(e.target.value)
        console.log(role)
    }
    return (
        <>
            <div className="register-main">
                <h1>Register In SKill Exchange</h1>
                <div className="register-content">
                    <img src={logo} alt="skillx logo" />
                    <select name="" id="" placeholder='select role' onChange={(e) => { selectChangeHandler(e) }}>
                        <option value="role_select">Select Your Role</option>
                        <option value="student">Student</option>
                        <option value="organization">Organization</option>
                        <option value="mentor">Mentor</option>
                    </select>
                     {role=='' && <h4><b>Select Your Role First</b></h4>}
                    {role == 'role_select' && <h4><b>Select Your Role First</b></h4>}
                    {role == 'student' && <StudentRegister  role={role}/>}
                    {role == 'organization' && <OrganizationRegister role={role}/>}
                    {role == 'mentor' && <MentorRegister role={role}/>}

                </div>
            </div>
        </>
    )
}

export default Register
