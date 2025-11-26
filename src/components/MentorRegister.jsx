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

 const [confirmationResult, setConfirmationResult] = useState(null);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [generatedEmailOtp, setGeneratedEmailOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);

  // -------------------- INIT ReCAPTCHA ----------------------


  // Init EmailJS
  useEffect(() => {
    emailjs.init("O1eqMF__l75Le_ffM"); // your public key
  }, []);
const setupRecaptcha = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {
      size: "invisible",
      callback: (response) => {
        console.log("reCAPTCHA solved", response);
      },
    }
  );
};

  // ---------- SEND EMAIL OTP ----------
  async function sendEmailOtpBtn() {
    if (!emailStudent) return alert("Enter email");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedEmailOtp(otp);

    // Store otp in Firestore
    await setDoc(doc(db, "emailOtps", emailStudent), {
      otp,
      timestamp: Date.now(),
    });

    // send email via emailjs
    emailjs
      .send("service_rjgtrdr", "template_vru0qpj", {
        to_email: emailStudent,
        name: nameStudent,
        otp,
      })
      .then(() => {
        setEmailOtpSent(true);
        alert("Email OTP sent!");
      })
      .catch((err) => alert("Email send error: " + err.text));
  }

  // ---------- VERIFY EMAIL OTP ----------
  async function verifyEmailOtpBtn() {
    if (!otpEmail) return alert("Enter OTP");

    const docSnap = await getDoc(doc(db, "emailOtps", emailStudent));
    if (!docSnap.exists()) return alert("No OTP found for this email");

    if (docSnap.data().otp === otpEmail) {
      setEmailVerified(true);
      alert("Email verified!");
    } else {
      alert("Incorrect OTP");
    }
  }

  // ---------- SEND PHONE OTP ----------
function sendMobileOtpBtn() {
  if (!mobileStudent) return alert("Enter mobile number");

  setupRecaptcha();
  const appVerifier = window.recaptchaVerifier;

  signInWithPhoneNumber(auth, mobileStudent, appVerifier)
    .then((confirmationResult) => {
      setConfirmationResult(confirmationResult);
      alert("OTP sent successfully!");
    })
    .catch((error) => {
      console.error(error);
      alert("Error sending OTP: " + error.message);
    });
}


  // ---------- VERIFY PHONE OTP ----------
function verifyMobileOtpBtn() {
  if (!confirmationResult) return alert("Please send OTP first");

  confirmationResult
    .confirm(otpPhone)
    .then((result) => {
      setMobileVerified(true); // mark mobile as verified
      alert("Phone verified successfully!");
      console.log(result.user);

      // Optional: reset reCAPTCHA
      if (window.recaptchaVerifier) window.recaptchaVerifier.clear();
    })
    .catch((error) => {
      console.error(error);
      alert("Invalid OTP");
    });
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
        <input
          type="email"
          placeholder="Enter Your Email"
          value={emailStudent}
          onChange={(e) => setEmailStudent(e.target.value)}
          required
        />
        <button type="button" onClick={sendEmailOtpBtn}>
          Send OTP
        </button>
      </div>

      <div className="verify-otp">
        <input
          type="text"
          placeholder="Enter Email OTP"
          value={otpEmail}
          onChange={(e) => setOtpEmail(e.target.value)}
          required
        />
        <button type="button" onClick={verifyEmailOtpBtn}>
          Verify OTP
        </button>
      </div>

      <div className="send-otp">
        <input
          type="text"
          placeholder="Enter Mobile"
          value={mobileStudent}
          onChange={(e) => setMobileStudent(e.target.value)}
          required
        />
        
        <button id="sendMobileOtpBtn" type="button" onClick={sendMobileOtpBtn} >
          Send OTP
        </button>
      </div>
           <input type="text" placeholder='Enter Password' onChange={(e) => { onChangeHandlerPassword(e) }} value={passwordMentor} required />
           <button type='submit'> Submit</button>
   
         </form>
   </>
  )
}

export default MentorRegister
