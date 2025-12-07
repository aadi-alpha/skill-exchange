import React, { useEffect, useState } from "react";
import { realDb } from "../../authFirebase/firebase";
import { get, ref, onValue } from "firebase/database";
import logo from '../../assets/images/logo.png'
import StuProfileView from "./StuProfileView";

const SkillsExchangeProfilesStu = () => {
  const [AllUsers, setAllUsers] = useState([])
  const [currentSkills, setCurrentSkills] = useState()
  const [profileView,setprofileView]=useState(null)
  async function getData() {
    const data = await get(ref(realDb, 'Students'))
    const Users = data?.val()
    const UserArray = Object.entries(Users).map(([key, value]) => ({
      id: key,
      ...value
    }))
    setAllUsers(UserArray)


  }
  useEffect(() => {
    getData()

  }, [])
  console.log(AllUsers[0]?.desiredSkills)




  return (
    <div>
      <h3 className="skill-matches">AI Skill Matches:</h3>

      <div className="skill-profiles">
        <div className="profile-cards">

       {AllUsers.map((elem) => {
  return (
    <div className="skill-profile-card" key={elem.id}>
      <img src={elem.profileImage || logo} alt="Profile" />
      <h3>{elem?.name || "SkillX user"}</h3>
      <p>{elem.description}</p>

      <hr />

      <div className="user-skills">
        <h2>Current skills:-</h2>
        <ul>
          {elem.skills
            ? Object.values(elem.skills).map((skillObj, index) => (
                <li key={index}>{skillObj.title}</li>
              ))
            : <li>No skills added</li>}
        </ul>
      </div>

      <div className="user-desired-skills">
        <h2>Desired skills:-</h2>
        <ul>
          {elem.desiredSkills?.map((desSk) => <li key={desSk}>{desSk}</li>)}
          {!elem.desiredSkills && <li>No desired skills yet</li>}
        </ul>
      </div>

      <div className="buttons-cont-skills">
        <button
          className="view-pro-skill-card-stu"
          onClick={() => setprofileView(elem)}
        >
          <i className="fa-solid fa-eye"></i> View Profile
        </button>

        <button className="chat-skill-card" style={{ backgroundColor: "black" }}>
          <i className="fa-solid fa-comment"></i> Chat
        </button>
      </div>
    </div>
  );
})}

{profileView && <StuProfileView value={profileView} />}

        </div>
      </div>
    </div>
  );
};

export default SkillsExchangeProfilesStu;
