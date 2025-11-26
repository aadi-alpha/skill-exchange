import React, { useState } from 'react'
import Register from '../Register'

const OrganizationRegister = ({role}) => {

    const [nameOrganization, setNameOrganization] = useState('')
    const [regNumOrganization, setregNumOrganization] = useState('')
     const [AddressOrganization, setAddressOrganization] = useState('')
    const [emailOrganization, setemailOrganization] = useState('')
    const [mobileOrganization, setmobileOrganization] = useState('')
    const [passwordOrganization, setpasswordOrganization] = useState('')
    const [otpEmail, setOtpEmail] = useState('')
    const [otpPhone, setOtpPhone] = useState('')
  
    function onChangeHandlerName(e) {
      setNameOrganization(e.target.value)
    }
    function onChangeHandlerRegNum(e) {
      setregNumOrganization(e.target.value)
    }
    function onChangeHandlerEmail(e) {
      setemailOrganization(e.target.value)
    }
    function onChangeHandlerMobile(e) {
      setmobileOrganization(e.target.value)
    }
    function onChangeHandlerPassword(e) {
      setpasswordOrganization(e.target.value)
    }
    function onChangeHandlerEmailOtp(e) {
      setOtpEmail(e.target.value)
    }
    function onChangeHandlerMobileOtp(e) {
      setOtpPhone(e.target.value)
    }
    function onChangeHandlerAddress(e) {
      setOtpPhone(e.target.value)
    }
     
    const OrganizationRegisterData = {
      name: '',
      RegisterationNum:'',
      Address:'',
      email: '',
      mobileNum: '',
      passwordId: ''
  
    }
    function onSubmitHandler(e) {
      e.preventDefault()
      OrganizationRegisterData.name = nameOrganization
      OrganizationRegisterData.RegisterationNum=regNumOrganization
      OrganizationRegisterData.Address=AddressOrganization
      OrganizationRegisterData.email = emailOrganization
      OrganizationRegisterData.mobileNum = mobileOrganization
      OrganizationRegisterData.passwordId = passwordOrganization
  
      alert("Registered Successfully")
      console.log(OrganizationRegisterData)
      setNameOrganization('')
      setregNumOrganization('')
      setAddressOrganization('')
      setemailOrganization('')
      setmobileOrganization('')
      setpasswordOrganization('')
      setOtpEmail('')
      setOtpPhone('')
  
    }
    return (
      <>
        <form className='registerForm' onSubmit={(e) => { onSubmitHandler(e) }}>
          <h3>Registering as {role}</h3>
          <input type="text" placeholder='Enter Your Name' onChange={(e) => { onChangeHandlerName(e) }} value={nameOrganization} required />
          <input type="text" placeholder='Enter Registration Number' onChange={(e)=>{onChangeHandlerRegNum(e)}} value={regNumOrganization} required/>
          <input type="text" placeholder='Address of Organization' onChange={(e)=>{onChangeHandlerAddress(e)}} value={AddressOrganization} required/>
          <div className="send-otp">
            <input type="text" placeholder='Enter Official Mail' onChange={(e) => { onChangeHandlerEmail(e) }} value={emailOrganization} required />
            <button>Send&nbsp;OTP</button>
          </div>
          <div className="verify-otp">
            <input type="text" placeholder='Enter OTP'  onChange={(e) => { onChangeHandlerEmailOtp(e) }} value={otpEmail} required />
            <button>Verify&nbsp;OTP</button>
          </div>
          <div className="send-otp">
            <input type="text" placeholder='Enter Contact Number' onChange={(e) => { onChangeHandlerMobile(e) }} value={mobileOrganization} required />
            <button>Send&nbsp;OTP</button>
          </div>
          <div className="verify-otp">
            <input type="text" placeholder='Enter OTP'  onChange={(e) => { onChangeHandlerMobileOtp(e) }} value={otpPhone} required />
            <button>Verify&nbsp;OTP</button>
          </div>
          <input type="text" placeholder='Enter Password' onChange={(e) => { onChangeHandlerPassword(e) }} value={passwordOrganization} required />
          <button type='submit'> Submit</button>
  
        </form>
      </>
  )
}

export default OrganizationRegister
