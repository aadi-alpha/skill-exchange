import React, { useState } from 'react'
import logo from './assets/images/logo.png'
import { Link } from 'react-router-dom'

const Login = () => {

  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')

  function submitHandler(e) {
    e.preventDefault()
    alert('submitted')
    console.log(inputEmail, inputPassword)
    setInputEmail('')
    setInputPassword('')
  }
  function onChangeHandlerEmail(e) {
    setInputEmail(e.target.value)



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
          <input type="text" placeholder='Enter user id' autoComplete="off" required onChange={(e) => { onChangeHandlerEmail(e) }} value={inputEmail} />
          <input type="text" placeholder='Enter your password' autoComplete="off" required onChange={(e) => { onChangeHandlerPassword(e) }} value={inputPassword} />
          <h3>Don't have any account? <Link to='/register'>Register Now&nbsp;Now</Link></h3>
          <button type='submit'>Login</button>
        </form>
        <h3><Link >Forgotten Password</Link></h3>
      </div>
    </>
  )
}

export default Login
