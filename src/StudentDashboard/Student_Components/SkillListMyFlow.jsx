import React from 'react'

const SkillListMyFlow = () => {
  return (
    <div>
         <div class="my-skill-flow">
                            <h3>My Skills:-</h3>
      <div class="skill-list-flow">
                        <ul>
                            <li>
                                <p>React</p><button><i class="fa-solid fa-xmark"></i></button>
                            </li>
                            <li>
                                <p>Video Editing</p><button><i class="fa-solid fa-xmark"></i></button>
                            </li>
                            <li>
                                <p>JavaScript</p><button><i class="fa-solid fa-xmark"></i></button>
                            </li>
                            <li>
                                <p>Project Management</p><button><i class="fa-solid fa-xmark"></i></button>
                            </li>

                            <li>
                                <p>Graphic designing</p><button><i class="fa-solid fa-xmark"></i></button>
                            </li>
                            <li>
                                <p>Digital Marketing</p><button><i class="fa-solid fa-xmark"></i></button>
                            </li>
                            <li>
                                <p>Public Speaking</p><button><i class="fa-solid fa-xmark"></i></button>
                            </li>
                        </ul>
                         
                    </div>
                    <div class="add-new-skill-flow">
                        <input type="text" placeholder="Add Skills..."/>
                        <button>Add&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-plus"></i></button>
                    </div>
                    </div>
                    
    </div>
  )
}

export default SkillListMyFlow
