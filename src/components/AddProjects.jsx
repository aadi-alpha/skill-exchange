import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// Firebase
import { realDb } from '../authFirebase/firebase';
import { ref as dbRef, push, set } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddProject = ({ close }) => {

    const [ProjectTitle, setProjectTitle] = useState("");
    const [ProjectDescription, setProjectDescription] = useState("");
    const [ProjectCertificate, setProjectCertificate] = useState(null);
    const [progress, setProgress] = useState(0);
    const [loader, setLoader] = useState(false);

    const { id } = useParams(); // student ID from URL

    // ⛳ Add Project to Student Document → Projects/ array
    const addProjectToDB = async (ProjectObj) => {
        const ProjectRef = dbRef(realDb, `Students/${id}/Projects`);
        const newProject = push(ProjectRef);  // create new object inside Projects
        await set(newProject, ProjectObj);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!ProjectCertificate) {
            alert("Please upload a certificate");
            return;
        }

        setLoader(true);

        try {
            // 1️⃣ Upload certificate to Firebase Storage
            const storage = getStorage();
            const certRef = storageRef(storage, `Certificates/${Date.now()}_${ProjectCertificate.name}`);

            const uploadTask = uploadBytesResumable(certRef, ProjectCertificate);

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

                    // 2️⃣ Create Project Object
                    const ProjectObj = {
                        title: ProjectTitle,
                        description: ProjectDescription,
                        certificateURL: downloadURL,
                        certificateName: ProjectCertificate.name,
                        addedAt: new Date().toISOString()
                    };

                    // 3️⃣ Push Project to Realtime DB inside Projects
                    await addProjectToDB(ProjectObj);

                    alert("Project Added Successfully!");
                    setLoader(false);

                    // Clear form
                    setProjectTitle("");
                    setProjectDescription("");
                    setProjectCertificate(null);
                    setProgress(0);
                }
            );

        } catch (err) {
            console.error("Error adding Project:", err);
            setLoader(false);
        }
    };

    return (
        <div className='edit-profile-Student'>
            <h3>Add New Project</h3>

            <form onSubmit={submitHandler}>

                <input
                    type="text"
                    placeholder='Enter Project Title'
                    value={ProjectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    required
                />

                <h6>Upload your certificate</h6>
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg" 
                    onChange={(e) => setProjectCertificate(e.target.files[0])}
                    required
                />
                
                {ProjectCertificate && <p>Upload Progress: {progress}%</p>}

                <textarea
                    placeholder='Write about this Project'
                    value={ProjectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    required
                />

                <button type='button' className='close-btn' onClick={close}>
                    <i className="fa-solid fa-x"></i>
                </button>

                <button type='submit'>Save Project</button>

            </form>

            {loader && <h6>Uploading... Please wait.</h6>}
        </div>
    );
};

export default AddProject;
