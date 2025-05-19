

import React, { children, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoot = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const checkUserStatus = async (email) => {
        try {
            const response = await fetch(`http://localhost:5001/users?email=${email}`)
            const user = await response.json();
            if (user.length > 0) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
                navigate("/login")

            }
        } catch (error) {

        }
    }

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem("todouser"));
        // console.log(local);
        if (local) {
            checkUserStatus(local.email);
        } else {
            navigate("/login")
        }
    }, [])

    return (
        isLoggedIn ? children : null
    )
}

export default ProtectedRoot;