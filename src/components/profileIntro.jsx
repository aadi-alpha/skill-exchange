import React from 'react'
import logo from '../assets/images/logo.png'

const ProfileIntro = () => {
    return (
        <>
            <div className="profile-intro-stu-outer">
                <div className="profile-intro-stu">
                    <div className="profile-img-stu">
                        <img src={logo} alt="profile-image" />
                    </div>
                    <div className="pr-int-stu">
                        <h2 id="name">Aadi Nagpal</h2>
                        <p id="about">Aspiring Full-Stack Developer with a passion for educational technology and
                            community impact.
                            Eager to contribute to meaningful Organization projects and expand my skill set through
                            collaboration.</p>
                    </div>
               
                    <br />
                    <br />


                </div>
                <div className="skill-tags-stu">
                    <button>HTML</button>
                    <button>CSS</button>
                    <button>Javascript</button>
                    <button>firebase</button>
                </div>
                <div className="impact-score">
                    <div>
                    <p>Organization Impact Score:</p>
                    </div>

                    <div className="progress-bar">
                        <div className="progress-fill" ></div>
                    </div>
                    <div><p>75/100</p></div>
                </div>
                <div className="profile-intro-buttons">
                    <button><a href="tel:+919354912492">Contact</a>
</button>
                    <button><a href="mailto:aadinagpal46@gmail.com">Email</a>
</button>
                    <button>Edit Profile</button>
                </div>
            </div>
        </>
    )
}

export default ProfileIntro
