import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// Firebase
import { realDb } from '../authFirebase/firebase';
import { ref as dbRef, push, set } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddSkills = ({ close }) => {

    const [skillTitle, setSkillTitle] = useState("");
    const [skillDescription, setSkillDescription] = useState("");
    const [skillCertificate, setSkillCertificate] = useState(null);
    const [progress, setProgress] = useState(0);
    const [loader, setLoader] = useState(false);

    const { id } = useParams(); // student ID from URL

    // ⛳ Add Skill to Student Document → skills/ array
    const addSkillToDB = async (skillObj) => {
        const skillRef = dbRef(realDb, `Students/${id}/skills`);
        const newSkill = push(skillRef);  // create new object inside skills
        await set(newSkill, skillObj);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!skillCertificate) {
            alert("Please upload a certificate");
            return;
        }

        setLoader(true);

        try {
            // 1️⃣ Upload certificate to Firebase Storage
            const storage = getStorage();
            const certRef = storageRef(storage, `Certificates/${Date.now()}_${skillCertificate.name}`);

            const uploadTask = uploadBytesResumable(certRef, skillCertificate);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(Math.round(prog));
                },
                (error) => {
                    console.error("Upload error:", error);
                    setLoader(false);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                    // 2️⃣ Create Skill Object
                    const skillObj = {
                        title: skillTitle,
                        description: skillDescription,
                        certificateURL: downloadURL,
                        certificateName: skillCertificate.name,
                        addedAt: new Date().toISOString()
                    };

                    // 3️⃣ Push skill to Realtime DB inside skills
                    await addSkillToDB(skillObj);

                    alert("Skill Added Successfully!");
                    setLoader(false);

                    // Clear form
                    setSkillTitle("");
                    setSkillDescription("");
                    setSkillCertificate(null);
                    setProgress(0);
                }
            );

        } catch (err) {
            console.error("Error adding skill:", err);
            setLoader(false);
        }
    };

    return (
        <div className='edit-profile-Student'>
            <h3>Add New Skill</h3>

            <form onSubmit={submitHandler}>

                <input
                    type="text"
                    placeholder='Enter Skill Title'
                    value={skillTitle}
                    onChange={(e) => setSkillTitle(e.target.value)}
                    required
                />

                <h6>Upload your certificate</h6>
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg" 
                    onChange={(e) => setSkillCertificate(e.target.files[0])}
                    required
                />
                
                {skillCertificate && <p>Upload Progress: {progress}%</p>}

                <textarea
                    placeholder='Write about this skill'
                    value={skillDescription}
                    onChange={(e) => setSkillDescription(e.target.value)}
                    required
                />

                <button type='button' className='close-btn' onClick={close}>
                    <i className="fa-solid fa-x"></i>
                </button>

                <button type='submit'>Save Skill</button>

            </form>

            {loader && <p>Uploading... Please wait.</p>}
        </div>
    );
};

export default AddSkills;
