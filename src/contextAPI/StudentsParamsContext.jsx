import React, { useEffect, useState, createContext } from 'react'
import { useParams } from 'react-router-dom'
import { ref, onValue } from "firebase/database";
import { realDb } from "../authFirebase/firebase";
import Loader from '../components/loader';

export const StudentDataContext = createContext()

const StudentsParamsContext = ({ children }) => {
    const [loader, setLoader] = useState(true)
    const StudentId = useParams()
    const [loggedInStudentData, setLoggedInStudentData] = useState(null)

    useEffect(() => {
        const studentRef = ref(realDb, `Students/${StudentId.id}`)

        const unsubscribe = onValue(studentRef, (snapshot) => {
            if (snapshot.exists()) {
                setLoggedInStudentData(snapshot.val())
            } else {
                console.log("No Data Found")
            }
            setLoader(false)
        })

        // cleanup listener on unmount
        return () => unsubscribe()
    }, [StudentId.id])

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
