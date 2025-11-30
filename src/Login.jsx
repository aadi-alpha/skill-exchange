import  { useContext, useState } from 'react'
import logo from './assets/images/logo.png'
import { Link } from 'react-router-dom'

import { AuthContext } from "./contextAPI/AuthContext";


const Login = () => {

  const [inputId, setInputId] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const { studentData, OrganizationData, MentorData } = useContext(AuthContext)



  function submitHandler(e) {
    e.preventDefault();
    console.log(studentData, OrganizationData, MentorData)

    try {
      const student = studentData?.find(
        (elem) => elem.id == inputId && elem.passwordId == inputPassword
      );

      const org = OrganizationData?.find(

        (elem) => {
         
          return elem.id == inputId && elem.passwordId == inputPassword
        }
      );

      const mentor = MentorData?.find(
         
        (elem) =>{
        
          return elem.id == inputId.trim() && elem.passwordId == inputPassword.trim()}

      );

      if (student) {
        localStorage.setItem(
          "loggedInUserSkillExchange",
          JSON.stringify({ ...student, role: "student" })
        );
        alert("Logging in as student...");
         window.location.reload()
        return;
      }

      else if (org) {
        localStorage.setItem(
          "loggedInUserSkillExchange",
          JSON.stringify({ ...org, role: "organization" })
        );
        alert("Logging in as organization...");
         window.location.reload()
        return;
      }

      else if (mentor) {
        console.log('mentor')
        localStorage.setItem(
          "loggedInUserSkillExchange",
          JSON.stringify({ ...mentor, role: "mentor" })
         
        );
        alert("Logging in as mentor...");
         window.location.reload()
        return;
      }

      else { alert("User not found"); }
    } catch (err) {
      alert(err);
    }
  }

  function onChangeHandlerId(e) {
    setInputId(e.target.value)



  }
  function onChangeHandlerPassword(e) {
    setInputPassword(e.target.value)

  }
  return (
    <>
      <div className="login-page">
        <h1>Skill Exchange Login</h1>
        <form className="login-page-content" autoComplete='off' onSubmit={(e) => { submitHandler(e) }}>
          <img src={logo} alt="skillx logo" />
          <input type="text" placeholder='Enter user id' autoComplete="off" required onChange={(e) => { onChangeHandlerId(e) }} value={inputId} />
          <input type="text" placeholder='Enter your password' autoComplete="off" required onChange={(e) => { onChangeHandlerPassword(e) }} value={inputPassword} />
          <h3>Don't have any account? <Link to='/register'>Register&nbsp;Now</Link></h3>
          <button type='submit'>Login</button>
        </form>
        <h3><Link >Forgotten Password</Link></h3>
      </div>
    </>
  )
}

export default Login
