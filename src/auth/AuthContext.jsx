import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    // register user


    const registerUser = async (formData) => {

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        }
        try {
            const checkuser = await fetch(`http://localhost:5001/users?email=${formData.email}`, { method: "GET" });

            const existingUser = await checkuser.json();

            if (existingUser.length > 0) {
                alert("email already registered, please login");
                navigate("/task-list");
            } else {
                const response = await fetch('http://localhost:5001/users', config);
                const user = await response.json();
                localStorage.setItem("todouser", JSON.stringify(user))
                setUser(user)
                alert("user Register");
            }

        } catch (error) {
            console.log(error);
        }

    }

    const updateUser = async (formData) => {
        const config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }
        try {
            const response = await fetch(`http://localhost:5001/users/${formData.id}`, config)
            alert("user updated successfully");
            fetchUserDetails(user.id)
        } catch (error) {

        }
    }

    //login user
    const loginUser = async (formData) => {
        try {
            const response = await fetch(`http://localhost:5001/users?email=${formData.email}&password=${formData.password}`, { method: "GET" });
            const user = await response.json();
            if (user.length > 0) {
                localStorage.setItem("todouser", JSON.stringify(user[0]))
                setUser(user[0])
                alert("logged in successfully");
                navigate('/task-list');
            } else {
                alert("email/password is wrong")
            }

        } catch (error) {
            console.log(error);
        }

    }


    const fetchUserDetails = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/users/${id}`, { method: "GET" })
            const details = await response.json();
            setUserDetails(details);

        } catch (error) {
            console.log(error)
        }
    }




    // check user status
    const checkuserStatus = async (email) => {
        try {
            const response = await fetch(`http://localhost:5001/users?email=${email}`)
            const user = await response.json();
            if (user.length > 0) {
                setUser(user[0])
            } else {
                localStorage.removeItem("todouser");
            }
        } catch (error) {

        }
    }
    const logout = () => {
        localStorage.removeItem("todouser")
        setUser(null);
        navigate("/login");
    }

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem("todouser"));
        if (local) {
            checkuserStatus(local.email);
        }
    }, [])



    return (
        <AuthContext.Provider value={{
            user,
            registerUser,
            loginUser,
            logout,
            fetchUserDetails,
            userDetails,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;