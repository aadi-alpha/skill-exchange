import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, allowedRole }) => {
    
    const user = JSON.parse(localStorage.getItem("loggedInUserSkillExchange"))

    useEffect(() => {
        if (!user) {
            return <Navigate to="/login" replace />;
        }

        if (allowedRole && user.role !== allowedRole) {
            return <Navigate to="/" replace />;
        }
        else {
            return (
                children
            )
        }
    }, [])
}

export default ProtectedRoute
