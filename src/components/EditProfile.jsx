import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref as dbRef, update, push, set } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Loader from './loader';
import { realDb } from "../authFirebase/firebase";

const EditProfile = ({ close }) => {
    const [loader, setLoader] = useState(false);
    const [NewName, setName] = useState('');
    const [about, setAbout] = useState('');
    const [ProfileImage, setProfileImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const { id } = useParams();

    console.log("Editing Student ID:", id);

    const handleFileChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const updateProfile = async (StudentId, updateData) => {
        await update(dbRef(realDb, `Students/${StudentId}`), updateData);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const updateData = {};

        if (NewName.trim() !== "") {
            updateData.name = NewName.trim();
        }

        if (about.trim() !== "") {
            updateData.description = about.trim();
        }

        if (!ProfileImage && Object.keys(updateData).length === 0) {
            alert("No changes to update");
            return;
        }

        setLoader(true);

        try {
            if (ProfileImage) {
                const storage = getStorage();
                const storageReference = storageRef(storage, `ProfilePictures/${ProfileImage.name}`);
                const uploadTask = uploadBytesResumable(storageReference, ProfileImage);

                uploadTask.on(
                    'state_changed',
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
                        console.log("File available at:", downloadURL);

                        // Store URL in Realtime Database under "images"
                        const dbReference = push(dbRef(realDb, "images"));
                        set(dbReference, {
                            name: ProfileImage.name,
                            url: downloadURL,
                        });

                        // Add profileImage URL to updateData
                        updateData.profileImage = downloadURL;

                        // Update student profile
                        await updateProfile(id, updateData);

                        alert("All changes made!");
                        setLoader(false);
                        setProgress(0);
                    }
                );
            } else {
                // Only update name/about (no image)
                await updateProfile(id, updateData);
                alert("All changes made!");
                setLoader(false);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setLoader(false);
        }
    };

    return (
        <div className='edit-profile-Student'>
            <h3>Edit Your Profile:</h3>
            <form onSubmit={submitHandler}>
                <h6>Upload your profile picture</h6>
                <input type="file" onChange={handleFileChange} />
                {ProfileImage && <p>Upload Progress: {progress}%</p>}

                <input
                    type="text"
                    placeholder='Edit your name'
                    value={NewName}
                    onChange={(e) => setName(e.target.value)}
                />

                <textarea
                    placeholder='Write About Yourself'
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                />

                <h5>You can edit Your Skills by uploading skills from your profile or skill exchange</h5>

                <button type='button' className='close-btn' onClick={close}>
                    <i className="fa-solid fa-x"></i>
                </button>
                <button type='submit'>Save Changes</button>
            </form>

            {loader && <Loader />}
        </div>
    );
};

export default EditProfile;
