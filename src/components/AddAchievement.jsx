import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// Firebase
import { realDb } from '../authFirebase/firebase';
import { ref as dbRef, push, set } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddAchievement = ({ close }) => {

    const [AchievementTitle, setAchievementTitle] = useState("");
    const [AchievementDescription, setAchievementDescription] = useState("");
    const [AchievementCertificate, setAchievementCertificate] = useState(null);
    const [progress, setProgress] = useState(0);
    const [loader, setLoader] = useState(false);

    const { id } = useParams(); // student ID from URL

    // ⛳ Add Achievement to Student Document → Achievements/ array
    const addAchievementToDB = async (AchievementObj) => {
        const AchievementRef = dbRef(realDb, `Students/${id}/Achievements`);
        const newAchievement = push(AchievementRef);  // create new object inside Achievements
        await set(newAchievement, AchievementObj);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!AchievementCertificate) {
            alert("Please upload a certificate");
            return;
        }

        setLoader(true);

        try {
            // 1️⃣ Upload certificate to Firebase Storage
            const storage = getStorage();
            const certRef = storageRef(storage, `Certificates/${Date.now()}_${AchievementCertificate.name}`);

            const uploadTask = uploadBytesResumable(certRef, AchievementCertificate);

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

                    // 2️⃣ Create Achievement Object
                    const AchievementObj = {
                        title: AchievementTitle,
                        description: AchievementDescription,
                        certificateURL: downloadURL,
                        certificateName: AchievementCertificate.name,
                        addedAt: new Date().toISOString()
                    };

                    // 3️⃣ Push Achievement to Realtime DB inside Achievements
                    await addAchievementToDB(AchievementObj);

                    alert("Achievement Added Successfully!");
                    setLoader(false);

                    // Clear form
                    setAchievementTitle("");
                    setAchievementDescription("");
                    setAchievementCertificate(null);
                    setProgress(0);
                }
            );

        } catch (err) {
            console.error("Error adding Achievement:", err);
            setLoader(false);
        }
    };

    return (
        <div className='edit-profile-Student'>
            <h3>Add New Achievement</h3>

            <form onSubmit={submitHandler}>

                <input
                    type="text"
                    placeholder='Enter Achievement Title'
                    value={AchievementTitle}
                    onChange={(e) => setAchievementTitle(e.target.value)}
                    required
                />

                <h6>Upload your certificate</h6>
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg" 
                    onChange={(e) => setAchievementCertificate(e.target.files[0])}
                    required
                />
                
                {AchievementCertificate && <p>Upload Progress: {progress}%</p>}

                <textarea
                    placeholder='Write about this Achievement'
                    value={AchievementDescription}
                    onChange={(e) => setAchievementDescription(e.target.value)}
                    required
                />

                <button type='button' className='close-btn' onClick={close}>
                    <i className="fa-solid fa-x"></i>
                </button>

                <button type='submit'>Save Achievement</button>

            </form>

            {loader && <p>Uploading... Please wait.</p>}
        </div>
    );
};

export default AddAchievement;
