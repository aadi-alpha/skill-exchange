import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../authFirebase/firebase";
import { auth } from "../authFirebase/firebase";
import { RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import { realDb } from "../authFirebase/firebase";
import { ref, set, get, onValue } from "firebase/database";
import Loader from "./loader";

const StudentRegister = ({ role }) => {

  const [nameStudent, setNameStudent] = useState("");
  const [emailStudent, setEmailStudent] = useState("");
  const [mobileStudent, setMobileStudent] = useState("");
  const [passwordStudent, setPasswordStudent] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [otpPhone, setOtpPhone] = useState("");
  const [loader, setLoader] = useState(false)
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [generatedEmailOtp, setGeneratedEmailOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [StudentId, setStudentId] = useState();
  // -------------------- INIT ReCAPTCHA ----------------------


  // Init EmailJS
  useEffect(() => {
    emailjs.init("O1eqMF__l75Le_ffM"); // your public key
  }, []);


  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => console.log("reCAPTCHA solved"),
        }
      );

      window.recaptchaVerifier.render();
    }
  };

  // ---------- SEND EMAIL OTP ----------
  async function sendEmailOtpBtn() {

    if (!emailStudent) return alert("Enter email");
    setLoader(true)
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
    setLoader(false)
  }

  // ---------- VERIFY EMAIL OTP ----------
  async function verifyEmailOtpBtn() {

    if (!otpEmail) return alert("Enter OTP");
    setLoader(true)
    const docSnap = await getDoc(doc(db, "emailOtps", emailStudent));
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
    setLoader(true)
    if (!mobileStudent) return alert("Enter mobile number");
    setLoader(true)
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
  const valueCounter = () => {

  }
  valueCounter()

  // -------------------- SUBMIT FORM ----------------------
  function onSubmitHandler(e) {
    setLoader(true)
    e.preventDefault();


    if (!emailVerified || !mobileVerified)
      return alert("Verify both email & mobile first");

    const StudentRegisterData = {
      name: nameStudent,
      email: emailStudent,
      mobileNum: mobileStudent,
      passwordId: passwordStudent,
    };

    onValue(ref(realDb, "Students"), (snapshotStudents) => {


      const valueStudents = snapshotStudents.val()
      const count = valueStudents ? Object.keys(valueStudents).length : 0
      setStudentId(("STU" + Math.floor(1000 + Math.random() * 9000) + 0 + (count + 1)))

    })
    set(ref(realDb, "Students" +StudentId), StudentRegisterData)
      .then(() => {
        alert("Registered Successfully 🎉");
      })
      .catch((err) => console.log(err));



    console.log(StudentRegisterData);

    // RESET
    setNameStudent("");
    setEmailStudent("");
    setMobileStudent("");
    setPasswordStudent("");
    setOtpEmail("");
    setOtpPhone("");

  }

  return (
    <form className="registerForm" onSubmit={onSubmitHandler}>
      <h3>Registering as {role}</h3>

      <input
        type="text"
        placeholder="Enter Your Name"
        value={nameStudent}
        onChange={(e) => setNameStudent(e.target.value)}
        required
      />

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

      <input
        type="password"
        placeholder="Enter Password"
        value={passwordStudent}
        onChange={(e) => setPasswordStudent(e.target.value)}
        required
      />

      <button type="submit">Submit</button>
      {loader == true && <Loader />}
    </form>

  );
};

export default StudentRegister;
