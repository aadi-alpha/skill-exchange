import React, { useState } from 'react'
import logo from '../../assets/images/logo.png'
// import EditProfile from './EditProfile';
import { useContext } from "react";
import { OrganizationDataContext } from '../../contextAPI/OrganizationParamsContext';
import EditProfileOrganization from './EditProfileOrg';


/* */
const ProfileIntro = () => {

    const [showComponent, setShowComponent] = useState(false);
    const data = useContext(OrganizationDataContext)


  

 



    return (
        <>

            <div className="profile-intro-stu-outer">
                <div className="profile-intro-stu">
                    <div className="profile-img-stu">
                        <img src={data?.profileImage || logo} alt="profile-image" />
                    </div>
                    <div className="pr-int-stu">
                        <h2 id="name">{data?.name  || "Organization Name"} <i class="fa-solid fa-calendar-check"></i></h2>
                        <p style={{marginTop:"10px"}} id="about">{data?.description || "Add about Organization"}</p>

                        <h6 style={{fontSize:"clamp(18px,2vw,20px)"}}>About Our Services:-</h6>
                        <p>{data?.Services|| "We serve our almighty Nation" }</p>
                    </div>

                    <br />
                    <br />


                </div>
    <div className="address-org">
        <h6>Address:-</h6>
        
        <p>{data?.Address || 'Skill Exchange Member'}</p>
    </div>
             
                <div className="profile-intro-buttons">
                    <button><a href={`tel:${data?.mobileNum || ''}`}>Contact</a>
                    </button>
                    <button><a href={`mailto:${data?.email || ''}`}>Email</a>
                    </button>
                    <button onClick={() => setShowComponent(true)}>Edit Profile</button>
                    {showComponent && (
                        <EditProfileOrganization close={() => setShowComponent(false)} />
                    )}
                </div>
            </div>
        </>
    )
}

export default ProfileIntro
