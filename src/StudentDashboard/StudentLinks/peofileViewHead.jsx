import React, {useState} from 'react'
import logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom';

const ProfileViewHead = ({id}) => {
     const navigate = useNavigate();
     const [showComponent, setShowComponent] = useState(false);
        const data = id
    
    
        const skillsdata = data?.skills || {}
    
        const skillBtnArray = Object.entries(skillsdata).map(([key, value]) => ({
            id: key,
            ...value
        }))
        console.log(data)
    
  return (
    <div>
    <button onClick={()=>navigate(-1)} style={{background:"0", border:"0",fontWeight:"500",fontSize:"clamp(18px,2vw,24px", color:"Black",}}>back</button>
       <div className="profile-intro-stu-outer">
                <div className="profile-intro-stu">
                    <div className="profile-img-stu">
                        <img src={data?.profileImage || logo} alt="profile-image" />
                    </div>
                    <div className="pr-int-stu">
                        <h2 id="name">{data?.name || "Student Name"}</h2>
                        <p id="about">{data?.description || "Add about yourself"}</p>
                    </div>

                    <br />
                    <br />


                </div>
                <div className="skill-tags-stu">
                    {skillBtnArray.length == 0 && (<h6>no skills yet</h6>)}
                    <button>Skill Exchange Member</button>
                    {skillBtnArray.map((elem) => {
                        return <button key={elem.id}>{elem.title}</button>

                    })}
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
                    <button><a href={`tel:${data?.mobileNum || ''}`}>Contact</a>
                    </button>
                    <button><a href={`mailto:${data?.email || ''}`}>Email</a>
                    </button>
                    
                   
                </div>
            </div>
        
    </div>
  )
}

export default ProfileViewHead
