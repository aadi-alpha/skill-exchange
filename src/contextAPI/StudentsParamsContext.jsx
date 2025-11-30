import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { useParams } from 'react-router-dom'
import { ref, get } from "firebase/database";
import { realDb } from "../authFirebase/firebase";
import Loader from '../components/loader';

export const StudentDataContext = createContext()




const StudentsParamsContext = ({ children }) => {
    const [loader, setLoader] = useState(true)
    const StudentId = useParams()

    const [loggedInStudentData, setLoggedInStudentData] = useState()

    useEffect(() => {
        async function fetchData() {
            const studentSnapshot = await get(ref(realDb, `Students/${StudentId.id}`))
            try {
                if (studentSnapshot) {
                    setLoggedInStudentData(studentSnapshot.val())
                }
                else {
                    alert("please wait.....")
                }
            } catch (error) {
                console.log(err)
            }
            finally {
                setLoader(false); // stop loader
            }

        }
        fetchData()
    }, [])

    if (loader) {
        return <Loader />
    }
    return (
        <StudentDataContext.Provider value={loggedInStudentData}>
            {children}
        </StudentDataContext.Provider>
    )
}

export default StudentsParamsContext
