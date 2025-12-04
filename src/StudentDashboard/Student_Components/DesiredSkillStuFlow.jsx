import React from 'react'

const DesiredSkillStuFlow = () => {
  return (
    <div>
       <div class="desired-skill-flow">
                    <h3>Desired Skills:-</h3>
                    <div class="desired-skill-list-flow">
                        <ul>
                            <li>
                                <p>Gaming</p><button><i class="fa-solid fa-xmark"></i></button>
                            </li>
                            <li>
                                <p>Photo Editing</p><button><i class="fa-solid fa-xmark"></i></button>
                            </li>
                            <li>
                                <p>Database Management</p><button><i class="fa-solid fa-xmark"></i></button>
                            </li>


                            <li>
                                <p>Server side scripting</p><button><i class="fa-solid fa-xmark"></i></button>
                            </li>
                            <li>
                                <p>Enterpreneurship</p><button><i class="fa-solid fa-xmark"></i></button>
                            </li>

                        </ul>
                    </div>
                    <div class="add-new-desired-skill-flow">
                        <input type="text" placeholder="Add Desired Skills..."  />
                        <button>Add&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
    </div>
  )
}

export default DesiredSkillStuFlow
