import React, { useEffect, useState, createContext } from 'react'
import { useParams } from 'react-router-dom'
import { ref, onValue } from "firebase/database";
import { realDb } from "../authFirebase/firebase";
import Loader from '../components/loader';

export const OrganizationDataContext = createContext()

const OrganizationsParamsContext = ({ children }) => {
    const [loader, setLoader] = useState(true)
    const OrganizationId = useParams()
    const [loggedInOrganizationData, setLoggedInOrganizationData] = useState(null)

    useEffect(() => {
        const OrganizationRef = ref(realDb, `Organizations/${OrganizationId.id}`)

        const unsubscribe = onValue(OrganizationRef, (snapshot) => {
            if (snapshot.exists()) {
                setLoggedInOrganizationData(snapshot.val())
            } else {
                console.log("No Data Found")
            }
            setLoader(false)
        })

        // cleanup listener on unmount
        return () => unsubscribe()
    }, [OrganizationId.id])

    if (loader) {
        return <Loader />
    }

    return (
        <OrganizationDataContext.Provider value={loggedInOrganizationData}>
            {children}
        </OrganizationDataContext.Provider>
    )
}

export default OrganizationsParamsContext
