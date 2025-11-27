import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../authFirebase/firebase";
import { auth } from "../authFirebase/firebase";
import { RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import Loader from "./loader";

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
        
        if (!emailOrganization) return alert("Enter email");
    setLoader(true)
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedEmailOtp(otp);
    
        // Store otp in Firestore
        await setDoc(doc(db, "emailOtps", emailOrganization), {
          otp,
          timestamp: Date.now(),
          
        });
    
        // send email via emailjs
        emailjs
          .send("service_rjgtrdr", "template_vru0qpj", {
            to_email: emailOrganization,
            name: nameOrganization,
            otp,
          })
          .then(() => {
            setEmailOtpSent(true);
            alert("Email OTP sent!");
          })
          .catch((err) => alert("Email send error: " + err.text));
          setLoader(false)
      }
    
      // ---------- VERIFY EMAIL OTP ----------
      async function verifyEmailOtpBtn() {
        
        if (!otpEmail) return alert("Enter OTP");
    setLoader(true)
        const docSnap = await getDoc(doc(db, "emailOtps", emailOrganization));
        if (!docSnap.exists()) return alert("No OTP found for this email");
    
        if (docSnap.data().otp === otpEmail) {
          setEmailVerified(true);
          alert("Email verified!");
        } else {
          alert("Incorrect OTP");
        }
        setLoader(false)
      }
    
      // ---------- SEND PHONE OTP ----------
    function sendMobileOtpBtn() {
      
      if (!mobileOrganization) return alert("Enter mobile number");
    setLoader(true)
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
    
      signInWithPhoneNumber(auth, mobileOrganization, appVerifier)
        .then((confirmationResult) => {
          setConfirmationResult(confirmationResult);
          alert("OTP sent successfully!");
        })
        .catch((error) => {
          console.error(error);
          alert("Error sending OTP: " + error.message);
        });
        setLoader(false)
    }
    
    
      // ---------- VERIFY PHONE OTP ----------
    function verifyMobileOtpBtn() {
      
      if (!confirmationResult) return alert("Please send OTP first");
    setLoader(true)
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
        setLoader(false)
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
    const [loader,setLoader]=useState(false)
    return (
      <>
        <form className='registerForm' onSubmit={(e) => { onSubmitHandler(e) }}>
          <h3>Registering as {role}</h3>
          <input type="text" placeholder='Enter Your Name' onChange={(e) => { onChangeHandlerName(e) }} value={nameOrganization} required />
          <input type="text" placeholder='Enter Registration Number' onChange={(e)=>{onChangeHandlerRegNum(e)}} value={regNumOrganization} required/>
          <input type="text" placeholder='Address of Organization' onChange={(e)=>{onChangeHandlerAddress(e)}} value={AddressOrganization} required/>
           <div className="send-otp">
        <input
          type="email"
          placeholder="Enter Your Email"
          value={emailOrganization}
          onChange={(e) => setemailOrganization(e.target.value)}
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
          value={mobileOrganization}
          onChange={(e) => setmobileOrganization(e.target.value)}
          required
        />
        
        <button id="sendMobileOtpBtn" type="button" onClick={sendMobileOtpBtn} >
          Send OTP
        </button>
      </div>

  
      <div id="recaptcha-container"></div>

      <div className="verify-otp">
        <input
          type="text"
          placeholder="Enter Mobile OTP"
          value={otpPhone}
          onChange={(e) => setOtpPhone(e.target.value)}
          required
        />
        <button type="button" onClick={verifyMobileOtpBtn}>
          Verify OTP
        </button>
      </div>

          <input type="text" placeholder='Enter Password' onChange={(e) => { onChangeHandlerPassword(e) }} value={passwordOrganization} required />
          <button type='submit'> Submit</button>
  {loader==true&&<Loader />}
        </form>
      </>
  )
}

export default OrganizationRegister
