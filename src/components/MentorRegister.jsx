import React, { useState } from 'react'

const MentorRegister = ({role}) => {
     const [nameMentor, setNameMentor] = useState('')
     const [EduDetailsMentor, setEduDetailsMentor] = useState('')
      const [AddressMentor, setAddressMentor] = useState('')
     const [emailMentor, setemailMentor] = useState('')
     const [mobileMentor, setmobileMentor] = useState('')
     const [passwordMentor, setpasswordMentor] = useState('')
     const [otpEmail, setOtpEmail] = useState('')
     const [otpPhone, setOtpPhone] = useState('')
   
     function onChangeHandlerName(e) {
       setNameMentor(e.target.value)
     }
     function onChangeHandlerEduDetails(e) {
       setEduDetailsMentor(e.target.value)
     }
     function onChangeHandlerEmail(e) {
       setemailMentor(e.target.value)
     }
     function onChangeHandlerMobile(e) {
       setmobileMentor(e.target.value)
     }
     function onChangeHandlerPassword(e) {
       setpasswordMentor(e.target.value)
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
      
     const MentorRegisterData = {
       name: '',
       EducationDetails:'',
       Address:'',
       email: '',
       mobileNum: '',
       passwordId: ''
   
     }
     function onSubmitHandler(e) {
       e.preventDefault()
       MentorRegisterData.name = nameMentor
       MentorRegisterData.EducationDetails=EduDetailsMentor
       MentorRegisterData.Address=AddressMentor
       MentorRegisterData.email = emailMentor
       MentorRegisterData.mobileNum = mobileMentor
       MentorRegisterData.passwordId = passwordMentor
   
       alert("Registered Successfully")
       console.log(MentorRegisterData)
       setNameMentor('')
       setEduDetailsMentor('')
    
       setemailMentor('')
       setmobileMentor('')
       setpasswordMentor('')
       setOtpEmail('')
       setOtpPhone('')
   
     }
     return (
       <>
         <form className='registerForm' onSubmit={(e) => { onSubmitHandler(e) }}>
           <h3>Registering as {role}</h3>
           <input type="text" placeholder='Enter Your Name' onChange={(e) => { onChangeHandlerName(e) }} value={nameMentor} required />
           <input type="text" placeholder='Enter Education Details' onChange={(e)=>{onChangeHandlerEduDetails(e)}} value={EduDetailsMentor} required/>
          
           <div className="send-otp">
             <input type="text" placeholder='Enter Mail Id' onChange={(e) => { onChangeHandlerEmail(e) }} value={emailMentor} required />
             <button>Send&nbsp;OTP</button>
           </div>
           <div className="verify-otp">
             <input type="text" placeholder='Enter OTP'  onChange={(e) => { onChangeHandlerEmailOtp(e) }} value={otpEmail} required />
             <button>Verify&nbsp;OTP</button>
           </div>
           <div className="send-otp">
             <input type="text" placeholder='Enter Contact Number' onChange={(e) => { onChangeHandlerMobile(e) }} value={mobileMentor} required />
             <button>Send&nbsp;OTP</button>
           </div>
           <div className="verify-otp">
             <input type="text" placeholder='Enter OTP'  onChange={(e) => { onChangeHandlerMobileOtp(e) }} value={otpPhone} required />
             <button>Verify&nbsp;OTP</button>
           </div>
           <input type="text" placeholder='Enter Password' onChange={(e) => { onChangeHandlerPassword(e) }} value={passwordMentor} required />
           <button type='submit'> Submit</button>
   
         </form>
   </>
  )
}

export default MentorRegister
